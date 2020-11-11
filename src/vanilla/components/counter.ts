import { Limit } from './limit'
import { mathSign } from './utils'

type Params = {
  start: number
  limit: Limit
  loop: boolean
}

export type Counter = {
  min: number
  max: number
  get: () => number
  set: (n: number) => Counter
  add: (n: number) => Counter
  clone: () => Counter
}

export function Counter(params: Params): Counter {
  const { start, limit, loop } = params
  const { min, max } = limit
  const type = loop ? 'loop' : 'constrain'
  const withinLimit = limit[type]
  let counter = withinLimit(start)

  function get(): number {
    return counter
  }

  function set(n: number): Counter {
    counter = withinLimit(n)
    return self
  }

  function add(n: number): Counter {
    if (n !== 0) {
      const sign = mathSign(n)
      set(get() + sign)
      return add(n + sign * -1)
    }
    return self
  }

  function clone(): Counter {
    return Counter({ start: get(), limit, loop })
  }

  const self: Counter = {
    add,
    clone,
    get,
    max,
    min,
    set,
  }
  return self
}
