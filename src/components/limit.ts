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
  const constrainLimit = [0, low, high]
  const loopLimit = [0, high, low]

  function reachedWhich(n: number): number {
    const lowIndex = reachedLow(n) && 1
    const highIndex = reachedHigh(n) && 2
    return lowIndex || highIndex || 0
  }

  function reachedLow(n: number): boolean {
    return n < low
  }

  function reachedHigh(n: number): boolean {
    return n > high
  }

  function reachedAny(n: number): boolean {
    return reachedLow(n) || reachedHigh(n)
  }

  function loop(n: number): number {
    const which = reachedWhich(n)
    return which ? loopLimit[which] : n
  }

  function constrain(n: number): number {
    const which = reachedWhich(n)
    return which ? constrainLimit[which] : n
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
