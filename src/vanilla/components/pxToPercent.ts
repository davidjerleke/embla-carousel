export type PxToPercentType = {
  measure: (n: number) => number
  totalPercent: number
}

export function PxToPercent(viewInPx: number): PxToPercentType {
  const totalPercent = 100

  function measure(n: number): number {
    if (viewInPx === 0) return 0
    return (n / viewInPx) * totalPercent
  }

  const self: PxToPercentType = {
    measure,
    totalPercent,
  }
  return self
}
