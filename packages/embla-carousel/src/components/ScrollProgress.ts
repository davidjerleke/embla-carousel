import { LimitType } from './Limit.js'

export type ScrollProgressType = {
  get: (n: number) => number
}

export function ScrollProgress(limit: LimitType): ScrollProgressType {
  const { max, length } = limit

  function get(n: number): number {
    const currentLocation = n - max
    return length ? currentLocation / -length : 0
  }

  const self: ScrollProgressType = {
    get
  }
  return self
}
