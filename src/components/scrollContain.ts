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
  const contentExceedsView = contentSize > viewSize
  const bounds = Limit({ min: -contentSize + viewSize, max: 0 })

  function groupDuplicates(start: number, end: number): number[] {
    const duplicates = indexGroups.slice(start, end)
    return duplicates.reduce((a, g) => a.concat(g), [])
  }

  function findDuplicates(scrollSnaps: number[]): Limit {
    const startSnap = scrollSnaps[0]
    const endSnap = scrollSnaps[scrollSnaps.length - 1]
    const min = scrollSnaps.lastIndexOf(startSnap) + 1
    const max = scrollSnaps.indexOf(endSnap)
    return Limit({ min, max })
  }

  function indexes(scrollSnaps: number[]): number[][] {
    if (!contentExceedsView) return [slideIndexes]
    const containedSnaps = scrollSnaps.map(bounds.constrain)
    const { min, max } = findDuplicates(containedSnaps)
    const start = groupDuplicates(0, min)
    const middle = indexGroups.slice(min, max)
    const end = groupDuplicates(max, scrollSnaps.length)
    return [start].concat(middle.concat([end]))
  }

  function snaps(scrollSnaps: number[]): number[] {
    if (!contentExceedsView) return [alignSize.measure(contentSize)]
    const containedSnaps = scrollSnaps.map(bounds.constrain)
    const { min, max } = findDuplicates(containedSnaps)
    return containedSnaps.slice(min - 1, max + 1)
  }

  const self: ScrollContain = {
    indexes,
    snaps,
  }
  return Object.freeze(self)
}
