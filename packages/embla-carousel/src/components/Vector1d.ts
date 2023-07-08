import { isNumber } from './utils'

export type Vector1DType = {
  get: () => number
  set: (n: Vector1DType | number) => void
  add: (n: Vector1DType | number) => void
  subtract: (n: Vector1DType | number) => void
}

export function Vector1D(initialValue: number): Vector1DType {
  let value = initialValue

  function get(): number {
    return value
  }

  function set(n: Vector1DType | number): void {
    value = normalizeInput(n)
  }

  function add(n: Vector1DType | number): void {
    value += normalizeInput(n)
  }

  function subtract(n: Vector1DType | number): void {
    value -= normalizeInput(n)
  }

  function normalizeInput(n: Vector1DType | number): number {
    return isNumber(n) ? n : n.get()
  }

  const self: Vector1DType = {
    get,
    set,
    add,
    subtract
  }
  return self
}
