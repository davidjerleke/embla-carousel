import { EmblaCarouselType } from 'embla-carousel'

export const addAutoplayProgressListeners = (
  emblaApi: EmblaCarouselType,
  progressNode: HTMLElement
): (() => void) => {
  const progressBarNode = <HTMLElement>(
    progressNode.querySelector('.embla__progress__bar')
  )

  let animationName = ''
  let timeoutId = 0
  let rafId = 0

  const startProgress = (emblaApi: EmblaCarouselType) => {
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

  const stopProgress = (emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    progressNode.classList.add('embla__progress--hidden')
  }

  emblaApi
    .on('autoplay:timerset', startProgress)
    .on('autoplay:timerstopped', stopProgress)

  return () => {
    emblaApi
      .off('autoplay:timerset', startProgress)
      .off('autoplay:timerstopped', stopProgress)
  }
}
