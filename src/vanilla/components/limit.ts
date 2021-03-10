export type LimitType = {
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

export function Limit(min: number, max: number): LimitType {
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

  function removeOffset(n: number): number {
    if (min === max) return n
    while (reachedMin(n)) n += length
    while (reachedMax(n)) n -= length
    return n
  }

  function loop(n: number): number {
    if (!reachedAny(n)) return n
    return reachedMin(n) ? max : min
  }

  function constrain(n: number): number {
    if (!reachedAny(n)) return n
    return reachedMin(n) ? min : max
  }

  const self: LimitType = {
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
