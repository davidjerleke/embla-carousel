import { EmblaCarouselType } from 'embla-carousel'
 
export const addPrevNextBtnsClickHandlers = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement,
): (() => void) => {
  const scrollPrev = () => emblaApi.scrollPrev()
  const scrollNext = () => emblaApi.scrollNext()
  prevBtn.addEventListener('click', scrollPrev, false)
  nextBtn.addEventListener('click', scrollNext, false)
 
  return (): void => {
    prevBtn.removeEventListener('click', scrollPrev, false)
    nextBtn.removeEventListener('click', scrollNext, false)
  }
}
 
export const addTogglePrevNextBtnsActive = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement,
): (() => void) => {
  const togglePrevNextBtnsState = (): void => {
    if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled')
    else prevBtn.setAttribute('disabled', 'disabled')
 
    if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled')
    else nextBtn.setAttribute('disabled', 'disabled')
  }
 
  emblaApi
    .on('select', togglePrevNextBtnsState)
    .on('init', togglePrevNextBtnsState)
    .on('reInit', togglePrevNextBtnsState)
 
  return (): void => {
    prevBtn.removeAttribute('disabled')
    nextBtn.setAttribute('disabled', 'disabled')
  }
}
 
export const addDotBtnsAndClickHandlers = (
  emblaApi: EmblaCarouselType,
  dotsNode: HTMLElement,
): (() => void) => {
  let dotNodes: HTMLElement[] = []
 
  const addDotBtnsWithClickHandlers = (): void => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('')
 
    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => emblaApi.scrollTo(index), false)
    })
  }
 
  const toggleDotBtnsActive = (): void => {
    const previous = emblaApi.previousScrollSnap()
    const selected = emblaApi.selectedScrollSnap()
    dotNodes[previous].classList.remove('embla__dot--selected')
    dotNodes[selected].classList.add('embla__dot--selected')
  }
 
  emblaApi
    .on('init', addDotBtnsWithClickHandlers)
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reInit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive)
 
  return (): void => {
    dotsNode.innerHTML = ''
  }
}
