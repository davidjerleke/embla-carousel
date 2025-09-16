import { LimitType } from './Limit'
import { ScrollContainOptionType } from './ScrollContain'
import { SlidesToScrollType } from './SlidesToScroll'
import {
  arrayFromRange,
  arrayIsLastIndex,
  arrayLast,
  arrayLastIndex
} from './utils'

type SnapBySlideIndexType = { [key: number]: number }

export type ScrollSnapListType = {
  slideGroupBySnap: number[][]
  snapBySlideIndex: SnapBySlideIndexType
}

export function ScrollSnapList(
  containSnaps: boolean,
  containScroll: ScrollContainOptionType,
  scrollSnaps: number[],
  scrollContainLimit: LimitType,
  slidesToScroll: SlidesToScrollType,
  slideIndexes: number[]
): ScrollSnapListType {
  const { groupSlides } = slidesToScroll
  const { min, max } = scrollContainLimit
  const slideGroupBySnap = createScrollSnapList()
  const snapBySlideIndex = createSnapBySlideIndex()

  function createScrollSnapList(): number[][] {
    const groupedSlideIndexes = groupSlides(slideIndexes)
    const doNotContain = !containSnaps || containScroll === 'keepSnaps'

    if (scrollSnaps.length === 1) return [slideIndexes]
    if (doNotContain) return groupedSlideIndexes

    return groupedSlideIndexes.slice(min, max).map((group, index, groups) => {
      const isFirst = !index
      const isLast = arrayIsLastIndex(groups, index)

      if (isFirst) {
        const rangeEnd = arrayLast(group)
        return arrayFromRange(rangeEnd)
      }
      if (isLast) {
        const rangeEnd = arrayLastIndex(slideIndexes)
        return arrayFromRange(rangeEnd, group[0])
      }
      return group
    })
  }

  function createSnapBySlideIndex(): SnapBySlideIndexType {
    const snapBySlideIndex: SnapBySlideIndexType = {}

    slideGroupBySnap.forEach((slideGroup, snapIndex) => {
      slideGroup.forEach((slideIndex) => {
        snapBySlideIndex[slideIndex] = snapIndex
      })
    })
    return snapBySlideIndex
  }

  const self: ScrollSnapListType = {
    slideGroupBySnap,
    snapBySlideIndex
  }
  return self
}
