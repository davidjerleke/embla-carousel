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
  nextBtn: HTMLElement,
  /*__NAV_AUTOPLAY_REPLACE_START__*/
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
  /*__NAV_AUTOPLAY_REPLACE_END__*/
): void => {
  const scrollPrev = (): void => {
    emblaApi.goToPrev()
    /*__NAV_AUTOPLAY_REPLACE_START__*/
    if (onButtonClick) onButtonClick(emblaApi)
    /*__NAV_AUTOPLAY_REPLACE_END__*/
  }
  const scrollNext = (): void => {
    emblaApi.goToNext()
    /*__NAV_AUTOPLAY_REPLACE_START__*/
    if (onButtonClick) onButtonClick(emblaApi)
    /*__NAV_AUTOPLAY_REPLACE_END__*/
  }
  prevBtn.addEventListener('click', scrollPrev, false)
  nextBtn.addEventListener('click', scrollNext, false)

  addTogglePrevNextButtonsActive(emblaApi, prevBtn, nextBtn)
}
