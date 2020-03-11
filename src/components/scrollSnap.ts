import { Alignment } from './alignment'
import { Counter } from './counter'
import { Limit } from './limit'

type Params = {
  snapSizes: number[]
  alignment: Alignment
  loop: boolean
}

export type ScrollSnap = {
  measure: (index: number) => number
}

export function ScrollSnap(params: Params): ScrollSnap {
  const { snapSizes, alignment, loop } = params
  const alignments = snapSizes.map(alignment.measure)
  const distancesBetween = distancesBetweenScrollSnaps()

  function distancesBetweenScrollSnaps(): number[] {
    const limit = Limit({ min: 0, max: snapSizes.length - 1 })
    const counter = Counter({ limit, start: 0, loop })

    return snapSizes.map((size, index) => {
      const next = counter.set(index + 1).get()
      return size + alignments[index] - alignments[next]
    })
  }

  function measure(index: number): number {
    const sizes = distancesBetween.slice(0, index)
    return sizes.reduce((a, s) => a - s, alignments[0])
  }

  const self: ScrollSnap = {
    measure,
  }
  return Object.freeze(self)
}
