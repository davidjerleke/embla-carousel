import { AxisType } from './axis'
import { arrayKeys } from './utils'
import { SlidesInViewType } from './slidesInView'
import { Vector1DType } from './vector1d'

type EdgeType = 'start' | 'end'

type LoopPointType = {
  point: number
  location: number
  index: number
  getTarget: () => number
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
    const slideBounds = slidesInView.findSlideBounds(offset)

    return indexes.map((index) => {
      const initial = isStartEdge ? 0 : -contentSize
      const altered = isStartEdge ? contentSize : 0
      const bounds = slideBounds.filter((b) => b.index === index)[0]
      const point = bounds[isStartEdge ? 'end' : 'start']
      const getTarget = (): number =>
        scrollLocation.get() > point ? initial : altered
      return { point, getTarget, index, location: -1 }
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
      const { getTarget, location, index } = loopPoint
      const target = getTarget()
      if (target !== location) {
        slides[index].style[axis.startEdge] = `${target}%`
        loopPoint.location = target
      }
    })
  }

  function clear(): void {
    loopPoints.forEach(({ index }) => {
      slides[index].style[axis.startEdge] = ''
    })
  }

  const self: SlideLooperType = {
    canLoop,
    clear,
    loop,
    loopPoints,
  }
  return self
}
