export type PercentOfViewType = {
  measure: (n: number) => number
}

export function PercentOfView(viewSize: number): PercentOfViewType {
  function measure(n: number): number {
    return viewSize * (n / 100)
  }

  const self: PercentOfViewType = {
    measure
  }
  return self
}
