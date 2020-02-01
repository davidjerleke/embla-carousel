import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  loop: boolean
  limit: Limit
  target: Vector1D
}

export type ScrollBy = {
  distance: (n: number) => number
}

export function ScrollBy(params: Params): ScrollBy {
  const { loop, limit, target } = params
  const { min, max, reachedMin, reachedMax } = limit
  const scrollLength = min - max

  function withinBounds(n: number): number {
    const desired = target.get() + n
    if (reachedMax(desired)) return max - target.get()
    if (reachedMin(desired)) return min - target.get()
    return n
  }

  function distance(n: number): number {
    const progress = scrollLength * n
    return loop ? progress : withinBounds(progress)
  }

  const self: ScrollBy = {
    distance,
  }
  return Object.freeze(self)
}
