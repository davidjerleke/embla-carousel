import { Limit } from './Limit'
import { mathAbs } from './utils'

export type CounterType = {
  get: () => number
  set: (input: number) => CounterType
  add: (input: number) => CounterType
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

  function normalize(input: number): number {
    return !loop ? clamp(input) : mathAbs((loopEnd + input) % loopEnd)
  }

  function get(): number {
    return counter
  }

  function set(input: number): CounterType {
    counter = normalize(input)
    return self
  }

  function add(input: number): CounterType {
    return clone().set(get() + input)
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
