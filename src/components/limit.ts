type Limits = 'min' | 'max' | ''

type Params = {
  min: number
  max: number
}

export type Limit = {
  min: number
  max: number
  length: number
  loop: (n: number) => number
  constrain: (n: number) => number
  reachedAny: (n: number) => boolean
  reachedMax: (n: number) => boolean
  reachedMin: (n: number) => boolean
  removeOffset: (n: number) => number
}

export function Limit(params: Params): Limit {
  const { min, max } = params
  const loopLimits = { min: max, max: min }
  const constrainLimits = { min, max }
  const length = Math.abs(min - max)

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
    if (reachedMin(n)) return 'min'
    if (reachedMax(n)) return 'max'
    return ''
  }

  function removeOffset(n: number): number {
    if (min === max) return n
    while (reachedMin(n)) n += length
    while (reachedMax(n)) n -= length
    return n
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
    length,
    loop,
    max,
    min,
    reachedAny,
    reachedMax,
    reachedMin,
    removeOffset,
  }
  return self
}
