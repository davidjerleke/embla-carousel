import { EmblaCarouselType } from 'embla-carousel'

export const addAccessibility = (emblaApi: EmblaCarouselType): void => {
  const setupAccessibility = (emblaApi: EmblaCarouselType) => {
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
