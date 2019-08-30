import { AlignSize } from './alignSize'
import { Counter } from './counter'
import { Limit } from './limit'

type Params = {
  snapSizes: number[]
  alignSize: AlignSize
  loop: boolean
}

export type ScrollSnap = {
  measure: (snapSize: number, index: number) => number
}

export function ScrollSnap(params: Params): ScrollSnap {
  const { snapSizes, alignSize, loop } = params
  const counterLimit = Limit({ min: 0, max: snapSizes.length - 1 })
  const counter = Counter({ limit: counterLimit, start: 0, loop })
  const alignSizes = snapSizes.map(alignSize.measure)
  const betweenDistances = distancesBetweenSnaps()

  function distancesBetweenSnaps(): number[] {
    return snapSizes.map((size, i) => {
      const next = counter.clone().set(i + 1)
      return size + alignSizes[i] - alignSizes[next.get()]
    })
  }

  function measure(size: number, index: number): number {
    const sizes = betweenDistances.slice(0, index)
    return sizes.reduce((a, d) => a - d, alignSizes[0])
  }

  const self: ScrollSnap = {
    measure,
  }
  return Object.freeze(self)
}
