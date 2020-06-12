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
  let vector = value

  function get(): number {
    return vector
  }

  function set(n: Vector1D | number): Vector1D {
    vector = readNumber(n)
    return self
  }

  function add(n: Vector1D | number): Vector1D {
    vector += readNumber(n)
    return self
  }

  function subtract(n: Vector1D | number): Vector1D {
    vector -= readNumber(n)
    return self
  }

  function multiply(n: number): Vector1D {
    vector *= n
    return self
  }

  function divide(n: number): Vector1D {
    vector /= n
    return self
  }

  function normalize(): Vector1D {
    if (vector !== 0) divide(vector)
    return self
  }

  function readNumber(n: Vector1D | number): number {
    return typeof n === 'number' ? n : n.get()
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
  return self
}
