import { Limit } from './limit'

export type CounterType = {
  get: () => number
  set: (n: number) => CounterType
  add: (n: number) => CounterType
  clone: () => CounterType
}

export function Counter(
  max: number,
  start: number,
  loop: boolean,
): CounterType {
  const { constrain } = Limit(0, max)
  const loopEnd = max + 1
  let counter = withinLimit(start)

  function withinLimit(n: number): number {
    return !loop ? constrain(n) : Math.abs((loopEnd + n) % loopEnd)
  }

  function get(): number {
    return counter
  }

  function set(n: number): CounterType {
    counter = withinLimit(n)
    return self
  }

  function add(n: number): CounterType {
    return set(get() + n)
  }

  function clone(): CounterType {
    return Counter(max, get(), loop)
  }

  const self: CounterType = {
    add,
    clone,
    get,
    set,
  }
  return self
}
