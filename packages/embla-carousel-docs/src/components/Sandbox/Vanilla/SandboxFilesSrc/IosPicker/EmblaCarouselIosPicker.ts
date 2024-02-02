import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType
} from 'embla-carousel'

const CIRCLE_DEGREES = 360
const WHEEL_ITEM_SIZE = 30
const WHEEL_ITEM_COUNT = 18
const WHEEL_ITEMS_IN_VIEW = 4

const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT
const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW
const WHEEL_RADIUS = Math.round(
  WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT)
)

const slideIsInView = (wheelLocation: number, slidePosition: number): boolean =>
  Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES

const rotateSlide = (
  emblaApi: EmblaCarouselType,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number
): void => {
  const slideNode = emblaApi.slideNodes()[index]
  const wheelLocation = emblaApi.scrollProgress() * totalRadius
  const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius
  const positionLoopStart = positionDefault + totalRadius
  const positionLoopEnd = positionDefault - totalRadius

  let inView = false
  let angle = index * -WHEEL_ITEM_RADIUS

  if (slideIsInView(wheelLocation, positionDefault)) {
    inView = true
  }

  if (loop && slideIsInView(wheelLocation, positionLoopEnd)) {
    inView = true
    angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS
  }

  if (loop && slideIsInView(wheelLocation, positionLoopStart)) {
    inView = true
    angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS
  }

  if (inView) {
    slideNode.style.opacity = '1'
    slideNode.style.transform = `translateY(-${
      index * 100
    }%) rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`
  } else {
    slideNode.style.opacity = '0'
    slideNode.style.transform = 'none'
  }
}

const rotateSlides = (
  emblaApi: EmblaCarouselType,
  loop: boolean,
  slideCount: number,
  totalRadius: number
): (() => void) => {
  return (): void => {
    for (let index = 0; index < slideCount; index += 1) {
      rotateSlide(emblaApi, index, loop, slideCount, totalRadius)
    }
  }
}

const rotateWheel = (
  emblaApi: EmblaCarouselType,
  slideCount: number,
  rotationOffset: number
): (() => void) => {
  return (): void => {
    const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset
    const wheelRotation = rotation * emblaApi.scrollProgress()
    emblaApi.containerNode().style.transform = `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`
  }
}

const inactivateEmblaTransform = (emblaApi: EmblaCarouselType): void => {
  const { translate, slideLooper } = emblaApi.internalEngine()
  translate.clear()
  translate.toggleActive(false)
  slideLooper.loopPoints.forEach(({ translate }) => {
    translate.clear()
    translate.toggleActive(false)
  })
}

export const setupIosPicker = (
  iosPickerNode: HTMLElement,
  options: EmblaOptionsType
): EmblaCarouselType => {
  const emblaApi = EmblaCarousel(iosPickerNode, options)
  const slideCount = emblaApi.slideNodes().length
  const {
    options: { loop }
  } = emblaApi.internalEngine()
  const totalRadius = slideCount * WHEEL_ITEM_RADIUS
  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS
  const rotateWheelFunc = rotateWheel(emblaApi, slideCount, rotationOffset)
  const rotateSlidesFunc = rotateSlides(emblaApi, loop, slideCount, totalRadius)
  const rotate = (): void => {
    rotateWheelFunc()
    rotateSlidesFunc()
  }

  emblaApi.on('pointerUp', () => {
    const { scrollTo, target, location } = emblaApi.internalEngine()
    const diffToTarget = target.get() - location.get()
    const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1
    const distance = diffToTarget * factor
    scrollTo.distance(distance, true)
  })

  emblaApi.on('scroll', rotate)

  emblaApi.on('reInit', () => {
    inactivateEmblaTransform(emblaApi)
    rotate()
  })

  inactivateEmblaTransform(emblaApi)
  rotate()

  return emblaApi
}
