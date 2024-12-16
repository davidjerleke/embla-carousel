import { EmblaCarouselType } from 'embla-carousel'

export const updateSelectedSnapDisplay = (
  emblaApi: EmblaCarouselType,
  snapDisplay: HTMLElement
): void => {
  const updateSnapDisplay = (emblaApi: EmblaCarouselType) => {
    const selectedSnap = emblaApi.selectedSnap()
    const snapCount = emblaApi.snapList().length
    snapDisplay.innerHTML = `${selectedSnap + 1} / ${snapCount}`
  }

  emblaApi.on('select', updateSnapDisplay).on('reinit', updateSnapDisplay)

  updateSnapDisplay(emblaApi)
}
