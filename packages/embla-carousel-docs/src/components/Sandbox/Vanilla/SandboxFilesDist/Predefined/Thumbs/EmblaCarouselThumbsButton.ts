import { EmblaCarouselType } from 'embla-carousel'

export const addThumbButtonClickHandlers = (
  emblaApiMain: EmblaCarouselType,
  emblaApiThumb: EmblaCarouselType
): void => {
  const slidesThumbs = emblaApiThumb.slideNodes()

  const scrollToIndex = slidesThumbs.map(
    (_, index) => (): void => emblaApiMain.scrollToSnap(index)
  )

  slidesThumbs.forEach((slideNode, index) => {
    slideNode.addEventListener('click', scrollToIndex[index], false)
  })
}

export const addToggleThumbButtonsActive = (
  emblaApiMain: EmblaCarouselType,
  emblaApiThumb: EmblaCarouselType
): void => {
  const slidesThumbs = emblaApiThumb.slideNodes()

  const toggleThumbBtnsState = (): void => {
    emblaApiThumb.scrollToSnap(emblaApiMain.selectedSnap())
    const previous = emblaApiMain.previousSnap()
    const selected = emblaApiMain.selectedSnap()
    slidesThumbs[previous].classList.remove('embla-thumbs__slide--selected')
    slidesThumbs[selected].classList.add('embla-thumbs__slide--selected')
  }

  emblaApiMain.on('select', toggleThumbBtnsState)
  toggleThumbBtnsState()
}
