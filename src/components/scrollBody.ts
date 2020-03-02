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
  seek: (target: Vector1D) => ScrollBody
  settle: (target: Vector1D) => boolean
  useSpeed: (newSpeed: number) => ScrollBody
  useDefaultSpeed: () => ScrollBody
  useMass: (newMass: number) => ScrollBody
  useDefaultMass: () => ScrollBody
}

export function ScrollBody(params: Params): ScrollBody {
  const roundToTwoDecimals = roundToDecimals(2)
  const { location, speed, mass } = params
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

  function applyForce(force: Vector1D): void {
    force.divide(state.mass)
    acceleration.add(force)
  }

  function seek(target: Vector1D): ScrollBody {
    attraction.set(target).subtract(location)
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

  function settle(target: Vector1D): boolean {
    const diff = target.get() - location.get()
    const diffRounded = roundToTwoDecimals(diff)
    const hasSettled = !diffRounded
    if (hasSettled) location.set(target)
    return hasSettled
  }

  function useSpeed(desired: number): ScrollBody {
    state.speed = desired
    return self
  }

  function useDefaultSpeed(): ScrollBody {
    useSpeed(speed)
    return self
  }

  function useMass(desired: number): ScrollBody {
    state.mass = desired
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
  return Object.freeze(self)
}
