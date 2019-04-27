type Limits = 'low' | 'high' | ''

type Params = {
  low: number
  high: number
}

export type Limit = {
  low: number
  high: number
  loop: (n: number) => number
  constrain: (n: number) => number
  reachedAny: (n: number) => boolean
  reachedHigh: (n: number) => boolean
  reachedLow: (n: number) => boolean
}

export function Limit(params: Params): Limit {
  const { low, high } = params
  const loopLimits = { high: low, low: high }
  const constrainLimits = { low, high }

  function reachedLow(n: number): boolean {
    return n < low
  }

  function reachedHigh(n: number): boolean {
    return n > high
  }

  function reachedAny(n: number): boolean {
    return reachedLow(n) || reachedHigh(n)
  }

  function reachedWhich(n: number): Limits {
    const isLow = reachedLow(n) && 'low'
    const isHigh = reachedHigh(n) && 'high'
    return isLow || isHigh || ''
  }

  function loop(n: number): number {
    const which = reachedWhich(n)
    return which ? loopLimits[which] : n
  }

  function constrain(n: number): number {
    const which = reachedWhich(n)
    return which ? constrainLimits[which] : n
  }

  const self: Limit = {
    constrain,
    high,
    loop,
    low,
    reachedAny,
    reachedHigh,
    reachedLow,
  }
  return Object.freeze(self)
}
