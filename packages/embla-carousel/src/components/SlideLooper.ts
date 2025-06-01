import { arrayKeys } from './utils'
import { Vector1D, Vector1DType } from './Vector1d'

type SlideBoundType = {
  start: number
  end: number
}

type LoopPointType = {
  loopPoint: number
  index: number
  slideLocation: Vector1DType
  target: () => number
}

type LoopPointsType = {
  [key: number]: LoopPointType
}

export type SlideLooperType = {
  canLoop: () => boolean
  loop: () => void
  loopPoints: LoopPointsType
  loopPointList: LoopPointType[]
}

export function SlideLooper(
  viewSize: number,
  contentSize: number,
  slideSizes: number[],
  slideSizesWithGaps: number[],
  snaps: number[],
  scrollSnaps: number[],
  location: Vector1DType
): SlideLooperType {
  const roundingSafety = 0.5
  const ascItems = arrayKeys(slideSizesWithGaps)
  const descItems = arrayKeys(slideSizesWithGaps).reverse()
  const loopPoints: LoopPointsType = { ...startPoints(), ...endPoints() }
  const loopPointList = Object.values(loopPoints)

  function removeSlideSizes(indexes: number[], from: number): number {
    return indexes.reduce((a: number, i) => {
      return a - slideSizesWithGaps[i]
    }, from)
  }

  function slidesInGap(indexes: number[], gap: number): number[] {
    return indexes.reduce((a: number[], i) => {
      const remainingGap = removeSlideSizes(a, gap)
      return remainingGap > 0 ? a.concat([i]) : a
    }, [])
  }

  function findSlideBounds(offset: number): SlideBoundType[] {
    return snaps.map((snap, index) => ({
      start: snap - slideSizes[index] + roundingSafety + offset,
      end: snap + viewSize - roundingSafety + offset
    }))
  }

  function findLoopPoints(
    indexes: number[],
    offset: number,
    isEndEdge: boolean
  ): LoopPointsType {
    const slideBounds = findSlideBounds(offset)

    return indexes.reduce((acc: LoopPointsType, index) => {
      const initial = isEndEdge ? 0 : -contentSize
      const altered = isEndEdge ? contentSize : 0
      const boundEdge = isEndEdge ? 'end' : 'start'
      const loopPoint = slideBounds[index][boundEdge]

      return {
        ...acc,
        [index]: {
          index,
          loopPoint,
          slideLocation: Vector1D(-1),
          target: () => (location.get() > loopPoint ? initial : altered)
        }
      }
    }, {})
  }

  function startPoints(): LoopPointsType {
    const gap = scrollSnaps[0]
    const indexes = slidesInGap(descItems, gap)
    return findLoopPoints(indexes, contentSize, false)
  }

  function endPoints(): LoopPointsType {
    const gap = viewSize - scrollSnaps[0] - 1
    const indexes = slidesInGap(ascItems, gap)
    return findLoopPoints(indexes, -contentSize, true)
  }

  function canLoop(): boolean {
    return loopPointList.every(({ index }) => {
      const otherIndexes = ascItems.filter((i) => i !== index)
      return removeSlideSizes(otherIndexes, viewSize) <= 0.1
    })
  }

  function loop(): void {
    loopPointList.forEach((loopPoint) => {
      const { target, slideLocation } = loopPoint
      const shiftLocation = target()
      slideLocation.set(shiftLocation)
    })
  }

  const self: SlideLooperType = {
    canLoop,
    loop,
    loopPoints,
    loopPointList
  }
  return self
}
