import { EmblaCarouselType } from 'embla-carousel'

export const addDotBtnsClickHandlers = (
  emblaApi: EmblaCarouselType,
  dotNodes: HTMLElement[],
): void => {
  dotNodes.forEach((dotNode, index) => {
    dotNode.addEventListener('click', () => emblaApi.scrollTo(index), false)
  })
}

export const createDotBtns = (
  emblaApi: EmblaCarouselType,
  dotsNode: HTMLElement,
): HTMLElement[] => {
  const template = <HTMLElement>document.getElementById('embla-dot-template')

  dotsNode.innerHTML = emblaApi
    .scrollSnapList()
    .reduce((acc) => acc + template.innerHTML, '')

  return Array.from(dotsNode.querySelectorAll('.embla__dot'))
}

export const toggleDotBtnsActive =
  (emblaApi: EmblaCarouselType, dotNodes: HTMLElement[]) => (): void => {
    const previous = emblaApi.previousScrollSnap()
    const selected = emblaApi.selectedScrollSnap()
    dotNodes[previous].classList.remove('embla__dot--selected')
    dotNodes[selected].classList.add('embla__dot--selected')
  }
