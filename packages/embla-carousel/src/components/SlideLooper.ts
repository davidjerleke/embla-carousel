import { AxisType } from './Axis'
import { arrayKeys } from './utils'
import { SlidesInViewType } from './SlidesInView'
import { Vector1D, Vector1DType } from './Vector1d'
import { Translate, TranslateType } from './Translate'
import { DirectionType } from './Direction'

type EdgeType = 'start' | 'end'

type LoopPointType = {
  index: number
  translate: TranslateType
  location: Vector1DType
  target: () => Vector1DType
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
  scroll: Vector1DType,
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
      const shift = Vector1D(-1)
      const location = Vector1D(-1)
      const translate = Translate(axis, direction, slides[index])
      const target = () => shift.set(scroll.get() > point ? initial : altered)
      return { index, location, translate, target }
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
      const { target, translate, location } = loopPoint
      const shift = target()
      if (shift.get() === location.get()) return
      if (shift.get() === 0) translate.clear()
      else translate.to(shift)
      location.set(shift)
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
