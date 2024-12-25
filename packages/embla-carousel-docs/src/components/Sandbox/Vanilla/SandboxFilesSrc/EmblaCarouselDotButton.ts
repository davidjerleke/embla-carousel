import { EmblaCarouselType } from 'embla-carousel'

export const addDotBtnsAndClickHandlers = (
  emblaApi: EmblaCarouselType,
  dotsNode: HTMLElement
): (() => void) => {
  let dotNodes: HTMLElement[] = []

  const addDotBtnsWithClickHandlers = (): void => {
    dotsNode.innerHTML = emblaApi
      .snapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('')

    const scrollTo = (index: number): void => {
      emblaApi.scrollToSnap(index)
    }

    dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'))
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false)
    })
  }

  const toggleDotBtnsActive = (): void => {
    const previous = emblaApi.previousSnap()
    const selected = emblaApi.selectedSnap()
    dotNodes[previous].classList.remove('embla__dot--selected')
    dotNodes[selected].classList.add('embla__dot--selected')
  }

  addDotBtnsWithClickHandlers()
  toggleDotBtnsActive()

  emblaApi
    .on('reinit', addDotBtnsWithClickHandlers)
    .on('reinit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive)

  return (): void => {
    dotsNode.innerHTML = ''
  }
}
