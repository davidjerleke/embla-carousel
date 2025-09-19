import { mathAbs } from './utils'

export type LimitType = {
  min: number
  max: number
  length: number
  clamp: (n: number) => number
  pastAnyBound: (n: number) => boolean
  pastMaxBound: (n: number) => boolean
  pastMinBound: (n: number) => boolean
  removeOffset: (n: number) => number
}

export function Limit(min: number = 0, max: number = 0): LimitType {
  const length = mathAbs(min - max)

  function pastMinBound(value: number): boolean {
    return value < min
  }

  function pastMaxBound(value: number): boolean {
    return value > max
  }

  function pastAnyBound(value: number): boolean {
    return pastMinBound(value) || pastMaxBound(value)
  }

  function clamp(value: number): number {
    if (!pastAnyBound(value)) return value
    return pastMinBound(value) ? min : max
  }

  function removeOffset(value: number): number {
    if (!length) return value
    return value - length * Math.ceil((value - max) / length)
  }

  const self: LimitType = {
    length,
    max,
    min,
    clamp,
    pastAnyBound,
    pastMaxBound,
    pastMinBound,
    removeOffset
  }
  return self
}
