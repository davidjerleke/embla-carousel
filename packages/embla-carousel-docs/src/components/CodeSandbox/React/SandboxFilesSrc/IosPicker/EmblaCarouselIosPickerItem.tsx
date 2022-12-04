import React, { useEffect, useState, useCallback, useRef } from 'react'
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'
import { flushSync } from 'react-dom'

const CIRCLE_DEGREES = 360
const WHEEL_ITEM_SIZE = 32
const WHEEL_ITEM_COUNT = 18
const WHEEL_ITEMS_IN_VIEW = 4
const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT
const WHEEL_RADIUS = Math.round(
  WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT),
)
const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW

const isInView = (wheelLocation: number, slidePosition: number): boolean =>
  Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES

type SlideStyle = {
  opacity: number
  transform: string
}

const slideStyle = (
  embla: EmblaCarouselType,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number,
  wheelRotation: number,
): SlideStyle => {
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
  const styles: Partial<SlideStyle>[] = []
  for (let index = 0; index < slideCount; index += 1) {
    const style = embla
      ? slideStyle(embla, index, loop, slideCount, totalRadius, wheelRotation)
      : {}
    styles.push(style)
  }
  return styles
}

type PropType = {
  loop?: boolean
  label: string
  slideCount: number
  perspective: 'left' | 'right'
}

export const IosPickerItem: React.FC<PropType> = (props) => {
  const { slideCount, perspective, label, loop = false } = props
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    axis: 'y',
    dragFree: true,
  })
  const [wheelReady, setWheelReady] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const rootNodeRef = useRef<HTMLDivElement>(null)
  const rootNodeSize = useRef(0)
  const totalRadius = useRef(0)
  const rotation = useRef(0)
  const slideStyles = getSlideStyles(
    emblaApi,
    loop,
    slideCount,
    totalRadius.current,
    wheelRotation,
  )

  const inactivateEmblaTransform = useCallback(() => {
    if (!emblaApi) return
    const { translate, slideLooper } = emblaApi.internalEngine()
    translate.clear()
    translate.toggleActive(false)
    slideLooper.loopPoints.forEach(({ translate }) => {
      translate.clear()
      translate.toggleActive(false)
    })
  }, [emblaApi])

  const readRootNodeSize = useCallback(() => {
    if (!emblaApi) return 0
    return emblaApi.rootNode().getBoundingClientRect().height
  }, [emblaApi])

  const rotateWheel = useCallback(() => {
    if (!emblaApi) return
    setWheelRotation(rotation.current * emblaApi.scrollProgress())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    rootNodeSize.current = readRootNodeSize()
    const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS
    totalRadius.current = slideCount * WHEEL_ITEM_RADIUS
    rotation.current = slideCount * WHEEL_ITEM_RADIUS - rotationOffset

    emblaApi.on('pointerUp', () => {
      const { scrollTo, target, location } = emblaApi.internalEngine()
      const diffToTarget = target.get() - location.get()
      const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 3 ? 20 : 0.1
      const distance = diffToTarget * factor
      scrollTo.distance(distance, true)
    })

    emblaApi.on('scroll', () => {
      flushSync(() => rotateWheel())
    })

    emblaApi.on('resize', () => {
      const newRootNodeSize = readRootNodeSize()
      if (rootNodeSize.current === newRootNodeSize) return

      rootNodeSize.current = newRootNodeSize
      flushSync(() => setWheelReady(false))

      setWheelReady(() => {
        emblaApi.reInit()
        inactivateEmblaTransform()
        rotateWheel()
        return true
      })
    })

    setWheelReady(true)
    inactivateEmblaTransform()
    rotateWheel()
  }, [emblaApi, inactivateEmblaTransform, readRootNodeSize, rotateWheel])

  return (
    <div className="embla__ios-picker">
      <div className="embla__ios-picker__scene" ref={rootNodeRef}>
        <div className="embla__ios-picker__viewport" ref={emblaRef}>
          <div
            className={`embla__ios-picker__container embla__ios-picker__container--perspective-${perspective}`}
          >
            {slideStyles.map((slideStyle, index) => (
              <div
                className="embla__ios-picker__slide"
                key={index}
                style={
                  wheelReady
                    ? slideStyle
                    : { position: 'static', transform: 'none' }
                }
              >
                {index}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`embla__ios-picker__label embla__ios-picker__label--perspective-${perspective}`}
      >
        {label}
      </div>
    </div>
  )
}
