import { Vector1D } from './vector1d'

export type Direction = {
  get: () => number
  set: (v: Vector1D) => Direction
}

export function Direction(value: number): Direction {
  const direction = Vector1D(normalize(value))

  function normalize(n: number): number {
    return n === 0 ? 0 : n / Math.abs(n)
  }

  function set(v: Vector1D): Direction {
    const d = normalize(v.get())
    if (d && d !== direction.get()) {
      direction.setNumber(d)
    }
    return self
  }

  const self: Direction = {
    get: direction.get,
    set,
  }
  return Object.freeze(self)
}
