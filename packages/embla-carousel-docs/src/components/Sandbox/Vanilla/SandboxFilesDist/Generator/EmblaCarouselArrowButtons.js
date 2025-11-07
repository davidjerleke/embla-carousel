const addTogglePrevNextButtonsActive = (emblaApi, prevBtn, nextBtn) => {
  const togglePrevNextButtonsState = () => {
    if (emblaApi.canScrollToPrev()) {
      prevBtn.classList.remove('embla__button--disabled')
    } else {
      prevBtn.classList.add('embla__button--disabled')
    }

    if (emblaApi.canScrollToNext()) {
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
  emblaApi,
  prevBtn,
  nextBtn,
  /*__NAV_AUTOPLAY_REPLACE_START__*/
  onButtonClick
  /*__NAV_AUTOPLAY_REPLACE_END__*/
) => {
  const scrollPrev = () => {
    emblaApi.scrollToPrev()
    /*__NAV_AUTOPLAY_REPLACE_START__*/
    if (onButtonClick) onButtonClick(emblaApi)
    /*__NAV_AUTOPLAY_REPLACE_END__*/
  }
  const scrollNext = () => {
    emblaApi.scrollToNext()
    /*__NAV_AUTOPLAY_REPLACE_START__*/
    if (onButtonClick) onButtonClick(emblaApi)
    /*__NAV_AUTOPLAY_REPLACE_END__*/
  }
  prevBtn.addEventListener('click', scrollPrev, false)
  nextBtn.addEventListener('click', scrollNext, false)

  addTogglePrevNextButtonsActive(emblaApi, prevBtn, nextBtn)
}
