import { EmblaCarouselType } from 'embla-carousel'

const addTogglePrevNextButtonsActive = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): void => {
  const togglePrevNextButtonsState = (): void => {
    if (emblaApi.canGoToPrev()) {
      prevBtn.classList.remove('embla__button--disabled')
    } else {
      prevBtn.classList.add('embla__button--disabled')
    }

    if (emblaApi.canGoToNext()) {
      nextBtn.classList.remove('embla__button--disabled')
    } else {
      nextBtn.classList.add('embla__button--disabled')
    }
  }

  togglePrevNextButtonsState()

  emblaApi
    .on('select', togglePrevNextButtonsState)
    .on('reinit', togglePrevNextButtonsState)
}

export const addPrevNextButtonClickHandlers = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): void => {
  const scrollPrev = (): void => {
    emblaApi.goToPrev()
  }
  const scrollNext = (): void => {
    emblaApi.goToNext()
  }
  prevBtn.addEventListener('click', scrollPrev, false)
  nextBtn.addEventListener('click', scrollNext, false)

  addTogglePrevNextButtonsActive(emblaApi, prevBtn, nextBtn)
}
