export const addAccessibility = (emblaApi) => {
  const setupAccessibility = (emblaApi) => {
    const accessibility = emblaApi.plugins().accessibility
    if (!accessibility) return

    accessibility.setupLiveRegion('.embla__live-region')
    accessibility.setupDotButtons('.embla__dots')
    accessibility.setupPrevAndNextButtons(
      '.embla__button--prev',
      '.embla__button--next'
    )
  }

  emblaApi.on('reinit', setupAccessibility)
  setupAccessibility(emblaApi)
}
