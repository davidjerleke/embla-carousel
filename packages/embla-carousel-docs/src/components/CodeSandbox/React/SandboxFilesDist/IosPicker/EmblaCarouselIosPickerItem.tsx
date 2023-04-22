import React, { useEffect, useState, useCallback, useRef } from 'react'
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'
import { flushSync } from 'react-dom'

const CIRCLE_DEGREES = 360
const WHEEL_ITEM_SIZE = 30
const WHEEL_ITEM_COUNT = 18
const WHEEL_ITEMS_IN_VIEW = 4

export const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT
export const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW
export const WHEEL_RADIUS = Math.round(
  WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT),
)

const isInView = (wheelLocation: number, slidePosition: number): boolean =>
  Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES

type SlideStylesType = {
  opacity: number
  transform: string
}

const getSlideStyles = (
  emblaApi: EmblaCarouselType,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number,
): SlideStylesType => {
  const wheelLocation = emblaApi.scrollProgress() * totalRadius
  const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius
  const positionLoopStart = positionDefault + totalRadius
  const positionLoopEnd = positionDefault - totalRadius

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
      transform: `rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`,
    }
  }
  return { opacity: 0, transform: 'none' }
}

export const getContainerStyles = (
  wheelRotation: number,
): Pick<SlideStylesType, 'transform'> => ({
  transform: `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`,
})

export const getSlidesStyles = (
  emblaApi: EmblaCarouselType | undefined,
  loop: boolean,
  slideCount: number,
  totalRadius: number,
): SlideStylesType[] => {
  const slidesStyles: SlideStylesType[] = []

  for (let index = 0; index < slideCount; index += 1) {
    const slideStyle = emblaApi
      ? getSlideStyles(emblaApi, index, loop, slideCount, totalRadius)
      : ({} as SlideStylesType)
    slidesStyles.push(slideStyle)
  }
  return slidesStyles
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
    watchResize: false,
    watchSlides: false,
  })
  const [wheelReady, setWheelReady] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const rootNodeRef = useRef<HTMLDivElement>(null)
  const rootNodeSize = useRef(0)
  const totalRadius = slideCount * WHEEL_ITEM_RADIUS
  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS
  const containerStyles = getContainerStyles(wheelRotation)
  const slideStyles = getSlidesStyles(emblaApi, loop, slideCount, totalRadius)

  const inactivateEmblaTransform = useCallback(
    (emblaApi: EmblaCarouselType) => {
      if (!emblaApi) return
      const { translate, slideLooper } = emblaApi.internalEngine()
      translate.clear()
      translate.toggleActive(false)
      slideLooper.loopPoints.forEach(({ translate }) => {
        translate.clear()
        translate.toggleActive(false)
      })
    },
    [],
  )

  const readRootNodeSize = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return 0
    return emblaApi.rootNode().getBoundingClientRect().height
  }, [])

  const rotateWheel = useCallback(
    (emblaApi: EmblaCarouselType) => {
      if (!emblaApi) return
      const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset
      setWheelRotation(rotation * emblaApi.scrollProgress())
    },
    [slideCount, rotationOffset, setWheelRotation],
  )

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('pointerUp', () => {
      const { scrollTo, target, location } = emblaApi.internalEngine()
      const diffToTarget = target.get() - location.get()
      const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1
      const distance = diffToTarget * factor
      scrollTo.distance(distance, true)
    })

    emblaApi.on('scroll', () => {
      flushSync(() => rotateWheel(emblaApi))
    })

    setWheelReady(true)
    inactivateEmblaTransform(emblaApi)
    rotateWheel(emblaApi)
  }, [emblaApi, inactivateEmblaTransform, rotateWheel])

  useEffect(() => {
    if (!emblaApi) return
    if (!rootNodeSize.current) rootNodeSize.current = readRootNodeSize(emblaApi)

    const resizeObserver = new ResizeObserver(() => {
      if (readRootNodeSize(emblaApi) !== rootNodeSize.current) {
        rootNodeSize.current = readRootNodeSize(emblaApi)
        flushSync(() => setWheelReady(false))

        setWheelReady(() => {
          emblaApi.reInit()
          inactivateEmblaTransform(emblaApi)
          rotateWheel(emblaApi)
          return true
        })
      }
    })

    resizeObserver.observe(emblaApi.rootNode())

    return () => {
      resizeObserver.disconnect()
    }
  }, [
    emblaApi,
    inactivateEmblaTransform,
    setWheelReady,
    rotateWheel,
    readRootNodeSize,
  ])

  return (
    <div className="embla__ios-picker">
      <div className="embla__ios-picker__scene" ref={rootNodeRef}>
        <div
          className={`embla__ios-picker__viewport embla__ios-picker__viewport--perspective-${perspective}`}
          ref={emblaRef}
        >
          <div
            className="embla__ios-picker__container"
            style={wheelReady ? containerStyles : { transform: 'none' }}
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
      <div className="embla__ios-picker__label">{label}</div>
    </div>
  )
}
