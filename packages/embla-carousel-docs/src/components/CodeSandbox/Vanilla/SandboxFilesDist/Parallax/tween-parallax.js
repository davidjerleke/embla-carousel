const TWEEN_FACTOR = 1.2

const calculateTweenValuesParallax = (emblaApi) => {
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
    return diffToTarget * (-1 / TWEEN_FACTOR) * 100
  })
}

export const setupTweenParallax = (emblaApi) => {
  const tweenNodes = emblaApi
    .slideNodes()
    .map((slideNode) => slideNode.querySelector('.embla__parallax__layer'))

  const applyTweenParallax = () => {
    const tweenValues = calculateTweenValuesParallax(emblaApi)
    tweenValues.forEach((tweenValue, index) => {
      tweenNodes[index].style.transform = `translateX(${tweenValue}%`
    })
  }

  const removeTweenParallax = () => {
    tweenNodes.forEach((slide) => slide.removeAttribute('style'))
  }

  return {
    applyTweenParallax,
    removeTweenParallax,
  }
}
