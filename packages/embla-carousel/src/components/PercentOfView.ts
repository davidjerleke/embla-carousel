export type PercentOfViewType = {
  measure: (input: number) => number
}

export function PercentOfView(viewSize: number): PercentOfViewType {
  function measure(input: number): number {
    return viewSize * (input / 100)
  }

  const self: PercentOfViewType = {
    measure
  }
  return self
}
