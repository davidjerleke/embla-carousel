import { Limit } from './limit'

export type ScrollProgress = {
  get: (n: number) => number
}

export function ScrollProgress(limit: Limit): ScrollProgress {
  const { max, length: scrollLength } = limit

  function get(n: number): number {
    const currentLocation = n - max
    return currentLocation / -scrollLength
  }

  const self: ScrollProgress = {
    get,
  }
  return self
}
