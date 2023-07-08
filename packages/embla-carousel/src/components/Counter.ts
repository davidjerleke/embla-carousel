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
