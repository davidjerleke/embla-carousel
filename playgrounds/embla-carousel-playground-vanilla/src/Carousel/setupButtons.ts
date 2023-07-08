import { EmblaCarouselType } from 'embla-carousel'

export const addPrevNextBtnsClickHandlers = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): void => {
  prevBtn.addEventListener('click', () => emblaApi.scrollPrev(), false)
  nextBtn.addEventListener('click', () => emblaApi.scrollNext(), false)
}

export const togglePrevNextBtnsActive = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
) => {
  return (): void => {
    if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled')
    else prevBtn.setAttribute('disabled', 'disabled')

    if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled')
    else nextBtn.setAttribute('disabled', 'disabled')
  }
}
