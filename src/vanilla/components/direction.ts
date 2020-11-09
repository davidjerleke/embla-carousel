export type DirectionOption = 'ltr' | 'rtl'

export type Direction = {
  applyTo: (n: number) => number
}

export function Direction(direction: DirectionOption): Direction {
  const sign = direction === 'rtl' ? -1 : 1

  function applyTo(n: number): number {
    return n * sign
  }

  const self: Direction = {
    applyTo,
  }
  return self
}
