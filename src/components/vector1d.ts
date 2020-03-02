export type Vector1D = {
  get: () => number
  set: (v: Vector1D | number) => Vector1D
  add: (v: Vector1D | number) => Vector1D
  subtract: (v: Vector1D | number) => Vector1D
  multiply: (n: number) => Vector1D
  divide: (n: number) => Vector1D
  normalize: () => Vector1D
}

export function Vector1D(value: number): Vector1D {
  const state = { value }

  function get(): number {
    return state.value
  }

  function set(n: Vector1D | number): Vector1D {
    state.value = readNumber(n)
    return self
  }

  function add(n: Vector1D | number): Vector1D {
    state.value += readNumber(n)
    return self
  }

  function subtract(n: Vector1D | number): Vector1D {
    state.value -= readNumber(n)
    return self
  }

  function multiply(n: number): Vector1D {
    state.value *= n
    return self
  }

  function divide(n: number): Vector1D {
    state.value /= n
    return self
  }

  function normalize(): Vector1D {
    const magnitude = get()
    if (magnitude !== 0) divide(magnitude)
    return self
  }

  function readNumber(v: Vector1D | number): number {
    return typeof v === 'number' ? v : v.get()
  }

  const self: Vector1D = {
    add,
    divide,
    get,
    multiply,
    normalize,
    set,
    subtract,
  }
  return Object.freeze(self)
}
