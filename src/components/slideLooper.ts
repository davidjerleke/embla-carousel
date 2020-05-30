import { Axis } from './axis'
import { arrayKeys } from './utils'
import { Vector1D } from './vector1d'

type Params = {
  axis: Axis
  scrollSnaps: number[]
  viewSize: number
  location: Vector1D
  slideSizes: number[]
  contentSize: number
}

type LoopPoint = {
  point: number
  location: number
  index: number
  getTarget: (location: number) => number
}

export type SlideLooper = {
  canLoop: () => boolean
  clear: (slides: HTMLElement[]) => void
  loop: (slides: HTMLElement[]) => void
  loopPoints: LoopPoint[]
}

export function SlideLooper(params: Params): SlideLooper {
  const { axis, location: containerLocation } = params
  const { contentSize, viewSize, slideSizes, scrollSnaps } = params
  const ascItems = arrayKeys(slideSizes)
  const descItems = arrayKeys(slideSizes).reverse()
  const loopPoints = startPoints().concat(endPoints())
  const loopStyle = axis.scroll === 'x' ? 'left' : 'top'

  function subtractItemSizes(
    indexes: number[],
    from: number,
  ): number {
    return indexes.reduce((a: number, i) => {
      const size = slideSizes[i]
      return a - size
    }, from)
  }

  function loopItemsIn(
    sizeOfGap: number,
    indexes: number[],
  ): number[] {
    return indexes.reduce((a: number[], i) => {
      const gapLeft = subtractItemSizes(a, sizeOfGap)
      return gapLeft > 0 ? a.concat([i]) : a
    }, [])
  }

  function loopStart(
    sizeOfGap: number,
    indexes: number[],
    from: number,
  ): number {
    return indexes.reduce((a: number, i) => {
      const gapFilled = a + slideSizes[i]
      return gapFilled < sizeOfGap ? gapFilled : a
    }, from)
  }

  function loopPointFor(
    indexes: number[],
    from: number,
    direction: 0 | 1,
  ): number {
    const slideCount = ascItems.length - 1
    return subtractItemSizes(
      indexes.map(i => (i + direction) % slideCount),
      from,
    )
  }

  function loopPointsFor(
    indexes: number[],
    from: number,
    direction: 0 | 1,
  ): LoopPoint[] {
    const ascIndexes = indexes.slice().sort((a, b) => a - b)
    return ascIndexes.map(
      (index, loopIndex): LoopPoint => {
        const initial = contentSize * (!direction ? 0 : -1)
        const offset = contentSize * (!direction ? 1 : 0)
        const slidesInSpan = ascIndexes.slice(0, loopIndex)
        const point = loopPointFor(slidesInSpan, from, direction)
        const getTarget = (location: number): number =>
          location > point ? initial : offset
        return { point, getTarget, index, location: -1 }
      },
    )
  }

  function startPoints(): LoopPoint[] {
    const gap = scrollSnaps[0] - 1
    const indexes = loopItemsIn(gap, descItems)
    const start = loopStart(gap, indexes, 0)
    return loopPointsFor(indexes, start, 1)
  }

  function endPoints(): LoopPoint[] {
    const gap = viewSize - scrollSnaps[0] - 1
    const indexes = loopItemsIn(gap, ascItems)
    const start = loopStart(contentSize, ascItems, -viewSize)
    return loopPointsFor(indexes, -start, 0)
  }

  function canLoop(): boolean {
    return loopPoints.every(({ index }) => {
      const otherIndexes = ascItems.filter(i => i !== index)
      return subtractItemSizes(otherIndexes, viewSize) <= 0
    })
  }

  function loop(slides: HTMLElement[]): void {
    loopPoints.forEach(loopPoint => {
      const { getTarget, location, index } = loopPoint
      const target = getTarget(containerLocation.get())
      if (target !== location) {
        slides[index].style[loopStyle] = `${target}%`
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
  return Object.freeze(self)
}
