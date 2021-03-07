import { Alignment } from './alignment'

type Params = {
  snapSizes: number[]
  alignment: Alignment
  groupedSnaps: number[][]
}

export type ScrollSnap = {
  measure: (index: number) => number
}

export function ScrollSnap(params: Params): ScrollSnap {
  const { snapSizes, alignment, groupedSnaps } = params
  const snaps = groupedSnaps.map(group => group[0])
  const alignments = snapSizes.map(alignment.measure)

  function measure(index: number): number {
    return snaps[index] + alignments[index]
  }

  const self: ScrollSnap = {
    measure,
  }
  return self
}
