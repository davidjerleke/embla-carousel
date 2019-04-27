type Limits = 'min' | 'max' | ''

type Params = {
  min: number
  max: number
}

export type Limit = {
  min: number
  max: number
  loop: (n: number) => number
  constrain: (n: number) => number
  reachedAny: (n: number) => boolean
  reachedMax: (n: number) => boolean
  reachedMin: (n: number) => boolean
}

export function Limit(params: Params): Limit {
  const { min, max } = params
  const loopLimits = { max: min, min: max }
  const constrainLimits = { min, max }

  function reachedMin(n: number): boolean {
    return n < min
  }

  function reachedMax(n: number): boolean {
    return n > max
  }

  function reachedAny(n: number): boolean {
    return reachedMin(n) || reachedMax(n)
  }

  function reachedWhich(n: number): Limits {
    const isMin = reachedMin(n) && 'min'
    const isMax = reachedMax(n) && 'max'
    return isMin || isMax || ''
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
    loop,
    max,
    min,
    reachedAny,
    reachedMax,
    reachedMin,
  }
  return Object.freeze(self)
}
