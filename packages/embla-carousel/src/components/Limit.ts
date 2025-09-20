import { mathAbs, VectorOrNumberType, mapVectorToNumber } from './utils'

export type LimitType = {
  min: number
  max: number
  length: number
  clamp: (input: VectorOrNumberType) => number
  pastAnyBound: (input: VectorOrNumberType) => boolean
  pastMaxBound: (input: VectorOrNumberType) => boolean
  pastMinBound: (input: VectorOrNumberType) => boolean
  removeOffset: (input: VectorOrNumberType) => number
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
    clamp: mapVectorToNumber(clamp),
    pastAnyBound: mapVectorToNumber(pastAnyBound),
    pastMaxBound: mapVectorToNumber(pastMaxBound),
    pastMinBound: mapVectorToNumber(pastMinBound),
    removeOffset: mapVectorToNumber(removeOffset)
  }
  return self
}
