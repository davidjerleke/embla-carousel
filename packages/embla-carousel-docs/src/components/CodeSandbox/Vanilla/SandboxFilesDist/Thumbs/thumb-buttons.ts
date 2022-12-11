import { EmblaCarouselType } from 'embla-carousel'
 
export const addThumbBtnsClickHandlers = (
  emblaApiMain: EmblaCarouselType,
  emblaApiThumb: EmblaCarouselType,
): (() => void) => {
  const slidesThumbs = emblaApiThumb.slideNodes()
 
  const scrollToIndex = slidesThumbs.map((_, index) => (): void => {
    if (emblaApiThumb.clickAllowed()) emblaApiMain.scrollTo(index)
  })
 
  slidesThumbs.forEach((slideNode, index) => {
    slideNode.addEventListener('click', scrollToIndex[index], false)
  })
 
  return (): void => {
    slidesThumbs.forEach((slideNode, index) => {
      slideNode.removeEventListener('click', scrollToIndex[index], false)
    })
  }
}
 
export const addToggleThumbBtnsActive = (
  emblaApiMain: EmblaCarouselType,
  emblaApiThumb: EmblaCarouselType,
): (() => void) => {
  const slidesThumbs = emblaApiThumb.slideNodes()
 
  const toggleThumbBtnsState = (): void => {
    emblaApiThumb.scrollTo(emblaApiMain.selectedScrollSnap())
    const previous = emblaApiMain.previousScrollSnap()
    const selected = emblaApiMain.selectedScrollSnap()
    slidesThumbs[previous].classList.remove('embla-thumbs__slide--selected')
    slidesThumbs[selected].classList.add('embla-thumbs__slide--selected')
  }
 
  emblaApiMain.on('select', toggleThumbBtnsState)
  emblaApiThumb.on('init', toggleThumbBtnsState)
 
  return (): void => {
    const selected = emblaApiMain.selectedScrollSnap()
    slidesThumbs[selected].classList.remove('embla-thumbs__slide--selected')
  }
}
