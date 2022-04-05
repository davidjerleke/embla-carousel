import { AxisType } from './Axis'
import { arrayKeys } from './utils'
import { SlidesInViewType } from './SlidesInView'
import { Vector1D, Vector1DType } from './Vector1d'
import { Translate, TranslateType } from './Translate'
import { DirectionType } from './Direction'

type EdgeType = 'start' | 'end'

type LoopPointType = {
  point: number
  index: number
  translate: TranslateType
  location: Vector1DType
  getTarget: () => Vector1DType
}

export type SlideLooperType = {
  canLoop: () => boolean
  clear: () => void
  loop: () => void
  loopPoints: LoopPointType[]
}

export function SlideLooper(
  axis: AxisType,
  direction: DirectionType,
  viewSize: number,
  contentSize: number,
  slideSizesWithGaps: number[],
  scrollSnaps: number[],
  slidesInView: SlidesInViewType,
  scrollLocation: Vector1DType,
  slides: HTMLElement[],
): SlideLooperType {
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

  function findLoopPoints(indexes: number[], edge: EdgeType): LoopPointType[] {
    const isStartEdge = edge === 'start'
    const offset = isStartEdge ? -contentSize : contentSize
    const slideBounds = slidesInView.findSlideBounds([offset])

    return indexes.map((index) => {
      const initial = isStartEdge ? 0 : -contentSize
      const altered = isStartEdge ? contentSize : 0
      const bounds = slideBounds.filter((b) => b.index === index)[0]
      const point = bounds[isStartEdge ? 'end' : 'start']
      const target = Vector1D(-1)
      const getTarget = (): Vector1DType =>
        target.set(scrollLocation.get() > point ? initial : altered)
      return {
        point, // remove
        index,
        location: Vector1D(-1),
        translate: Translate(axis, direction, slides[index]),
        getTarget,
      }
    })
  }

  function startPoints(): LoopPointType[] {
    const gap = scrollSnaps[0] - 1
    const indexes = slidesInGap(descItems, gap)
    return findLoopPoints(indexes, 'end')
  }

  function endPoints(): LoopPointType[] {
    const gap = viewSize - scrollSnaps[0] - 1
    const indexes = slidesInGap(ascItems, gap)
    return findLoopPoints(indexes, 'start')
  }

  function canLoop(): boolean {
    return loopPoints.every(({ index }) => {
      const otherIndexes = ascItems.filter((i) => i !== index)
      return removeSlideSizes(otherIndexes, viewSize) <= 0
    })
  }

  function loop(): void {
    loopPoints.forEach((loopPoint) => {
      const { getTarget, translate, location } = loopPoint
      const target = getTarget()
      if (target.get() === location.get()) return
      if (target.get() === 0) translate.clear()
      else translate.to(target)
      location.set(target)
    })
  }

  function clear(): void {
    loopPoints.forEach((loopPoint) => loopPoint.translate.clear())
  }

  const self: SlideLooperType = {
    canLoop,
    clear,
    loop,
    loopPoints,
  }
  return self
}
