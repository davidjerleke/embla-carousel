import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  limit: Limit
  loop: boolean
  target: Vector1D
}

export type ScrollProgress = {
  get: (n: number) => number
  set: (n: number) => number
  add: (n: number) => number
}

export function ScrollProgress(params: Params): ScrollProgress {
  const { limit, loop, target } = params
  const { min, max, reachedMin, reachedMax } = limit
  const scrollLength = min - max

  function withinBounds(n: number): number {
    const desiredTarget = target.get() + n
    if (reachedMax(desiredTarget)) return max - target.get()
    if (reachedMin(desiredTarget)) return min - target.get()
    return n
  }

  function get(n: number): number {
    const currentLocation = n - max
    return currentLocation / scrollLength
  }

  function set(n: number): number {
    const progressToTarget = n - get(target.get())
    return withinBounds(add(progressToTarget))
  }

  function add(n: number): number {
    const distance = scrollLength * n
    return loop ? distance : withinBounds(distance)
  }

  const self: ScrollProgress = {
    get,
    set,
    add,
  }
  return Object.freeze(self)
}
