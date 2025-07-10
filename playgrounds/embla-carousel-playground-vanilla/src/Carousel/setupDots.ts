import { EmblaCarouselType } from 'embla-carousel'

const generateDotButtonHTML = (
  emblaApi: EmblaCarouselType,
  dotsNode: HTMLElement
): HTMLElement[] => {
  const template = <HTMLElement>document.getElementById('embla-dot-template')
  dotsNode.innerHTML = emblaApi
    .snapList()
    .reduce((acc) => acc + template.innerHTML, '')

  return <HTMLElement[]>Array.from(dotsNode.querySelectorAll('.embla__dot'))
}

const addDotBtnsClickHandlers = (
  emblaApi: EmblaCarouselType,
  dotNodes: HTMLElement[]
): void => {
  dotNodes.forEach((dotNode, index) => {
    dotNode.addEventListener('click', () => emblaApi.scrollToSnap(index), false)
  })
}

const toggleDotBtnsActive = (
  emblaApi: EmblaCarouselType,
  dotNodes: HTMLElement[]
): void => {
  if (!dotNodes.length) return
  const previous = emblaApi.previousSnap()
  const selected = emblaApi.selectedSnap()
  dotNodes[previous].classList.remove('embla__dot--selected')
  dotNodes[selected].classList.add('embla__dot--selected')
}

export const createDotBtns = (
  emblaApi: EmblaCarouselType,
  dotsNode: HTMLElement
): void => {
  let dotNodes = generateDotButtonHTML(emblaApi, dotsNode)

  addDotBtnsClickHandlers(emblaApi, dotNodes)
  toggleDotBtnsActive(emblaApi, dotNodes)

  emblaApi.on('select', ({ api }) => toggleDotBtnsActive(api, dotNodes))
  emblaApi.on('reinit', ({ api }) => {
    dotNodes = generateDotButtonHTML(api, dotsNode)
    addDotBtnsClickHandlers(api, dotNodes)
    toggleDotBtnsActive(api, dotNodes)
  })
}
