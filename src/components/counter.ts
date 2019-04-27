import { Limit } from './limit'

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
  const state = { value: withinLimit(start) }

  function get(): number {
    return state.value
  }

  function set(n: number): Counter {
    state.value = withinLimit(n)
    return self
  }

  function withinLimit(n: number): number {
    return limit[type](n)
  }

  function add(n: number): Counter {
    if (n !== 0) {
      const one = n / Math.abs(n)
      set(get() + one)
      return add(n + one * -1)
    }
    return self
  }

  function clone(): Counter {
    const s = get()
    return Counter({ start: s, limit, loop })
  }

  const self: Counter = {
    add,
    clone,
    get,
    max,
    min,
    set,
  }
  return Object.freeze(self)
}
