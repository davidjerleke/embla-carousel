export const addDotButtonAndClickHandlers = (emblaApi, dotsNode) => {
  let dotNodes = []

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .snapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('')

    const scrollTo = (index) => {
      emblaApi.goTo(index)
    }

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false)
    })
  }

  const toggleDotButtonsActive = () => {
    const previous = emblaApi.previousSnap()
    const selected = emblaApi.selectedSnap()
    dotNodes[previous].classList.remove('embla__dot--selected')
    dotNodes[selected].classList.add('embla__dot--selected')
  }

  addDotBtnsWithClickHandlers()
  toggleDotButtonsActive()

  emblaApi
    .on('reinit', addDotBtnsWithClickHandlers)
    .on('reinit', toggleDotButtonsActive)
    .on('select', toggleDotButtonsActive)
}
