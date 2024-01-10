/**
 * This file defines the 'Limit' functionality for numerical ranges. It provides a 'LimitType' interface and a 'Limit' function to handle constraints within a specified minimum and maximum numerical range. The key functionalities include checking if a number has reached or exceeded these limits and constraining a number within this range. This is useful for scenarios where numeric values need to be kept within certain bounds.
 *
 * Functions:
 * - Limit(min, max): Creates a Limit object with provided minimum and maximum values.
 * - Constrain(n): Constrains a number within the set min-max range.
 * - ReachedMin(n), ReachedMax(n), ReachedAny(n): Check if a number has reached or exceeded the min/max limits.
 * - RemoveOffset(n): Adjusts a number by removing the calculated offset based on the length of the range.
 *
 * Dependencies: Utilizes 'mathAbs' from './utils' for absolute value calculations.
 *
 * Note: This module is essential for managing numerical limits and should be used wherever range-bound numeric values are required.
 */

import { mathAbs } from './utils'

export type LimitType = {
  min: number
  max: number
  length: number
  constrain: (n: number) => number
  reachedAny: (n: number) => boolean
  reachedMax: (n: number) => boolean
  reachedMin: (n: number) => boolean
  removeOffset: (n: number) => number
}

export function Limit(min: number = 0, max: number = 0): LimitType {
  const length = mathAbs(min - max)

  function reachedMin(n: number): boolean {
    return n < min
  }

  function reachedMax(n: number): boolean {
    return n > max
  }

  function reachedAny(n: number): boolean {
    return reachedMin(n) || reachedMax(n)
  }

  function constrain(n: number): number {
    if (!reachedAny(n)) return n
    return reachedMin(n) ? min : max
  }

  function removeOffset(n: number): number {
    if (!length) return n
    return n - length * Math.ceil((n - max) / length)
  }

  const self: LimitType = {
    length,
    max,
    min,
    constrain,
    reachedAny,
    reachedMax,
    reachedMin,
    removeOffset
  }
  return self
}
