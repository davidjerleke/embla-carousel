import { Direction } from './direction'
import { map, roundToDecimals } from './utils'
import { Vector1D } from './vector1d'

type Params = {
  location: Vector1D
  speed: number
  mass: number
}

export type ScrollBody = {
  location: Vector1D
  direction: Direction
  update: () => void
  seek: (v: Vector1D) => ScrollBody
  settle: (v: Vector1D) => boolean
  useSpeed: (n: number) => ScrollBody
  useDefaultSpeed: () => ScrollBody
  useMass: (n: number) => ScrollBody
  useDefaultMass: () => ScrollBody
}

export function ScrollBody(params: Params): ScrollBody {
  const { location, speed, mass } = params
  const roundToTwoDecimals = roundToDecimals(2)
  const velocity = Vector1D(0)
  const acceleration = Vector1D(0)
  const attraction = Vector1D(0)
  const direction = Direction(0)
  const state = { speed, mass }

  function update(): void {
    velocity.add(acceleration)
    location.add(velocity)
    acceleration.multiply(0)
  }

  function applyForce(v: Vector1D): void {
    v.divide(state.mass)
    acceleration.add(v)
  }

  function seek(v: Vector1D): ScrollBody {
    attraction.set(v).subtract(location)
    const magnitude = attraction.get()
    const m = map(magnitude, 0, 100, 0, state.speed)
    direction.set(attraction)
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

  function useSpeed(n: number): ScrollBody {
    state.speed = n
    return self
  }

  function useDefaultSpeed(): ScrollBody {
    useSpeed(speed)
    return self
  }

  function useMass(n: number): ScrollBody {
    state.mass = n
    return self
  }

  function useDefaultMass(): ScrollBody {
    useMass(mass)
    return self
  }

  const self: ScrollBody = {
    direction,
    location,
    seek,
    settle,
    update,
    useDefaultMass,
    useDefaultSpeed,
    useMass,
    useSpeed,
  }
  return self
}
