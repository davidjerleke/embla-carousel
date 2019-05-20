import { ChunkSize } from './chunkSize'
import { Vector1D } from './vector1d'

type Params = {
  alignSizes: number[]
  chunkSize: ChunkSize
  contentSize: number
  slides: HTMLElement[]
  slideSizes: number[]
}

type ShiftPoint = {
  location: Vector1D
  node: HTMLElement
  findTarget: (location: number) => Vector1D
}

export type InfiniteShifter = {
  shiftAccordingTo: (parentLocation: Vector1D) => void
}

export function InfiniteShifter(params: Params) {
  const { slides, chunkSize, slideSizes, alignSizes } = params
  const viewSize = chunkSize.root
  const distance = params.contentSize
  const ascItems = Object.keys(slides).map(Number)
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
    const slideCount = slides.length - 1
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
        const node = slides[i]
        const initial = distance * (!direction ? 0 : -1)
        const offset = distance * (!direction ? 1 : 0)
        const slidesInSpan = ascIndexes.slice(0, j)
        const point = shiftPoint(slidesInSpan, from, direction)
        const location = Vector1D(-1)
        const findTarget = (loc: number): Vector1D => {
          const target = Vector1D(0)
          const t = loc > point ? initial : offset
          return target.setNumber(t)
        }
        return { findTarget, location, node }
      },
    )
  }

  function startPoints(): ShiftPoint[] {
    const gap = alignSizes[0] - 1
    const indexes = shiftItemsIn(gap, descItems)
    const start = shiftStart(gap, indexes, 0)
    return shiftPointsFor(indexes, start, 1)
  }

  function endPoints(): ShiftPoint[] {
    const gap = viewSize - alignSizes[0] - 1
    const indexes = shiftItemsIn(gap, ascItems)
    const start = shiftStart(distance, ascItems, -viewSize)
    return shiftPointsFor(indexes, -start, 0)
  }

  function shiftAccordingTo(parentLocation: Vector1D): void {
    shiftPoints.forEach(point => {
      const { findTarget, location, node } = point
      const target = findTarget(parentLocation.get())
      if (target.get() !== location.get()) {
        node.style.left = `${target.get()}%`
      }
    })
  }

  const self: InfiniteShifter = {
    shiftAccordingTo,
  }
  return Object.freeze(self)
}
