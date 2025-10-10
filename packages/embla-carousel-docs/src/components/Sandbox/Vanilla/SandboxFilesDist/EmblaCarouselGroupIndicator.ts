import { EmblaCarouselType } from 'embla-carousel/components/EmblaCarousel'

export const addGroupIndicatorHandler = (
  emblaApi: EmblaCarouselType
): ((nextShowSlideGroups?: string) => void) => {
  const emblaNode = <HTMLElement>emblaApi.rootNode().parentElement
  const groupIndicators = emblaApi
    .slideNodes()
    .map((slideNode) => slideNode.querySelector('.embla__group__indicator'))

  let currentShowSlideGroups = 'yes'

  const clearClassNames = (groupIndicator: Element | null): void => {
    if (!groupIndicator) return

    const { classList } = groupIndicator
    const previousClasses = Array.from(classList).filter((className) =>
      className.startsWith('embla__group__indicator--')
    )
    groupIndicator.classList.remove(...previousClasses)
  }

  const getGroupIndicatorClassNames = (): string[] => {
    const { scrollSnapList } = emblaApi.internalEngine()
    const { slidesBySnap, snapBySlide } = scrollSnapList

    return emblaApi.slideNodes().map((_, slideIndex) => {
      const snapIndex = snapBySlide[slideIndex]
      const slidesInGroup = slidesBySnap[snapIndex]
      if (!slidesInGroup) return ''

      const firstIndex = slidesInGroup[0]
      const lastIndex = slidesInGroup[slidesInGroup.length - 1]
      const isSingleSlide = slidesInGroup.length === 1
      const isFirst = !isSingleSlide && firstIndex === slideIndex
      const isLast = !isSingleSlide && lastIndex === slideIndex

      let modifier = 'center'

      if (isSingleSlide) modifier = 'single'
      if (isFirst) modifier = 'start'
      if (isLast) modifier = 'end'

      return `embla__group__indicator--${modifier}`
    })
  }

  const updateGroupIndicator = (nextShowSlideGroups?: string): void => {
    currentShowSlideGroups = nextShowSlideGroups || currentShowSlideGroups
    if (!emblaNode) return

    const toggle = currentShowSlideGroups === 'yes' ? 'remove' : 'add'
    emblaNode.classList[toggle]('embla--group-indicator-hidden')

    const classNames = getGroupIndicatorClassNames()
    classNames.forEach((className, index) => {
      const groupIndicator = groupIndicators[index]
      clearClassNames(groupIndicator)
      if (className && groupIndicator) groupIndicator.classList.add(className)
    })
  }

  emblaApi.on('reinit', () => updateGroupIndicator())
  updateGroupIndicator()

  return updateGroupIndicator
}
