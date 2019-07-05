import { AlignSize } from './alignSize'
import { Counter } from './counter'
import { Limit } from './limit'

type Params = {
  index: Counter
  alignSize: AlignSize
  snapSizes: number[]
  contentSize: number
  viewSize: number
  contain: boolean
}

export type SnapPosition = {
  measure: (snapSize: number, index: number) => number
}

export function SnapPosition(params: Params): SnapPosition {
  const { alignSize, contentSize, snapSizes, viewSize } = params
  const alignSizes = snapSizes.map(alignSize.measure)
  const contentFillsUpView = contentSize >= viewSize
  const betweenDistances = distancesBetweenSnaps()
  const bounds = scrollBounds()

  function distancesBetweenSnaps(): number[] {
    return snapSizes.map((size, i) => {
      const next = params.index.clone().set(i + 1)
      return size + alignSizes[i] - alignSizes[next.get()]
    })
  }

  function snapPosition(index: number): number {
    const sizes = betweenDistances.slice(0, index)
    return sizes.reduce((a, d) => a - d, alignSizes[0])
  }

  function scrollBounds(): Limit {
    const indexMax = params.index.max
    const endGap = viewSize - snapSizes[indexMax]
    const gapMinusAlign = endGap - alignSizes[indexMax]
    const min = snapPosition(indexMax) + gapMinusAlign
    return Limit({ min, max: 0 })
  }

  function containScroll(position: number): number {
    if (contentFillsUpView) {
      const { min, max } = bounds
      if (position < min) return min
      if (position > max) return max
      return position
    }
    return alignSize.measure(contentSize)
  }

  function measure(size: number, index: number): number {
    const position = snapPosition(index)
    return params.contain ? containScroll(position) : position
  }

  const self: SnapPosition = {
    measure,
  }
  return Object.freeze(self)
}
