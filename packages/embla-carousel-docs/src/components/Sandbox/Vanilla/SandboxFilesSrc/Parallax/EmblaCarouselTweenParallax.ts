import {
  EmblaCarouselType,
  EmblaEventListType,
  EmblaEventModelType
} from 'embla-carousel'

const TWEEN_FACTOR_BASE = 0.2
let tweenFactor = 0
let tweenNodes: HTMLElement[] = []

const setTweenNodes = (emblaApi: EmblaCarouselType): void => {
  tweenNodes = emblaApi.slideNodes().map((slideNode) => {
    return slideNode.querySelector('.embla__parallax__layer') as HTMLElement
  })
}

const setTweenFactor = (emblaApi: EmblaCarouselType): void => {
  tweenFactor = TWEEN_FACTOR_BASE * emblaApi.snapList().length
}

const tweenParallax = <EventType extends keyof EmblaEventListType>(
  emblaApi: EmblaCarouselType,
  event?: EmblaEventModelType<EventType>
): void => {
  const engine = emblaApi.internalEngine()
  const scrollProgress = emblaApi.scrollProgress()
  const slidesInView = emblaApi.slidesInView()
  const isScrollEvent = event?.type === 'scroll'

  emblaApi.snapList().forEach((scrollSnap, snapIndex) => {
    let diffToTarget = scrollSnap - scrollProgress
    const slidesInSnap = engine.scrollSnapList.slideGroupBySnap[snapIndex]

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

      const translate = diffToTarget * (-1 * tweenFactor) * 100
      const tweenNode = tweenNodes[slideIndex]
      tweenNode.style.transform = `translateX(${translate}%)`
    })
  })
}

export const setupTweenParallax = (emblaApi: EmblaCarouselType): void => {
  setTweenNodes(emblaApi)
  setTweenFactor(emblaApi)
  tweenParallax(emblaApi)

  emblaApi
    .on('reinit', setTweenNodes)
    .on('reinit', setTweenFactor)
    .on('reinit', tweenParallax)
    .on('scroll', tweenParallax)
    .on('slidefocus', tweenParallax)
}
