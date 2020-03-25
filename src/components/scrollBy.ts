import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  loop: boolean
  limit: Limit
  target: Vector1D
}

export type ScrollBy = {
  progress: (n: number) => number
}

export function ScrollBy(params: Params): ScrollBy {
  const { loop, limit, target } = params
  const { min, max, reachedMin, reachedMax } = limit
  const scrollLength = min - max

  function withinBounds(distance: number): number {
    const desiredTarget = target.get() + distance
    if (reachedMax(desiredTarget)) return max - target.get()
    if (reachedMin(desiredTarget)) return min - target.get()
    return distance
  }

  function progress(n: number): number {
    const distance = scrollLength * n
    return loop ? distance : withinBounds(distance)
  }

  const self: ScrollBy = {
    progress,
  }
  return Object.freeze(self)
}
