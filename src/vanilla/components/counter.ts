import { LimitType } from './limit'
import { mathSign } from './utils'

export type CounterType = {
  min: number
  max: number
  get: () => number
  set: (n: number) => CounterType
  add: (n: number) => CounterType
  clone: () => CounterType
}

export function Counter(
  limit: LimitType,
  loop: boolean,
  start: number,
): CounterType {
  const { min, max } = limit
  const type = loop ? 'loop' : 'constrain'
  const withinLimit = limit[type]
  let counter = withinLimit(start)

  function get(): number {
    return counter
  }

  function set(n: number): CounterType {
    counter = withinLimit(n)
    return self
  }

  function add(n: number): CounterType {
    if (n !== 0) {
      const sign = mathSign(n)
      set(get() + sign)
      return add(n + sign * -1)
    }
    return self
  }

  function clone(): CounterType {
    return Counter(limit, loop, get())
  }

  const self: CounterType = {
    add,
    clone,
    get,
    max,
    min,
    set,
  }
  return self
}
