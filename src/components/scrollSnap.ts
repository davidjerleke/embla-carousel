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
  const alignSizes = snapSizes.map(alignSize.measure)
  const distancesBetween = distancesBetweenScrollSnaps()

  function distancesBetweenScrollSnaps(): number[] {
    const limit = Limit({ min: 0, max: snapSizes.length - 1 })
    const counter = Counter({ limit, start: 0, loop })

    return snapSizes.map((size, index) => {
      const next = counter.clone().set(index + 1)
      return size + alignSizes[index] - alignSizes[next.get()]
    })
  }

  function measure(size: number, index: number): number {
    const sizes = distancesBetween.slice(0, index)
    return sizes.reduce((a, d) => a - d, alignSizes[0])
  }

  const self: ScrollSnap = {
    measure,
  }
  return Object.freeze(self)
}
