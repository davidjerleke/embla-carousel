export type Vector1DType = {
  value: number
}

export function Vector1D(state: number): Vector1DType {
  const self: Vector1DType = {
    get value(): number {
      return state
    },
    set value(newState: number) {
      state = newState
    },
  }
  return self
}
