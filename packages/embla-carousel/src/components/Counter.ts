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
  const { clamp } = Limit(0, max)
  const loopEnd = max + 1
  let counter = normalize(start)

  function normalize(n: number): number {
    return !loop ? clamp(n) : mathAbs((loopEnd + n) % loopEnd)
  }

  function get(): number {
    return counter
  }

  function set(n: number): CounterType {
    counter = normalize(n)
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
