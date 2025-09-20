import { LimitType } from './Limit'
import { NumberStoreInputType, mapStoreToNumber } from './utils'

export type ScrollProgressType = {
  get: (input: NumberStoreInputType) => number
}

export function ScrollProgress(limit: LimitType): ScrollProgressType {
  const { max, length } = limit

  function get(input: number): number {
    const currentLocation = input - max
    return length ? currentLocation / -length : 0
  }

  const self: ScrollProgressType = {
    get: mapStoreToNumber(get)
  }
  return self
}
