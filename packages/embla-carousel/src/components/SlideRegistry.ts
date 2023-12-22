import { LimitType } from './Limit'
import { ScrollContainOptionType } from './ScrollContain'
import { SlidesToScrollType } from './SlidesToScroll'
import {
  arrayFromNumber,
  arrayIsLastIndex,
  arrayLast,
  arrayLastIndex
} from './utils'

export type SlideRegistryType = {
  slideRegistry: number[][]
}

export function SlideRegistry(
  containSnaps: boolean,
  containScroll: ScrollContainOptionType,
  scrollSnaps: number[],
  scrollContainLimit: LimitType,
  slidesToScroll: SlidesToScrollType,
  slideIndexes: number[]
): SlideRegistryType {
  const { groupSlides } = slidesToScroll
  const { min, max } = scrollContainLimit
  const slideRegistry = createSlideRegistry()

  function createSlideRegistry(): number[][] {
    const groupedSlideIndexes = groupSlides(slideIndexes)
    const doNotContain = !containSnaps || containScroll === 'keepSnaps'

    if (scrollSnaps.length === 1) return [slideIndexes]
    if (doNotContain) return groupedSlideIndexes

    return groupedSlideIndexes.slice(min, max).map((group, index, groups) => {
      const isFirst = !index
      const isLast = arrayIsLastIndex(groups, index)

      if (isFirst) {
        const range = arrayLast(groups[0]) + 1
        return arrayFromNumber(range)
      }
      if (isLast) {
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
