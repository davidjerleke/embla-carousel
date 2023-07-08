import { EmblaCarouselType } from 'embla-carousel'

const TWEEN_FACTOR = 1.2

const calculateTweenValuesParallax = (
  emblaApi: EmblaCarouselType
): number[] => {
  const engine = emblaApi.internalEngine()
  const scrollProgress = emblaApi.scrollProgress()

  return emblaApi.scrollSnapList().map((scrollSnap, index) => {
    if (!emblaApi.slidesInView().includes(index)) return 0
    let diffToTarget = scrollSnap - scrollProgress

    if (engine.options.loop) {
      engine.slideLooper.loopPoints.forEach((loopItem) => {
        const target = loopItem.target()
        if (index === loopItem.index && target !== 0) {
          const sign = Math.sign(target)
          if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
          if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
        }
      })
    }
    return diffToTarget * (-1 / TWEEN_FACTOR) * 100
  })
}

export const setupTweenParallax = (
  emblaApi: EmblaCarouselType
): {
  applyTweenParallax: () => void
  removeTweenParallax: () => void
} => {
  const tweenNodes = <HTMLElement[]>(
    emblaApi
      .slideNodes()
      .map((slideNode) => slideNode.querySelector('.embla__parallax__layer'))
  )

  const applyTweenParallax = (): void => {
    const tweenValues = calculateTweenValuesParallax(emblaApi)
    tweenValues.forEach((tweenValue, index) => {
      tweenNodes[index].style.transform = `translateX(${tweenValue}%`
    })
  }

  const removeTweenParallax = (): void => {
    tweenNodes.forEach((slide) => slide.removeAttribute('style'))
  }

  return {
    applyTweenParallax,
    removeTweenParallax
  }
}
