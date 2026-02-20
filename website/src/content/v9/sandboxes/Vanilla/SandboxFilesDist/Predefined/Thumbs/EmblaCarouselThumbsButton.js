export const addThumbButtonClickHandlers = (emblaApiMain, emblaApiThumb) => {
  const slidesThumbs = emblaApiThumb.slideNodes()

  const scrollToIndex = slidesThumbs.map(
    (_, index) => () => emblaApiMain.goTo(index)
  )

  slidesThumbs.forEach((slideNode, index) => {
    slideNode.addEventListener('click', scrollToIndex[index], false)
  })
}

export const addToggleThumbButtonsActive = (emblaApiMain, emblaApiThumb) => {
  const slidesThumbs = emblaApiThumb.slideNodes()

  const toggleThumbBtnsState = () => {
    emblaApiThumb.goTo(emblaApiMain.selectedSnap())
    const previous = emblaApiMain.previousSnap()
    const selected = emblaApiMain.selectedSnap()
    slidesThumbs[previous].classList.remove('embla-thumbs__slide--selected')
    slidesThumbs[selected].classList.add('embla-thumbs__slide--selected')
  }

  emblaApiMain.on('select', toggleThumbBtnsState)
  toggleThumbBtnsState()
}
