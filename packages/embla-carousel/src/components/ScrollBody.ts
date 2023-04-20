import { roundToDecimals, mathSign } from './utils'
import { Vector1D, Vector1DType } from './Vector1d'

export type ScrollBodyType = {
  direction: () => number
  seek: (target: Vector1DType) => void
  settle: (target: Vector1DType) => boolean
  useBaseFriction: () => ScrollBodyType
  useBaseSpeed: () => ScrollBodyType
  useFriction: (n: number) => ScrollBodyType
  useSpeed: (n: number) => ScrollBodyType
}

export function ScrollBody(
  location: Vector1DType,
  baseSpeed: number,
  baseFriction: number,
): ScrollBodyType {
  const roundToTwoDecimals = roundToDecimals(2)
  const attraction = Vector1D(0)

  let attractionDirection = 0
  let speed = baseSpeed
  let friction = baseFriction

  function seek(target: Vector1DType): void {
    const diff = target.get() - location.get()
    const isInstant = !friction || !speed

    if (isInstant) {
      attraction.set(0)
      location.set(target)
    } else {
      attraction.add(diff / speed)
      attraction.multiply(friction)
      location.add(attraction)
    }

    attractionDirection = mathSign(attraction.get() || diff)
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

  function useBaseFriction(): ScrollBodyType {
    return useFriction(baseFriction)
  }

  function useSpeed(n: number): ScrollBodyType {
    speed = n
    return self
  }

  function useFriction(n: number): ScrollBodyType {
    friction = n
    return self
  }

  const self: ScrollBodyType = {
    direction,
    seek,
    settle,
    useBaseFriction,
    useBaseSpeed,
    useFriction,
    useSpeed,
  }
  return self
}
