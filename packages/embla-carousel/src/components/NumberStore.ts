import { NumberStoreInputType, mapStoreToNumber } from './utils'

export type NumberStoreType = {
  get: () => number
  set: (input: NumberStoreInputType) => void
  add: (input: NumberStoreInputType) => void
  subtract: (input: NumberStoreInputType) => void
  plus: (input: NumberStoreInputType) => number
  minus: (input: NumberStoreInputType) => number
}

export function NumberStore(initialValue: number): NumberStoreType {
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

  const self: NumberStoreType = {
    get,
    set: mapStoreToNumber(set),
    add: mapStoreToNumber(add),
    subtract: mapStoreToNumber(subtract),
    plus: mapStoreToNumber(plus),
    minus: mapStoreToNumber(minus)
  }
  return self
}
