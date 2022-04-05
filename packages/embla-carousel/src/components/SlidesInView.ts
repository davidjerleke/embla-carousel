import { Limit, LimitType } from './Limit'

export type SlideBoundType = {
  start: number
  end: number
  index: number
}

export type SlidesInViewType = {
  check: (location: number, bounds?: SlideBoundType[]) => number[]
  findSlideBounds: (offsets?: number[], threshold?: number) => SlideBoundType[]
}

export function SlidesInView(
  viewSize: number,
  contentSize: number,
  slideSizes: number[],
  snaps: number[],
  limit: LimitType,
  loop: boolean,
  inViewThreshold: number,
): SlidesInViewType {
  const { removeOffset, constrain } = limit
  const roundingSafety = 0.5
  const cachedOffsets = loop ? [0, contentSize, -contentSize] : [0]
  const cachedBounds = findSlideBounds(cachedOffsets, inViewThreshold)

  function findSlideThresholds(threshold?: number): number[] {
    const slideThreshold = threshold || 0

    return slideSizes.map((slideSize) => {
      const thresholdLimit = Limit(roundingSafety, slideSize - roundingSafety)
      return thresholdLimit.constrain(slideSize * slideThreshold)
    })
  }

  function findSlideBounds(
    offsets?: number[],
    threshold?: number,
  ): SlideBoundType[] {
    const slideOffsets = offsets || cachedOffsets
    const slideThresholds = findSlideThresholds(threshold)

    return slideOffsets.reduce((list: SlideBoundType[], offset) => {
      const bounds = snaps.map((snap, index) => ({
        start: snap - slideSizes[index] + slideThresholds[index] + offset,
        end: snap + viewSize - slideThresholds[index] + offset,
        index,
      }))
      return list.concat(bounds)
    }, [])
  }

  function check(location: number, bounds?: SlideBoundType[]): number[] {
    const limitedLocation = loop ? removeOffset(location) : constrain(location)
    const slideBounds = bounds || cachedBounds

    return slideBounds.reduce((list: number[], slideBound) => {
      const { index, start, end } = slideBound
      const inList = list.indexOf(index) !== -1
      const inView = start < limitedLocation && end > limitedLocation
      return !inList && inView ? list.concat([index]) : list
    }, [])
  }

  const self: SlidesInViewType = {
    check,
    findSlideBounds,
  }
  return self
}
