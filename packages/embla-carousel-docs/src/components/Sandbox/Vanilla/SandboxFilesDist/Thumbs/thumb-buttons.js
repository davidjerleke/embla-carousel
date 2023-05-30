export const addThumbBtnsClickHandlers = (emblaApiMain, emblaApiThumb) => {
  const slidesThumbs = emblaApiThumb.slideNodes()

  const scrollToIndex = slidesThumbs.map(
    (_, index) => () => emblaApiMain.scrollTo(index)
  )

  slidesThumbs.forEach((slideNode, index) => {
    slideNode.addEventListener('click', scrollToIndex[index], false)
  })

  return () => {
    slidesThumbs.forEach((slideNode, index) => {
      slideNode.removeEventListener('click', scrollToIndex[index], false)
    })
  }
}

export const addToggleThumbBtnsActive = (emblaApiMain, emblaApiThumb) => {
  const slidesThumbs = emblaApiThumb.slideNodes()

  const toggleThumbBtnsState = () => {
    emblaApiThumb.scrollTo(emblaApiMain.selectedScrollSnap())
    const previous = emblaApiMain.previousScrollSnap()
    const selected = emblaApiMain.selectedScrollSnap()
    slidesThumbs[previous].classList.remove('embla-thumbs__slide--selected')
    slidesThumbs[selected].classList.add('embla-thumbs__slide--selected')
  }

  emblaApiMain.on('select', toggleThumbBtnsState)
  emblaApiThumb.on('init', toggleThumbBtnsState)

  return () => {
    const selected = emblaApiMain.selectedScrollSnap()
    slidesThumbs[selected].classList.remove('embla-thumbs__slide--selected')
  }
}
