type Limits = { [key: string]: number }

interface Params {
  low: number
  high: number
}

export interface Limit {
  low: number
  high: number
  loop(n: number): number
  constrain(n: number): number
  reached: {
    low(n: number): boolean
    high(n: number): boolean
    any(n: number): boolean
  }
}

export function Limit(params: Params): Limit {
  const self = {} as Limit
  const { low, high } = params
  const loopLimits: Limits = { high: low, low: high }
  const constrainLimits: Limits = { low, high }

  function reachedLow(n: number): boolean {
    return n < low
  }

  function reachedHigh(n: number): boolean {
    return n > high
  }

  function reachedAny(n: number): boolean {
    return reachedLow(n) || reachedHigh(n)
  }

  function reachedWhich(n: number): string {
    if (reachedLow(n)) return 'low'
    if (reachedHigh(n)) return 'high'
    return ''
  }

  function loop(n: number): number {
    const which = reachedWhich(n)
    return which ? loopLimits[which] : n
  }

  function constrain(n: number): number {
    const which = reachedWhich(n)
    return which ? constrainLimits[which] : n
  }

  return Object.assign(self, {
    constrain,
    high,
    loop,
    low,
    reached: {
      any: reachedAny,
      high: reachedHigh,
      low: reachedLow,
    },
  })
}
