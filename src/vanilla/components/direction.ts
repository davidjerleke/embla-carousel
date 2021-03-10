export type DirectionOptionType = 'ltr' | 'rtl'

export type DirectionType = {
  applyTo: (n: number) => number
}

export function Direction(direction: DirectionOptionType): DirectionType {
  const sign = direction === 'rtl' ? -1 : 1

  function applyTo(n: number): number {
    return n * sign
  }

  const self: DirectionType = {
    applyTo,
  }
  return self
}
