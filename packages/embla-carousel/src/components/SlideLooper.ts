import { AxisType } from './Axis'
import { arrayKeys } from './utils'
import { Vector1D, Vector1DType } from './Vector1d'
import { Translate, TranslateType } from './Translate'

type SlideBoundType = {
  start: number
  end: number
}

type LoopPointType = {
  loopPoint: number
  index: number
  translate: TranslateType
  slideLocation: Vector1DType
  target: () => number
}

export type SlideLooperType = {
  canLoop: () => boolean
  clear: () => void
  loop: () => void
  loopPoints: LoopPointType[]
}

export function SlideLooper(
  axis: AxisType,
  viewSize: number,
  contentSize: number,
  slideSizes: number[],
  slideSizesWithGaps: number[],
  snaps: number[],
  scrollSnaps: number[],
  offsetLocation: Vector1DType,
  slides: HTMLElement[]
): SlideLooperType {
  const roundingSafety = 0.5
  const ascItems = arrayKeys(slideSizesWithGaps)
  const descItems = arrayKeys(slideSizesWithGaps).reverse()
  const loopPoints = startPoints().concat(endPoints())

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
  ): LoopPointType[] {
    const slideBounds = findSlideBounds(offset)

    return indexes.map((index) => {
      const initial = isEndEdge ? 0 : -contentSize
      const altered = isEndEdge ? contentSize : 0
      const boundEdge = isEndEdge ? 'end' : 'start'
      const loopPoint = slideBounds[index][boundEdge]

      return {
        index,
        loopPoint,
        slideLocation: Vector1D(-1),
        translate: Translate(axis, slides[index]),
        target: () => (offsetLocation.get() > loopPoint ? initial : altered)
      }
    })
  }

  function startPoints(): LoopPointType[] {
    const gap = scrollSnaps[0]
    const indexes = slidesInGap(descItems, gap)
    return findLoopPoints(indexes, contentSize, false)
  }

  function endPoints(): LoopPointType[] {
    const gap = viewSize - scrollSnaps[0] - 1
    const indexes = slidesInGap(ascItems, gap)
    return findLoopPoints(indexes, -contentSize, true)
  }

  function canLoop(): boolean {
    return loopPoints.every(({ index }) => {
      const otherIndexes = ascItems.filter((i) => i !== index)
      return removeSlideSizes(otherIndexes, viewSize) <= 0.1
    })
  }

  function loop(): void {
    loopPoints.forEach((loopPoint) => {
      const { target, translate, slideLocation } = loopPoint
      const shiftLocation = target()
      if (shiftLocation === slideLocation.get()) return
      translate.to(shiftLocation)
      slideLocation.set(shiftLocation)
    })
  }

  function clear(): void {
    loopPoints.forEach((loopPoint) => loopPoint.translate.clear())
  }

  const self: SlideLooperType = {
    canLoop,
    clear,
    loop,
    loopPoints
  }
  return self
}
