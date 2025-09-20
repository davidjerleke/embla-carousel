import { arrayKeys } from './utils'
import { Vector1D, Vector1DType } from './Vector1d'
import { TranslateType } from './Translate'

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
  loop: () => void
  loopPoints: LoopPointType[]
}

export function SlideLooper(
  viewSize: number,
  contentSize: number,
  slideSizes: number[],
  slideSizesWithGaps: number[],
  snaps: number[],
  scrollSnaps: number[],
  location: Vector1DType,
  slideTranslates: TranslateType[]
): SlideLooperType {
  const roundingSafety = 0.5
  const ascItems = arrayKeys(slideSizesWithGaps)
  const descItems = arrayKeys(slideSizesWithGaps).reverse()
  const loopPoints = startPoints().concat(endPoints())

  function getRemainingGapAfterSlides(indexes: number[], from: number): number {
    return indexes.reduce((remainingGap: number, index) => {
      return remainingGap - slideSizesWithGaps[index]
    }, from)
  }

  function getSlidesThatFitGap(indexes: number[], gap: number): number[] {
    return indexes.reduce((slidesThatFit: number[], index) => {
      const remainingGap = getRemainingGapAfterSlides(slidesThatFit, gap)
      return remainingGap > 0 ? [...slidesThatFit, index] : slidesThatFit
    }, [])
  }

  function getSlideBounds(offset: number): SlideBoundType[] {
    return snaps.map((snap, index) => ({
      start: snap - slideSizes[index] + roundingSafety + offset,
      end: snap + viewSize - roundingSafety + offset
    }))
  }

  function getLoopPoints(
    indexes: number[],
    offset: number,
    isEndEdge: boolean
  ): LoopPointType[] {
    const slideBounds = getSlideBounds(offset)

    return indexes.map((index) => {
      const initial = isEndEdge ? 0 : -contentSize
      const altered = isEndEdge ? contentSize : 0
      const boundEdge = isEndEdge ? 'end' : 'start'
      const loopPoint = slideBounds[index][boundEdge]

      return {
        index,
        loopPoint,
        slideLocation: Vector1D(-1),
        translate: slideTranslates[index],
        target: () => (location.get() > loopPoint ? initial : altered)
      }
    })
  }

  function startPoints(): LoopPointType[] {
    const gap = scrollSnaps[0]
    const indexes = getSlidesThatFitGap(descItems, gap)
    return getLoopPoints(indexes, contentSize, false)
  }

  function endPoints(): LoopPointType[] {
    const gap = viewSize - scrollSnaps[0] - 1
    const indexes = getSlidesThatFitGap(ascItems, gap)
    return getLoopPoints(indexes, -contentSize, true)
  }

  function canLoop(): boolean {
    return loopPoints.every(({ index }) => {
      const otherIndexes = ascItems.filter((i) => i !== index)
      return getRemainingGapAfterSlides(otherIndexes, viewSize) <= 0.1
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

  const self: SlideLooperType = {
    canLoop,
    loop,
    loopPoints
  }
  return self
}
