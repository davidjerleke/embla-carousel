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
  previousLocation: Vector1DType,
  target: Vector1DType,
  baseDuration: number,
  baseFriction: number
): ScrollBodyType {
  let scrollVelocity = 0
  let scrollDirection = 0
  let scrollDuration = baseDuration
  let scrollFriction = baseFriction
  let rawLocation = location.get()
  let rawLocationPrevious = 0

  function seek(): ScrollBodyType {
    const displacement = target.get() - location.get()
    const isInstant = !scrollDuration
    let scrollDistance = 0

    if (isInstant) {
      scrollVelocity = 0
      previousLocation.set(target)
      location.set(target)

      scrollDistance = displacement
    } else {
      previousLocation.set(location)

      scrollVelocity += displacement / scrollDuration
      scrollVelocity *= scrollFriction
      rawLocation += scrollVelocity
      location.add(scrollVelocity)

      scrollDistance = rawLocation - rawLocationPrevious
    }

    scrollDirection = mathSign(scrollDistance)
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
    return scrollVelocity
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
