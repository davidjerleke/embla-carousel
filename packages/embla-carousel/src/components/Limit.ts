import { mathAbs, NumberStoreInputType, mapStoreToNumber } from './utils'

export type LimitType = {
  min: number
  max: number
  length: number
  clamp: (input: NumberStoreInputType) => number
  pastAnyBound: (input: NumberStoreInputType) => boolean
  pastMaxBound: (input: NumberStoreInputType) => boolean
  pastMinBound: (input: NumberStoreInputType) => boolean
  removeOffset: (input: NumberStoreInputType) => number
}

export function Limit(min: number = 0, max: number = 0): LimitType {
  const length = mathAbs(min - max)

  function pastMinBound(input: number): boolean {
    return input < min
  }

  function pastMaxBound(input: number): boolean {
    return input > max
  }

  function pastAnyBound(input: number): boolean {
    return pastMinBound(input) || pastMaxBound(input)
  }

  function clamp(input: number): number {
    if (!pastAnyBound(input)) return input
    return pastMinBound(input) ? min : max
  }

  function removeOffset(input: number): number {
    if (!length) return input
    return input - length * Math.ceil((input - max) / length)
  }

  const self: LimitType = {
    length,
    max,
    min,
    clamp: mapStoreToNumber(clamp),
    pastAnyBound: mapStoreToNumber(pastAnyBound),
    pastMaxBound: mapStoreToNumber(pastMaxBound),
    pastMinBound: mapStoreToNumber(pastMinBound),
    removeOffset: mapStoreToNumber(removeOffset)
  }
  return self
}
