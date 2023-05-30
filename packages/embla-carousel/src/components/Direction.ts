export type DirectionOptionType = 'ltr' | 'rtl'

export type DirectionType = {
  apply: (n: number) => number
}

export function Direction(direction: DirectionOptionType): DirectionType {
  const sign = direction === 'rtl' ? -1 : 1

  function apply(n: number): number {
    return n * sign
  }

  const self: DirectionType = {
    apply
  }
  return self
}
