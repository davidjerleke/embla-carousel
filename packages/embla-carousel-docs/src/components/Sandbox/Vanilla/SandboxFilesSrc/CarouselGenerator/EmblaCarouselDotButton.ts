import { EmblaCarouselType } from 'embla-carousel'

export const addDotBtnsAndClickHandlers = (
  emblaApi: EmblaCarouselType,
  dotsNode: HTMLElement,
  /*__NAV_AUTOPLAY_REPLACE_START__*/
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
  /*__NAV_AUTOPLAY_REPLACE_END__*/
): (() => void) => {
  let dotNodes: HTMLElement[] = []

  const addDotBtnsWithClickHandlers = (): void => {
    dotsNode.innerHTML = emblaApi
      .snapList()
      .map(() => '<button class="embla__dot" type="button"></button>')
      .join('')

    const scrollTo = (index: number): void => {
      emblaApi.scrollToSnap(index)
      /*__NAV_AUTOPLAY_REPLACE_START__*/
      if (onButtonClick) onButtonClick(emblaApi)
      /*__NAV_AUTOPLAY_REPLACE_END__*/
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

  emblaApi
    .on('init', addDotBtnsWithClickHandlers)
    .on('reinit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reinit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive)

  return (): void => {
    dotsNode.innerHTML = ''
  }
}
