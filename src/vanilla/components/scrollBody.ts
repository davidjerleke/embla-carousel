import { map, roundToDecimals, mathSign } from './utils'
import { Vector1D } from './vector1d'

export type ScrollBody = {
  direction: () => number
  seek: (v: Vector1D) => ScrollBody
  settle: (v: Vector1D) => boolean
  update: () => void
  useBaseMass: () => ScrollBody
  useBaseSpeed: () => ScrollBody
  useMass: (n: number) => ScrollBody
  useSpeed: (n: number) => ScrollBody
}

export function ScrollBody(
  location: Vector1D,
  baseSpeed: number,
  baseMass: number,
): ScrollBody {
  const roundToTwoDecimals = roundToDecimals(2)
  const velocity = Vector1D(0)
  const acceleration = Vector1D(0)
  const attraction = Vector1D(0)

  let attractionDirection = 0
  let speed = baseSpeed
  let mass = baseMass

  function update(): void {
    velocity.add(acceleration)
    location.add(velocity)
    acceleration.multiply(0)
  }

  function applyForce(v: Vector1D): void {
    v.divide(mass)
    acceleration.add(v)
  }

  function seek(v: Vector1D): ScrollBody {
    attraction.set(v).subtract(location)
    const magnitude = attraction.get()
    const m = map(magnitude, 0, 100, 0, speed)
    attractionDirection = mathSign(attraction.get())
    attraction
      .normalize()
      .multiply(m)
      .subtract(velocity)
    applyForce(attraction)
    return self
  }

  function settle(v: Vector1D): boolean {
    const diff = v.get() - location.get()
    const diffRounded = roundToTwoDecimals(diff)
    const hasSettled = !diffRounded
    if (hasSettled) location.set(v)
    return hasSettled
  }

  function direction(): number {
    return attractionDirection
  }

  function useSpeed(n: number): ScrollBody {
    speed = n
    return self
  }

  function useMass(n: number): ScrollBody {
    mass = n
    return self
  }

  function useBaseSpeed(): ScrollBody {
    return useSpeed(baseSpeed)
  }

  function useBaseMass(): ScrollBody {
    return useMass(baseMass)
  }

  const self: ScrollBody = {
    direction,
    seek,
    settle,
    update,
    useBaseMass,
    useBaseSpeed,
    useMass,
    useSpeed,
  }
  return self
}
