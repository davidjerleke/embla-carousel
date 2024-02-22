import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'

const TWEEN_FACTOR_BASE = 0.52
let tweenFactor = 0
let tweenNodes: HTMLElement[] = []

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

const setTweenNodes = (emblaApi: EmblaCarouselType): void => {
  tweenNodes = emblaApi.slideNodes().map((slideNode) => {
    return slideNode.querySelector('.embla__slide__number') as HTMLElement
  })
}

const setTweenFactor = (emblaApi: EmblaCarouselType): void => {
  tweenFactor = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
}

const tweenScale = (
  emblaApi: EmblaCarouselType,
  eventName?: EmblaEventType
): void => {
  const engine = emblaApi.internalEngine()
  const scrollProgress = emblaApi.scrollProgress()
  const slidesInView = emblaApi.slidesInView()
  const isScrollEvent = eventName === 'scroll'

  emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
    let diffToTarget = scrollSnap - scrollProgress
    const slidesInSnap = engine.slideRegistry[snapIndex]

    slidesInSnap.forEach((slideIndex) => {
      if (isScrollEvent && !slidesInView.includes(slideIndex)) return

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target()

          if (slideIndex === loopItem.index && target !== 0) {
            const sign = Math.sign(target)

            if (sign === -1) {
              diffToTarget = scrollSnap - (1 + scrollProgress)
            }
            if (sign === 1) {
              diffToTarget = scrollSnap + (1 - scrollProgress)
            }
          }
        })
      }

      const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor)
      const scale = numberWithinRange(tweenValue, 0, 1).toString()
      const tweenNode = tweenNodes[slideIndex]
      tweenNode.style.transform = `scale(${scale})`
    })
  })
}

export const setupTweenScale = (emblaApi: EmblaCarouselType): (() => void) => {
  setTweenNodes(emblaApi)
  setTweenFactor(emblaApi)
  tweenScale(emblaApi)

  emblaApi
    .on('reInit', setTweenNodes)
    .on('reInit', setTweenFactor)
    .on('reInit', tweenScale)
    .on('scroll', tweenScale)

  return (): void => {
    tweenNodes.forEach((slide) => slide.removeAttribute('style'))
    emblaApi
      .off('reInit', setTweenNodes)
      .off('reInit', setTweenFactor)
      .off('reInit', tweenScale)
      .off('scroll', tweenScale)
  }
}
