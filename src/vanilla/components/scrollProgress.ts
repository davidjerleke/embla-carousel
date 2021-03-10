import { LimitType } from './limit'

export type ScrollProgressType = {
  get: (n: number) => number
}

export function ScrollProgress(limit: LimitType): ScrollProgressType {
  const { max, length: scrollLength } = limit

  function get(n: number): number {
    const currentLocation = n - max
    return currentLocation / -scrollLength
  }

  const self: ScrollProgressType = {
    get,
  }
  return self
}
