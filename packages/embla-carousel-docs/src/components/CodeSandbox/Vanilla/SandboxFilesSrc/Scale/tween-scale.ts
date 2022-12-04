import { EmblaCarouselType } from 'embla-carousel'

const TWEEN_FACTOR = 3

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

const calculateTweenValuesScale = (emblaApi: EmblaCarouselType): number[] => {
  const engine = emblaApi.internalEngine()
  const scrollProgress = emblaApi.scrollProgress()

  return emblaApi.scrollSnapList().map((scrollSnap, index) => {
    if (!emblaApi.slidesInView().includes(index)) return 0
    let diffToTarget = scrollSnap - scrollProgress

    if (engine.options.loop) {
      engine.slideLooper.loopPoints.forEach((loopItem) => {
        const target = loopItem.target().get()
        if (index === loopItem.index && target !== 0) {
          const sign = Math.sign(target)
          if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
          if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
        }
      })
    }
    const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
    return numberWithinRange(tweenValue, 0, 1)
  })
}

export const setupTweenScale = (
  emblaApi: EmblaCarouselType,
): {
  applyTweenScale: () => void
  removeTweenScale: () => void
} => {
  const tweenNodes = <HTMLElement[]>(
    emblaApi
      .slideNodes()
      .map((slideNode) => slideNode.querySelector('.embla__scale'))
  )

  const applyTweenScale = (): void => {
    const tweenValues = calculateTweenValuesScale(emblaApi)
    tweenValues.forEach((tweenValue, index) => {
      tweenNodes[index].style.transform = `scale(${tweenValue})`
    })
  }

  const removeTweenScale = (): void => {
    tweenNodes.forEach((slide) => slide.removeAttribute('style'))
  }

  return {
    applyTweenScale,
    removeTweenScale,
  }
}
