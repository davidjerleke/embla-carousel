import { Limit } from './limit'

type Params = {
  limit: Limit
}

export type ScrollProgress = {
  get: (n: number) => number
}

export function ScrollProgress(params: Params): ScrollProgress {
  const { min, max } = params.limit
  const scrollLength = min - max

  function get(n: number): number {
    const currentLocation = n - max
    return currentLocation / scrollLength
  }

  const self: ScrollProgress = {
    get,
  }
  return Object.freeze(self)
}
