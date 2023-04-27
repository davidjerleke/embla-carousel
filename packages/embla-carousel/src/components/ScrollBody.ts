import { roundToDecimals, mathSign } from './utils'
import { Vector1D, Vector1DType } from './Vector1d'

export type ScrollBodyType = {
  direction: () => number
  seek: (target: Vector1DType) => ScrollBodyType
  settle: (target: Vector1DType) => boolean
  useBaseFriction: () => ScrollBodyType
  useBaseDuration: () => ScrollBodyType
  useFriction: (n: number) => ScrollBodyType
  useDuration: (n: number) => ScrollBodyType
}

export function ScrollBody(
  location: Vector1DType,
  baseDuration: number,
  baseFriction: number,
): ScrollBodyType {
  const roundToTwoDecimals = roundToDecimals(2)
  const attraction = Vector1D(0)

  let attractionDirection = 0
  let duration = baseDuration
  let friction = baseFriction

  function seek(target: Vector1DType): ScrollBodyType {
    const diff = target.get() - location.get()
    const isInstant = !friction || !duration

    if (isInstant) {
      attraction.set(0)
      location.set(target)
    } else {
      attraction.add(diff / duration)
      attraction.multiply(friction)
      location.add(attraction)
    }

    attractionDirection = mathSign(attraction.get() || diff)
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

  function useBaseDuration(): ScrollBodyType {
    return useDuration(baseDuration)
  }

  function useBaseFriction(): ScrollBodyType {
    return useFriction(baseFriction)
  }

  function useDuration(n: number): ScrollBodyType {
    duration = n
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
    useBaseDuration,
    useFriction,
    useDuration,
  }
  return self
}
