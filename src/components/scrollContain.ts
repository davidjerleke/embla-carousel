import { AlignSize } from './alignSize'
import { Limit } from './limit'
import { groupNumbers } from './utils'

type Params = {
  slideIndexes: number[]
  slidesToScroll: number
  contentSize: number
  viewSize: number
  alignSize: AlignSize
}

export type ScrollContain = {
  indexes: (scrollSnaps: number[]) => number[][]
  snaps: (scrollSnaps: number[]) => number[]
}

export function ScrollContain(params: Params): ScrollContain {
  const { alignSize, contentSize, viewSize } = params
  const { slideIndexes, slidesToScroll } = params
  const indexGroups = groupNumbers(slideIndexes, slidesToScroll)
  const contentFillsUpView = contentSize >= viewSize
  const bounds = Limit({ min: -contentSize + viewSize, max: 0 })

  function groupDuplicates(start: number, end: number): number[] {
    const duplicates = indexGroups.slice(start, end)
    return duplicates.reduce((a, g) => a.concat(g), [])
  }

  function findDuplicates(scrollSnaps: number[]): Limit {
    const firstSnap = scrollSnaps[0]
    const lastSnap = scrollSnaps[scrollSnaps.length - 1]
    const min = scrollSnaps.lastIndexOf(firstSnap) + 1
    const max = scrollSnaps.indexOf(lastSnap)
    return Limit({ min, max })
  }

  function containToView(scrollSnaps: number[]): number[] {
    const { min, max } = bounds
    return scrollSnaps.map((scrollSnap): number => {
      if (scrollSnap < min) return min
      if (scrollSnap > max) return max
      return scrollSnap
    })
  }

  function indexes(scrollSnaps: number[]): number[][] {
    if (!contentFillsUpView) return [slideIndexes]
    const { min, max } = findDuplicates(containToView(scrollSnaps))
    const start = groupDuplicates(0, min)
    const middle = indexGroups.slice(min, max)
    const end = groupDuplicates(max, scrollSnaps.length)
    return [start].concat(middle.concat([end]))
  }

  function snaps(scrollSnaps: number[]): number[] {
    if (!contentFillsUpView) return [alignSize.measure(contentSize)]
    const containedSnaps = containToView(scrollSnaps)
    const { min, max } = findDuplicates(containedSnaps)
    return containedSnaps.slice(min - 1, max + 1)
  }

  const self: ScrollContain = {
    indexes,
    snaps,
  }
  return Object.freeze(self)
}
