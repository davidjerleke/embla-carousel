export const addAutoplayProgressListeners = (emblaApi, progressNode) => {
  const progressBarNode = progressNode.querySelector('.embla__progress__bar')

  let animationName = ''
  let timeoutId = 0
  let rafId = 0

  const startProgress = (emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const timeUntilNext = autoplay.timeUntilNext()
    if (timeUntilNext === null) return

    if (!animationName) {
      const style = window.getComputedStyle(progressBarNode)
      animationName = style.animationName
    }

    progressBarNode.style.animationName = 'none'
    progressBarNode.style.transform = 'translate3d(0,0,0)'

    rafId = window.requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => {
        progressBarNode.style.animationName = animationName
        progressBarNode.style.animationDuration = `${timeUntilNext}ms`
      }, 0)
    })

    progressNode.classList.remove('embla__progress--hidden')
  }

  const stopProgress = (emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    progressNode.classList.add('embla__progress--hidden')
  }

  emblaApi
    .on('autoplay:timerset', startProgress)
    .on('autoplay:timerstopped', stopProgress)
}
