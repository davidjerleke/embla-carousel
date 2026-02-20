import { useEffect } from 'react'

export const useAccessibility = (emblaApi) => {
  const setupAccessibility = (emblaApi) => {
    const accessibility = emblaApi.plugins().accessibility
    if (!accessibility) return

    accessibility.setupLiveRegion('.embla__live-region')
    accessibility.setupDotButtons('.embla__dots')
    accessibility.setupPrevAndNextButtons(
      '.embla__button--prev',
      '.embla__button--next'
    )

    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    emblaApi.on('autoplay:play', () => {
      accessibility?.setUpdateLiveRegion(false)
    })
    emblaApi.on('autoplay:stop', () => {
      accessibility?.setUpdateLiveRegion(true)
    })

    if (autoplay.isPlaying()) accessibility?.setUpdateLiveRegion(false)
  }

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('reinit', setupAccessibility)
    setupAccessibility(emblaApi)
  }, [emblaApi])
}
