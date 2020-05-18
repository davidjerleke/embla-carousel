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
  location: Vector1D
  index: number
  findTarget: (location: number) => Vector1D
}

export type SlideLooper = {
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

  function subtractItemSizesOf(
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
      const gapLeft = subtractItemSizesOf(a, sizeOfGap)
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

  function loopPoint(
    indexes: number[],
    from: number,
    direction: 0 | 1,
  ): number {
    const slideCount = ascItems.length - 1
    return subtractItemSizesOf(
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
      (i, j): LoopPoint => {
        const index = i
        const initial = contentSize * (!direction ? 0 : -1)
        const offset = contentSize * (!direction ? 1 : 0)
        const slidesInSpan = ascIndexes.slice(0, j)
        const point = loopPoint(slidesInSpan, from, direction)
        const location = Vector1D(-1)
        const target = Vector1D(0)
        const findTarget = (loc: number): Vector1D => {
          const t = loc > point ? initial : offset
          return target.set(0).set(t)
        }
        return { point, findTarget, location, index }
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

  function loop(slides: HTMLElement[]): void {
    loopPoints.forEach(loopTarget => {
      const { findTarget, location, index } = loopTarget
      const target = findTarget(containerLocation.get()).get()
      if (target !== location.get()) {
        slides[index].style[loopStyle] = `${target}%`
        location.set(target)
      }
    })
  }

  function clear(slides: HTMLElement[]): void {
    loopPoints.forEach(({ index }) => {
      slides[index].style[loopStyle] = ''
    })
  }

  const self: SlideLooper = {
    clear,
    loop,
    loopPoints,
  }
  return Object.freeze(self)
}
