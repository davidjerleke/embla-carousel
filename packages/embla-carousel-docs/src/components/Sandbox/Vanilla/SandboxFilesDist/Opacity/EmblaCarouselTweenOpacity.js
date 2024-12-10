const TWEEN_FACTOR_BASE = 0.84
let tweenFactor = 0

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max)

const setTweenFactor = (emblaApi) => {
  tweenFactor = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
}

const tweenOpacity = (emblaApi, eventName) => {
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
      const opacity = numberWithinRange(tweenValue, 0, 1).toString()
      emblaApi.slideNodes()[slideIndex].style.opacity = opacity
    })
  })
}

export const setupTweenOpacity = (emblaApi) => {
  const slideNodes = emblaApi.slideNodes()

  setTweenFactor(emblaApi)
  tweenOpacity(emblaApi)

  emblaApi
    .on('reinit', setTweenFactor)
    .on('reinit', tweenOpacity)
    .on('scroll', tweenOpacity)
    .on('slidefocus', tweenOpacity)

  return () => {
    slideNodes.forEach((slide) => slide.removeAttribute('style'))
  }
}
