import { Alignment } from './alignment'
import { Counter } from './counter'
import { Limit } from './limit'

type Params = {
  snapSizes: number[]
  alignment: Alignment
  loop: boolean
}

export type ScrollSnap = {
  measure: (snapSize: number, index: number) => number
}

export function ScrollSnap(params: Params): ScrollSnap {
  const { snapSizes, alignment, loop } = params
  const alignments = snapSizes.map(alignment.measure)
  const distancesBetween = distancesBetweenScrollSnaps()

  function distancesBetweenScrollSnaps(): number[] {
    const limit = Limit({ min: 0, max: snapSizes.length - 1 })
    const counter = Counter({ limit, start: 0, loop })

    return snapSizes.map((size, index) => {
      const next = counter.clone().set(index + 1)
      return size + alignments[index] - alignments[next.get()]
    })
  }

  function measure(size: number, index: number): number {
    const sizes = distancesBetween.slice(0, index)
    return sizes.reduce((a, d) => a - d, alignments[0])
  }

  const self: ScrollSnap = {
    measure,
  }
  return Object.freeze(self)
}
