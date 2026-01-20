import { LimitType } from './Limit'
import { ScrollContainOptionType } from './ScrollContain'
import { ScrollProgressType } from './ScrollProgress'
import { SlidesToScrollType } from './SlidesToScroll'
import {
  arrayFromRange,
  arrayIsLastIndex,
  arrayLast,
  arrayLastIndex
} from './utils'

type SnapBySlideType = { [key: number]: number }

export type ScrollSnapListType = {
  slidesBySnap: number[][]
  snapBySlide: SnapBySlideType
  progressBySnap: number[]
  length: number
}

export function ScrollSnapList(
  containSnaps: boolean,
  containScroll: ScrollContainOptionType,
  scrollSnaps: number[],
  scrollContainLimit: LimitType,
  slidesToScroll: SlidesToScrollType,
  slideIndexes: number[],
  scrollProgress: ScrollProgressType
): ScrollSnapListType {
  const { groupSlides } = slidesToScroll
  const { min, max } = scrollContainLimit
  const slidesBySnap = getSlidesBySnap()
  const snapBySlide = getSnapsBySlide()
  const progressBySnap = scrollSnaps.map(scrollProgress.get)
  const length = scrollSnaps.length

  function getSlidesBySnap(): number[][] {
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

  function getSnapsBySlide(): SnapBySlideType {
    const snapBySlide: SnapBySlideType = {}

    slidesBySnap.forEach((slideGroup, snapIndex) => {
      slideGroup.forEach((slideIndex) => {
        snapBySlide[slideIndex] = snapIndex
      })
    })
    return snapBySlide
  }

  const self: ScrollSnapListType = {
    slidesBySnap,
    snapBySlide,
    progressBySnap,
    length
  }
  return self
}
