const addTogglePrevNextButtonsActive = (emblaApi, prevBtn, nextBtn) => {
  const togglePrevNextBtnsState = () => {
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
