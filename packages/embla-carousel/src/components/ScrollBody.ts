import { mathSign, mathAbs } from './utils'
import { Vector1DType } from './Vector1d'

export type ScrollBodyType = {
  direction: () => number
  seek: () => ScrollBodyType
  settled: () => boolean
  useBaseFriction: () => ScrollBodyType
  useBaseDuration: () => ScrollBodyType
  useFriction: (n: number) => ScrollBodyType
  useDuration: (n: number) => ScrollBodyType
  velocity: () => number
}

export function ScrollBody(
  location: Vector1DType,
  target: Vector1DType,
  baseDuration: number,
  baseFriction: number,
): ScrollBodyType {
  let hasSettled = true
  let bodyVelocity = 0
  let scrollDirection = 0
  let duration = baseDuration
  let friction = baseFriction

  function seek(): ScrollBodyType {
    const diff = target.get() - location.get()
    const isInstant = !friction || !duration

    if (isInstant) {
      bodyVelocity = 0
      location.set(target)
    } else {
      bodyVelocity += diff / duration
      bodyVelocity *= friction
      location.add(bodyVelocity)
    }

    scrollDirection = mathSign(bodyVelocity || diff)
    hasSettled = mathAbs(diff) < 0.001
    return self
  }

  function settled(): boolean {
    if (hasSettled) location.set(target)
    return hasSettled
  }

  function velocity(): number {
    return bodyVelocity
  }

  function direction(): number {
    return scrollDirection
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
    settled,
    useBaseFriction,
    useBaseDuration,
    useFriction,
    useDuration,
    velocity,
  }
  return self
}
