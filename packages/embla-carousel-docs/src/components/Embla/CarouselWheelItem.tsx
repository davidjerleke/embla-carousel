import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'
import { EmblaCarouselType } from 'embla-carousel'
import {
  WheelWrapper,
  Wheel,
  WheelViewport,
  WheelContainer,
  WheelSlide,
  WheelLabel,
  PerspectiveType,
} from './carouselWheelStyles'

const CIRCLE_DEGREES = 360
export const WHEEL_ITEM_SIZE = 32
const WHEEL_ITEM_COUNT = 18
const WHEEL_ITEMS_IN_VIEW = 4
const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT
const WHEEL_RADIUS = Math.round(
  WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT),
)
const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW

const isInView = (wheelLocation: number, slidePosition: number): boolean =>
  Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES

const slideStyle = (
  embla: EmblaCarouselType,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number,
  wheelRotation: number,
) => {
  const wheelLocation = embla.scrollProgress() * totalRadius
  const positionDefault = embla.scrollSnapList()[index] * totalRadius
  const positionLoopEnd = positionDefault - totalRadius
  const positionLoopStart = positionDefault + totalRadius

  let inView = false
  let angle = index * -WHEEL_ITEM_RADIUS

  if (isInView(wheelLocation, positionDefault)) {
    inView = true
  }

  if (loop && isInView(wheelLocation, positionLoopEnd)) {
    inView = true
    angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS
  }

  if (loop && isInView(wheelLocation, positionLoopStart)) {
    inView = true
    angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS
  }

  if (inView) {
    return {
      opacity: 1,
      transform: `rotateX(${
        angle + wheelRotation
      }deg) translateZ(${WHEEL_RADIUS}px)`,
    }
  }

  return { opacity: 0, transform: 'none' }
}

const getSlideStyles = (
  embla: EmblaCarouselType | undefined,
  loop: boolean,
  slideCount: number,
  totalRadius: number,
  wheelRotation: number,
) => {
  const styles = []
  for (let index = 0; index < slideCount; index += 1) {
    const style = embla
      ? slideStyle(embla, index, loop, slideCount, totalRadius, wheelRotation)
      : {}
    styles.push(style)
  }
  return styles
}

type PropType = {
  id: string
  loop?: boolean
  label: string
  slideCount: number
  perspective: PerspectiveType
}

export const CarouselWheelItem = (props: PropType) => {
  const { id, slideCount, perspective, label, loop = false } = props
  const carouselId = `${id}-carousel-items`
  const [emblaRef, embla] = useEmblaCarousel({
    loop,
    axis: 'y',
    dragFree: true,
    draggableClass: '',
    draggingClass: '',
    selectedClass: '',
    inViewThreshold: 0.5,
  })
  const [wheelReady, setWheelReady] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const rootElement = useRef<HTMLDivElement>(null)
  const rootElementSize = useRef(0)
  const totalRadius = slideCount * WHEEL_ITEM_RADIUS
  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS
  const slideStyles = getSlideStyles(
    embla,
    loop,
    slideCount,
    totalRadius,
    wheelRotation,
  )

  const getRootElementSize = useCallback(() => {
    if (!rootElement.current) return 0
    return rootElement.current.getBoundingClientRect().height
  }, [])

  const setRotation = useCallback(() => {
    if (!embla) return
    const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset
    setWheelRotation(rotation * embla.scrollProgress())
  }, [setWheelRotation, slideCount, rotationOffset, embla])

  useEffect(() => {
    if (embla) {
      rootElementSize.current = getRootElementSize()
      setWheelReady(true)
      embla.dangerouslyGetEngine().translate.toggleActive(false)
      setRotation()

      embla.on('pointerUp', () => {
        const { scrollTo, target, location } = embla.dangerouslyGetEngine()
        const distanceToTarget = target.get() - location.get()
        scrollTo.distance(distanceToTarget * 0.1, true)
      })

      embla.on('scroll', () => {
        setRotation()
      })

      embla.on('resize', () => {
        const newRootElementSize = getRootElementSize()
        if (rootElementSize.current === newRootElementSize) return

        rootElementSize.current = newRootElementSize
        setWheelReady(false)
        setWheelReady(() => {
          embla.reInit()
          embla.dangerouslyGetEngine().translate.toggleActive(false)
          setRotation()
          return true
        })
      })
    }
  }, [embla, setRotation, getRootElementSize])

  return (
    <WheelWrapper $perspective={perspective}>
      <Wheel ref={rootElement} aria-roledescription="carousel">
        <WheelViewport ref={emblaRef}>
          <WheelContainer
            $perspective={perspective}
            id={carouselId}
            aria-live="polite"
          >
            {slideStyles.map((slideStyle, index) => (
              <WheelSlide
                key={index}
                style={
                  wheelReady
                    ? slideStyle
                    : { position: 'static', transform: 'none' }
                }
                aria-label={`${index + 1} of ${slideStyles.length}`}
                aria-roledescription="slide"
                role="group"
              >
                {index}
              </WheelSlide>
            ))}
          </WheelContainer>
        </WheelViewport>
      </Wheel>
      <WheelLabel $perspective={perspective}>{label}</WheelLabel>
    </WheelWrapper>
  )
}
