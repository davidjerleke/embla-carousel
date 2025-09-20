import { VectorOrNumberType, mapVectorToNumber } from './utils'

export type Vector1DType = {
  get: () => number
  set: (input: VectorOrNumberType) => void
  add: (input: VectorOrNumberType) => void
  subtract: (input: VectorOrNumberType) => void
  plus: (input: VectorOrNumberType) => number
  minus: (input: VectorOrNumberType) => number
}

export function Vector1D(initialValue: number): Vector1DType {
  let value = initialValue || 0

  function get(): number {
    return value
  }

  function set(input: number): void {
    value = input
  }

  function add(input: number): void {
    value += input
  }

  function subtract(input: number): void {
    add(-input)
  }

  function plus(input: number): number {
    return value + input
  }

  function minus(input: number): number {
    return plus(-input)
  }

  const self: Vector1DType = {
    get,
    set: mapVectorToNumber(set),
    add: mapVectorToNumber(add),
    subtract: mapVectorToNumber(subtract),
    plus: mapVectorToNumber(plus),
    minus: mapVectorToNumber(minus)
  }
  return self
}
