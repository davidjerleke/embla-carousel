import { Limit, LimitType } from './Limit'
import { arrayIsLastIndex, arrayLast, deltaAbs } from './utils'

export type ScrollContainOptionType = false | 'trimSnaps' | 'keepSnaps'

export type ScrollContainType = {
  snapsContained: number[]
  scrollContainLimit: LimitType
}

export function ScrollContain(
  viewSize: number,
  contentSize: number,
  snapsAligned: number[],
  containScroll: ScrollContainOptionType,
  pixelTolerance: number
): ScrollContainType {
  const scrollBounds = Limit(-contentSize + viewSize, 0)
  const snapsBounded = measureBounded()
  const scrollContainLimit = findScrollContainLimit()
  const snapsContained = measureContained()

  function usePixelTolerance(bound: number, snap: number): boolean {
    return deltaAbs(bound, snap) < 1
  }

  function findScrollContainLimit(): LimitType {
    const startSnap = snapsBounded[0]
    const endSnap = arrayLast(snapsBounded)
    const min = snapsBounded.lastIndexOf(startSnap)
    const max = snapsBounded.indexOf(endSnap) + 1
    return Limit(min, max)
  }

  function measureBounded(): number[] {
    return snapsAligned
      .map((snapAligned, index) => {
        const { min, max } = scrollBounds
        const snap = scrollBounds.constrain(snapAligned)
        const isFirst = !index
        const isLast = arrayIsLastIndex(snapsAligned, index)
        if (isFirst) return max
        if (isLast) return min
        if (usePixelTolerance(min, snap)) return min
        if (usePixelTolerance(max, snap)) return max
        return snap
      })
      .map((scrollBound) => parseFloat(scrollBound.toFixed(3)))
  }

  function measureContained(): number[] {
    if (contentSize <= viewSize + pixelTolerance) return [scrollBounds.max]
    if (containScroll === 'keepSnaps') return snapsBounded
    const { min, max } = scrollContainLimit
    return snapsBounded.slice(min, max)
  }

  const self: ScrollContainType = {
    snapsContained,
    scrollContainLimit
  }
  return self
}
