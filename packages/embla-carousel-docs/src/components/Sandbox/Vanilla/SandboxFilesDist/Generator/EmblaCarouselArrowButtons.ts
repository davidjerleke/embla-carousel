import { EmblaCarouselType } from 'embla-carousel'

const addTogglePrevNextButtonsActive = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): void => {
  const togglePrevNextBtnsState = (): void => {
    if (emblaApi.canScrollToPrev()) prevBtn.removeAttribute('disabled')
    else prevBtn.setAttribute('disabled', 'disabled')

    if (emblaApi.canScrollToNext()) nextBtn.removeAttribute('disabled')
    else nextBtn.setAttribute('disabled', 'disabled')
  }

  togglePrevNextBtnsState()

  emblaApi
    .on('select', togglePrevNextBtnsState)
    .on('reinit', togglePrevNextBtnsState)
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
    emblaApi.scrollToPrev()
    /*__NAV_AUTOPLAY_REPLACE_START__*/
    if (onButtonClick) onButtonClick(emblaApi)
    /*__NAV_AUTOPLAY_REPLACE_END__*/
  }
  const scrollNext = (): void => {
    emblaApi.scrollToNext()
    /*__NAV_AUTOPLAY_REPLACE_START__*/
    if (onButtonClick) onButtonClick(emblaApi)
    /*__NAV_AUTOPLAY_REPLACE_END__*/
  }
  prevBtn.addEventListener('click', scrollPrev, false)
  nextBtn.addEventListener('click', scrollNext, false)

  addTogglePrevNextButtonsActive(emblaApi, prevBtn, nextBtn)
}
