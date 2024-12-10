export const addDotBtnsAndClickHandlers = (
  emblaApi,
  dotsNode,
  /*__NAV_AUTOPLAY_REPLACE_START__*/
  onButtonClick
  /*__NAV_AUTOPLAY_REPLACE_END__*/
) => {
  let dotNodes = []

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('')

    const scrollTo = (index) => {
      emblaApi.scrollTo(index)
      /*__NAV_AUTOPLAY_REPLACE_START__*/
      if (onButtonClick) onButtonClick(emblaApi)
      /*__NAV_AUTOPLAY_REPLACE_END__*/
    }

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false)
    })
  }

  const toggleDotBtnsActive = () => {
    const previous = emblaApi.previousScrollSnap()
    const selected = emblaApi.selectedScrollSnap()
    dotNodes[previous].classList.remove('embla__dot--selected')
    dotNodes[selected].classList.add('embla__dot--selected')
  }

  emblaApi
    .on('init', addDotBtnsWithClickHandlers)
    .on('reinit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reinit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive)

  return () => {
    dotsNode.innerHTML = ''
  }
}
