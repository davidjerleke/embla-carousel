import { Limit } from './limit'

type Params = {
  limit: Limit
}

export type ScrollProgress = {
  get: (n: number) => number
}

export function ScrollProgress(params: Params): ScrollProgress {
  const { max, length: scrollLength } = params.limit

  function get(n: number): number {
    const currentLocation = n - max
    return currentLocation / -scrollLength
  }

  const self: ScrollProgress = {
    get,
  }
  return Object.freeze(self)
}
