import { Limit } from './limit'
import { arrayLast } from './utils'

export type ScrollContainOption = '' | 'trimSnaps' | 'keepSnaps'

type Params = {
  contentSize: number
  viewSize: number
  containScroll: ScrollContainOption
  snaps: number[]
  snapsAligned: number[]
}

export type ScrollContain = {
  snapsContained: number[]
}

export function ScrollContain(params: Params): ScrollContain {
  const { contentSize, viewSize, snaps, snapsAligned, containScroll } = params
  const scrollBounds = Limit({ min: -contentSize + viewSize, max: snaps[0] })
  const snapsBounded = snapsAligned.map(scrollBounds.constrain)
  const snapsContained = measureContained()

  function findDuplicates(): Limit {
    const startSnap = snapsBounded[0]
    const endSnap = arrayLast(snapsBounded)
    const min = snapsBounded.lastIndexOf(startSnap)
    const max = snapsBounded.indexOf(endSnap) + 1
    return Limit({ min, max })
  }

  function measureContained(): number[] {
    if (contentSize <= viewSize) return [scrollBounds.max]
    if (containScroll === 'keepSnaps') return snapsBounded
    const { min, max } = findDuplicates()
    return snapsBounded.slice(min, max)
  }

  const self: ScrollContain = {
    snapsContained,
  }
  return self
}
