import { Axis } from './axis'
import { arrayKeys } from './utils'
import { Direction } from './direction'
import { SlidesInView } from './slidesInView'
import { Vector1D } from './vector1d'

type Params = {
  axis: Axis
  direction: Direction
  scrollSnaps: number[]
  viewSize: number
  location: Vector1D
  slideSizes: number[]
  contentSize: number
  slidesInView: SlidesInView
}

type LoopPoint = {
  point: number
  location: number
  index: number
  getTarget: () => number
}

type LoopEdge = 'start' | 'end'

export type SlideLooper = {
  canLoop: () => boolean
  clear: (slides: HTMLElement[]) => void
  loop: (slides: HTMLElement[]) => void
  loopPoints: LoopPoint[]
}

export function SlideLooper(params: Params): SlideLooper {
  const { axis, location: scrollLocation, slidesInView, direction } = params
  const { contentSize, viewSize, slideSizes, scrollSnaps } = params
  const ascItems = arrayKeys(slideSizes)
  const descItems = arrayKeys(slideSizes).reverse()
  const loopPoints = startPoints().concat(endPoints())
  const loopStyle = axis.scroll === 'x' ? 'left' : 'top'

  function removeSlideSizes(indexes: number[], from: number): number {
    return indexes.reduce((a: number, i) => {
      return a - slideSizes[i]
    }, from)
  }

  function slidesInGap(indexes: number[], gap: number): number[] {
    return indexes.reduce((a: number[], i) => {
      const remainingGap = removeSlideSizes(a, gap)
      return remainingGap > 0 ? a.concat([i]) : a
    }, [])
  }

  function findLoopPoints(indexes: number[], edge: LoopEdge): LoopPoint[] {
    const isStartEdge = edge === 'start'
    const offset = isStartEdge ? -contentSize : contentSize
    const slideBounds = slidesInView.findSlideBounds(offset)

    return indexes.map(index => {
      const initial = isStartEdge ? 0 : -contentSize
      const altered = isStartEdge ? contentSize : 0
      const bounds = slideBounds.filter(b => b.index === index)[0]
      const point = bounds[isStartEdge ? 'end' : 'start']
      const getTarget = (): number =>
        scrollLocation.get() > point ? initial : altered
      return { point, getTarget, index, location: -1 }
    })
  }

  function startPoints(): LoopPoint[] {
    const gap = scrollSnaps[0] - 1
    const indexes = slidesInGap(descItems, gap)
    return findLoopPoints(indexes, 'end')
  }

  function endPoints(): LoopPoint[] {
    const gap = viewSize - scrollSnaps[0] - 1
    const indexes = slidesInGap(ascItems, gap)
    return findLoopPoints(indexes, 'start')
  }

  function canLoop(): boolean {
    return loopPoints.every(({ index }) => {
      const otherIndexes = ascItems.filter(i => i !== index)
      return removeSlideSizes(otherIndexes, viewSize) <= 0
    })
  }

  function loop(slides: HTMLElement[]): void {
    loopPoints.forEach(loopPoint => {
      const { getTarget, location, index } = loopPoint
      const target = getTarget()
      if (target !== location) {
        slides[index].style[loopStyle] = `${direction.applyTo(target)}%`
        loopPoint.location = target
      }
    })
  }

  function clear(slides: HTMLElement[]): void {
    loopPoints.forEach(({ index }) => {
      slides[index].style[loopStyle] = ''
    })
  }

  const self: SlideLooper = {
    canLoop,
    clear,
    loop,
    loopPoints,
  }
  return self
}
