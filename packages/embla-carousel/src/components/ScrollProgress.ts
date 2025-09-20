import { LimitType } from './Limit'
import { VectorOrNumberType, mapVectorToNumber } from './utils'

export type ScrollProgressType = {
  get: (input: VectorOrNumberType) => number
}

export function ScrollProgress(limit: LimitType): ScrollProgressType {
  const { max, length } = limit

  function get(input: number): number {
    const currentLocation = input - max
    return length ? currentLocation / -length : 0
  }

  const self: ScrollProgressType = {
    get: mapVectorToNumber(get)
  }
  return self
}
