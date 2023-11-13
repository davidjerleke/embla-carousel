import { mathSign, mathAbs } from './utils'
import { Vector1DType } from './Vector1d'

export type ScrollBodyType = {
  direction: () => number
  duration: () => number
  velocity: () => number
  seek: () => ScrollBodyType
  settled: () => boolean
  useBaseFriction: () => ScrollBodyType
  useBaseDuration: () => ScrollBodyType
  useFriction: (n: number) => ScrollBodyType
  useDuration: (n: number) => ScrollBodyType
}

export function ScrollBody(
  location: Vector1DType,
  offsetLocation: Vector1DType,
  target: Vector1DType,
  baseDuration: number,
  baseFriction: number
): ScrollBodyType {
  let bodyVelocity = 0
  let scrollDirection = 0
  let scrollDuration = baseDuration
  let scrollFriction = baseFriction
  let rawLocation = location.get()
  let rawLocationPrevious = 0

  function seek(): ScrollBodyType {
    const diff = target.get() - location.get()
    const isInstant = !scrollDuration
    let directionDiff = 0

    if (isInstant) {
      bodyVelocity = 0
      location.set(target)

      directionDiff = diff
    } else {
      bodyVelocity += diff / scrollDuration
      bodyVelocity *= scrollFriction
      rawLocation += bodyVelocity
      location.add(bodyVelocity)

      directionDiff = rawLocation - rawLocationPrevious
    }

    scrollDirection = mathSign(directionDiff)
    rawLocationPrevious = rawLocation
    return self
  }

  function settled(): boolean {
    const diff = target.get() - offsetLocation.get()
    return mathAbs(diff) < 0.001
  }

  function duration(): number {
    return scrollDuration
  }

  function direction(): number {
    return scrollDirection
  }

  function velocity(): number {
    return bodyVelocity
  }

  function useBaseDuration(): ScrollBodyType {
    return useDuration(baseDuration)
  }

  function useBaseFriction(): ScrollBodyType {
    return useFriction(baseFriction)
  }

  function useDuration(n: number): ScrollBodyType {
    scrollDuration = n
    return self
  }

  function useFriction(n: number): ScrollBodyType {
    scrollFriction = n
    return self
  }

  const self: ScrollBodyType = {
    direction,
    duration,
    velocity,
    seek,
    settled,
    useBaseFriction,
    useBaseDuration,
    useFriction,
    useDuration
  }
  return self
}
