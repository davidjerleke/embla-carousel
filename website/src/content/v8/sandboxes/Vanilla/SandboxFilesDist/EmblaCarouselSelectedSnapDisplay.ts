import { EmblaCarouselType } from '@vendor/embla-carousel-v8/embla-carousel'

export const updateSelectedSnapDisplay = (
  emblaApi: EmblaCarouselType,
  snapDisplay: HTMLElement
): void => {
  const updateSnapDisplay = (emblaApi: EmblaCarouselType): void => {
    const selectedSnap = emblaApi.selectedScrollSnap()
    const snapCount = emblaApi.scrollSnapList().length
    snapDisplay.innerHTML = `${selectedSnap + 1} / ${snapCount}`
  }

  emblaApi.on('select', updateSnapDisplay).on('reInit', updateSnapDisplay)

  updateSnapDisplay(emblaApi)
}
