export type PxToPercent = {
  measure: (n: number) => number
  totalPercent: number
}

export function PxToPercent(viewInPx: number): PxToPercent {
  const totalPercent = 100

  function measure(n: number): number {
    return (n / viewInPx) * totalPercent
  }

  const self: PxToPercent = {
    measure,
    totalPercent,
  }
  return Object.freeze(self)
}
