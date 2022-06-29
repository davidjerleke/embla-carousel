import { isNumber } from './utils'

export type Vector1DType = {
  get: () => number
  set: (v: Vector1DType | number) => Vector1DType
  add: (v: Vector1DType | number) => Vector1DType
  subtract: (v: Vector1DType | number) => Vector1DType
  multiply: (n: number) => Vector1DType
  divide: (n: number) => Vector1DType
  normalize: () => Vector1DType
}

export function Vector1D(value: number): Vector1DType {
  let vector = value

  function get(): number {
    return vector
  }

  function set(n: Vector1DType | number): Vector1DType {
    vector = readNumber(n)
    return self
  }

  function add(n: Vector1DType | number): Vector1DType {
    vector += readNumber(n)
    return self
  }

  function subtract(n: Vector1DType | number): Vector1DType {
    vector -= readNumber(n)
    return self
  }

  function multiply(n: number): Vector1DType {
    vector *= n
    return self
  }

  function divide(n: number): Vector1DType {
    vector /= n
    return self
  }

  function normalize(): Vector1DType {
    if (vector !== 0) divide(vector)
    return self
  }

  function readNumber(n: Vector1DType | number): number {
    return isNumber(n) ? n : n.get()
  }

  const self: Vector1DType = {
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
