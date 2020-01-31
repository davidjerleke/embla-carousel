import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  location: Vector1D
  limit: Limit
}

export type ScrollProgress = {
  get: () => number
}

export function ScrollProgress(params: Params): ScrollProgress {
  const { location, limit } = params
  const { min, max } = limit
  const scrollLength = min - max

  function get(): number {
    const currentLocation = location.get() - max
    return currentLocation / scrollLength
  }

  const self: ScrollProgress = {
    get,
  }
  return Object.freeze(self)
}
