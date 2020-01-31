import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  loop: boolean
  limit: Limit
  location: Vector1D
}

export type ScrollBy = {
  distance: (n: number) => number
}

export function ScrollBy(params: Params): ScrollBy {
  const { loop, limit, location } = params
  const { min, max, reachedMin, reachedMax } = limit
  const scrollLength = min - max

  function withinBounds(n: number): number {
    const target = location.get() + n
    if (reachedMax(target)) return max - location.get()
    if (reachedMin(target)) return min - location.get()
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
