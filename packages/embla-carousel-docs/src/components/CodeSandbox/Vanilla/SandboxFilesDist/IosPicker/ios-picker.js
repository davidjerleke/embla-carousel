import EmblaCarousel from 'embla-carousel'

const CIRCLE_DEGREES = 360
const WHEEL_ITEM_SIZE = 30
const WHEEL_ITEM_COUNT = 18
const WHEEL_ITEMS_IN_VIEW = 4

const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT
const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW
const WHEEL_RADIUS = Math.round(
  WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT),
)

const slideIsInView = (wheelLocation, slidePosition) =>
  Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES

const rotateSlide = (emblaApi, index, loop, slideCount, totalRadius) => {
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
    slideNode.style.transform = `rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`
  } else {
    slideNode.style.opacity = '0'
    slideNode.style.transform = 'none'
  }
}

const rotateSlides = (emblaApi, loop, slideCount, totalRadius) => {
  return () => {
    for (let index = 0; index < slideCount; index += 1) {
      rotateSlide(emblaApi, index, loop, slideCount, totalRadius)
    }
  }
}

const rotateWheel = (emblaApi, slideCount, rotationOffset) => {
  return () => {
    const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset
    const wheelRotation = rotation * emblaApi.scrollProgress()
    emblaApi.containerNode().style.transform = `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`
  }
}

const inactivateEmblaTransform = (emblaApi) => {
  const { translate, slideLooper } = emblaApi.internalEngine()
  translate.clear()
  translate.toggleActive(false)
  slideLooper.loopPoints.forEach(({ translate }) => {
    translate.clear()
    translate.toggleActive(false)
  })
}

export const setupIosPicker = (iosPickerNode, options) => {
  const emblaApi = EmblaCarousel(iosPickerNode, options)
  const rootNode = emblaApi.rootNode()
  const slideCount = emblaApi.slideNodes().length
  const {
    options: { loop },
  } = emblaApi.internalEngine()
  const totalRadius = slideCount * WHEEL_ITEM_RADIUS
  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS
  const rotateWheelFunc = rotateWheel(emblaApi, slideCount, rotationOffset)
  const rotateSlidesFunc = rotateSlides(emblaApi, loop, slideCount, totalRadius)
  const readRootNodeSize = () => rootNode.getBoundingClientRect().height
  const rotate = () => {
    rotateWheelFunc()
    rotateSlidesFunc()
  }
  let rootNodeSize = readRootNodeSize()

  emblaApi.slideNodes().forEach((slideNode) => {
    slideNode.style.position = 'absolute'
  })

  emblaApi.on('pointerUp', () => {
    const { scrollTo, target, location } = emblaApi.internalEngine()
    const diffToTarget = target.value - location.value
    const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1
    const distance = diffToTarget * factor
    scrollTo.distance(distance, true)
  })

  emblaApi.on('scroll', rotate)

  const resizeObserver = new ResizeObserver(() => {
    const newRootNodeSize = readRootNodeSize()

    if (newRootNodeSize !== rootNodeSize) {
      rootNodeSize = newRootNodeSize

      emblaApi.containerNode().style.transform = 'none'
      emblaApi.slideNodes().forEach((slideNode) => {
        slideNode.style.transform = 'none'
        slideNode.style.position = 'static'
      })

      emblaApi.reInit()
      inactivateEmblaTransform(emblaApi)

      emblaApi.slideNodes().forEach((slideNode) => {
        slideNode.style.position = 'absolute'
      })
      rotate()
    }
  })

  resizeObserver.observe(rootNode)

  inactivateEmblaTransform(emblaApi)
  rotate()

  return emblaApi
}
