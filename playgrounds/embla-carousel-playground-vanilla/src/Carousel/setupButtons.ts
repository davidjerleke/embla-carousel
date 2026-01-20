import { EmblaCarouselType } from 'embla-carousel'

export const togglePrevNextBtnsState = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): void => {
  if (emblaApi.canGoToPrev()) prevBtn.removeAttribute('disabled')
  else prevBtn.setAttribute('disabled', 'disabled')

  if (emblaApi.canGoToNext()) nextBtn.removeAttribute('disabled')
  else nextBtn.setAttribute('disabled', 'disabled')
}

export const addPrevNextBtnsClickHandlers = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): void => {
  const scrollPrev = () => emblaApi.goToPrev()
  const scrollNext = () => emblaApi.goToNext()
  prevBtn.addEventListener('click', scrollPrev, false)
  nextBtn.addEventListener('click', scrollNext, false)

  const toggleButtonsState = (): void =>
    togglePrevNextBtnsState(emblaApi, prevBtn, nextBtn)

  toggleButtonsState()

  emblaApi.on('select', toggleButtonsState).on('reinit', toggleButtonsState)
}
