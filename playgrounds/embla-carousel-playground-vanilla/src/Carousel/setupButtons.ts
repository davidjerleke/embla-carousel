import { EmblaCarouselType } from 'embla-carousel'

const BUTTON_DISABLED_CLASS = 'embla__button--disabled'

export const togglePrevNextBtnsState = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): void => {
  if (emblaApi.canGoToPrev()) prevBtn.classList.remove(BUTTON_DISABLED_CLASS)
  else prevBtn.classList.add(BUTTON_DISABLED_CLASS)

  if (emblaApi.canGoToNext()) nextBtn.classList.remove(BUTTON_DISABLED_CLASS)
  else nextBtn.classList.add(BUTTON_DISABLED_CLASS)
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
