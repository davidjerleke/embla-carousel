import { Vector1D } from './vector1d'

type Params = {
  snapPositions: number[]
  viewSize: number
  location: Vector1D
  slideSizes: number[]
  contentSize: number
}

type ShiftPoint = {
  point: number
  location: Vector1D
  index: number
  findTarget: (location: number) => Vector1D
}

export type InfiniteShifter = {
  shiftInfinite: (slides: HTMLElement[]) => void
  shiftPoints: ShiftPoint[]
}

export function InfiniteShifter(params: Params) {
  const { contentSize, viewSize, slideSizes, snapPositions } = params
  const ascItems = Object.keys(slideSizes).map(Number)
  const descItems = ascItems.slice().reverse()
  const shiftPoints = startPoints().concat(endPoints())

  function subtractItemSizesOf(
    indexes: number[],
    from: number,
  ): number {
    return indexes.reduce((a: number, i) => {
      const size = slideSizes[i]
      return a - size
    }, from)
  }

  function shiftItemsIn(
    sizeOfGap: number,
    indexes: number[],
  ): number[] {
    return indexes.reduce((a: number[], i) => {
      const gapLeft = subtractItemSizesOf(a, sizeOfGap)
      return gapLeft > 0 ? a.concat([i]) : a
    }, [])
  }

  function shiftStart(
    sizeOfGap: number,
    indexes: number[],
    from: number,
  ): number {
    return indexes.reduce((a: number, i) => {
      const gapFilled = a + slideSizes[i]
      return gapFilled < sizeOfGap ? gapFilled : a
    }, from)
  }

  function shiftPoint(
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

  function shiftPointsFor(
    indexes: number[],
    from: number,
    direction: 0 | 1,
  ): ShiftPoint[] {
    const ascIndexes = indexes.slice().sort((a, b) => a - b)
    return ascIndexes.map(
      (i, j): ShiftPoint => {
        const index = i
        const initial = contentSize * (!direction ? 0 : -1)
        const offset = contentSize * (!direction ? 1 : 0)
        const slidesInSpan = ascIndexes.slice(0, j)
        const point = shiftPoint(slidesInSpan, from, direction)
        const location = Vector1D(-1)
        const findTarget = (loc: number): Vector1D => {
          const target = Vector1D(0)
          const t = loc > point ? initial : offset
          return target.setNumber(t)
        }
        return { point, findTarget, location, index }
      },
    )
  }

  function startPoints(): ShiftPoint[] {
    const gap = snapPositions[0] - 1
    const indexes = shiftItemsIn(gap, descItems)
    const start = shiftStart(gap, indexes, 0)
    return shiftPointsFor(indexes, start, 1)
  }

  function endPoints(): ShiftPoint[] {
    const gap = viewSize - snapPositions[0] - 1
    const indexes = shiftItemsIn(gap, ascItems)
    const start = shiftStart(contentSize, ascItems, -viewSize)
    return shiftPointsFor(indexes, -start, 0)
  }

  function shiftInfinite(slides: HTMLElement[]): void {
    const parentLocation = params.location
    shiftPoints.forEach(point => {
      const { findTarget, location, index } = point
      const target = findTarget(parentLocation.get())
      if (target.get() !== location.get()) {
        slides[index].style.left = `${target.get()}%`
        location.set(target)
      }
    })
  }

  const self: InfiniteShifter = {
    shiftInfinite,
    shiftPoints,
  }
  return Object.freeze(self)
}
