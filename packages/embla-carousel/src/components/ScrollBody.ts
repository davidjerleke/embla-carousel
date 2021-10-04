import { map, roundToDecimals, mathSign } from './utils'
import { Vector1D, Vector1DType } from './Vector1d'

export type ScrollBodyType = {
  direction: () => number
  seek: (target: Vector1DType) => ScrollBodyType
  settle: (target: Vector1DType) => boolean
  update: () => void
  useBaseMass: () => ScrollBodyType
  useBaseSpeed: () => ScrollBodyType
  useMass: (n: number) => ScrollBodyType
  useSpeed: (n: number) => ScrollBodyType
}

export function ScrollBody(
  location: Vector1DType,
  baseSpeed: number,
  baseMass: number,
): ScrollBodyType {
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

  function applyForce(force: Vector1DType): void {
    force.divide(mass)
    acceleration.add(force)
  }

  function seek(target: Vector1DType): ScrollBodyType {
    attraction.set(target).subtract(location)
    const magnitude = map(attraction.get(), 0, 100, 0, speed)
    attractionDirection = mathSign(attraction.get())
    attraction.normalize().multiply(magnitude).subtract(velocity)
    applyForce(attraction)
    return self
  }

  function settle(target: Vector1DType): boolean {
    const diff = target.get() - location.get()
    const hasSettled = !roundToTwoDecimals(diff)
    if (hasSettled) location.set(target)
    return hasSettled
  }

  function direction(): number {
    return attractionDirection
  }

  function useBaseSpeed(): ScrollBodyType {
    return useSpeed(baseSpeed)
  }

  function useBaseMass(): ScrollBodyType {
    return useMass(baseMass)
  }

  function useSpeed(n: number): ScrollBodyType {
    speed = n
    return self
  }

  function useMass(n: number): ScrollBodyType {
    mass = n
    return self
  }

  const self: ScrollBodyType = {
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
