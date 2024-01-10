/**
 * This file implements a 'Counter' functionality which is used to manage and manipulate a numerical value within a specified range. It provides a 'CounterType' interface and a 'Counter' function that allows for getting, setting, adding to, and cloning the counter value. The counter is constrained within a defined limit and can optionally loop from the maximum value back to zero.
 *
 * Functions:
 * - Counter(max, start, loop): Initializes a Counter object with a maximum value, a start value, and a boolean indicating whether the counter should loop.
 * - Get(): Returns the current value of the counter.
 * - Set(n): Sets the counter to a specific value within the limit.
 * - Add(n): Adds a value to the counter, considering the limit and loop behavior.
 * - Clone(): Creates a clone of the current Counter object.
 *
 * Dependencies:
 * - 'Limit' from './Limit' to enforce numeric boundaries.
 * - 'mathAbs' from './utils' for absolute value calculations in loop scenarios.
 *
 * Note: This module is particularly useful for scenarios where a numeric value needs to be incremented or decremented within a defined range, like in pagination or iterating through slides.
 */

import { Limit } from './Limit'
import { mathAbs } from './utils'

export type CounterType = {
  get: () => number
  set: (n: number) => CounterType
  add: (n: number) => CounterType
  clone: () => CounterType
}

export function Counter(
  max: number,
  start: number,
  loop: boolean
): CounterType {
  const { constrain } = Limit(0, max)
  const loopEnd = max + 1
  let counter = withinLimit(start)

  function withinLimit(n: number): number {
    return !loop ? constrain(n) : mathAbs((loopEnd + n) % loopEnd)
  }

  function get(): number {
    return counter
  }

  function set(n: number): CounterType {
    counter = withinLimit(n)
    return self
  }

  function add(n: number): CounterType {
    return clone().set(get() + n)
  }

  function clone(): CounterType {
    return Counter(max, get(), loop)
  }

  const self: CounterType = {
    get,
    set,
    add,
    clone
  }
  return self
}
