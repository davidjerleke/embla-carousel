import { Limit, LimitType } from './Limit'
import { arrayLast } from './utils'

export type ScrollContainOptionType = '' | 'trimSnaps' | 'keepSnaps'

export type ScrollContainType = {
  snapsContained: number[]
}

export function ScrollContain(
  viewSize: number,
  contentSize: number,
  snapsAligned: number[],
  containScroll: ScrollContainOptionType,
): ScrollContainType {
  const scrollBounds = Limit(-contentSize + viewSize, snapsAligned[0])
  const snapsBounded = snapsAligned.map(scrollBounds.constrain)
  const snapsContained = measureContained()

  function findDuplicates(): LimitType {
    const startSnap = snapsBounded[0]
    const endSnap = arrayLast(snapsBounded)
    const min = snapsBounded.lastIndexOf(startSnap)
    const max = snapsBounded.indexOf(endSnap) + 1
    return Limit(min, max)
  }

  function measureContained(): number[] {
    if (contentSize <= viewSize) return [scrollBounds.max]
    if (containScroll === 'keepSnaps') return snapsBounded
    const { min, max } = findDuplicates()
    return snapsBounded.slice(min, max)
  }

  const self: ScrollContainType = {
    snapsContained,
  }
  return self
}
