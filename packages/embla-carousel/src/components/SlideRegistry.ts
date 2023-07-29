import { LimitType } from './Limit'
import { ScrollContainOptionType } from './ScrollContain'
import { SlidesToScrollType } from './SlidesToScroll'
import { arrayFromNumber, arrayLast, arrayLastIndex } from './utils'

export type SlideRegistryType = {
  slideRegistry: number[][]
}

export function SlideRegistry(
  viewSize: number,
  contentSize: number,
  scrollContainLimit: LimitType,
  containScroll: ScrollContainOptionType,
  slidesToScroll: SlidesToScrollType,
  slideIndexes: number[]
): SlideRegistryType {
  const { groupSlides } = slidesToScroll
  const { min, max } = scrollContainLimit
  const slideRegistry = createSlideRegistry()

  function createSlideRegistry(): number[][] {
    const groupedSlideIndexes = groupSlides(slideIndexes)
    if (!containScroll || contentSize <= viewSize) return groupedSlideIndexes

    return groupedSlideIndexes.slice(min, max).map((group, index, groups) => {
      const indexIsFirst = !index
      const indexIsLast = !indexIsFirst && index === arrayLastIndex(groups)

      if (indexIsFirst) {
        const range = arrayLast(groups[0]) + 1
        return arrayFromNumber(range)
      }
      if (indexIsLast) {
        const range = arrayLastIndex(slideIndexes) - arrayLast(groups)[0] + 1
        return arrayFromNumber(range, arrayLast(groups)[0])
      }
      return group
    })
  }

  const self: SlideRegistryType = {
    slideRegistry
  }
  return self
}
