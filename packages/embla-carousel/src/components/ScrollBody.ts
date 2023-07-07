import { mathSign, mathAbs } from './utils'
import { Vector1DType } from './Vector1d'

export type ScrollBodyType = {
  direction: () => number
  duration: () => number
  seek: () => ScrollBodyType
  settled: () => boolean
  useBaseFriction: () => ScrollBodyType
  useBaseDuration: () => ScrollBodyType
  useFriction: (n: number) => ScrollBodyType
  useDuration: (n: number) => ScrollBodyType
  useDirection: (n: number) => ScrollBodyType
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
  let scrollDuration = baseDuration
  let scrollFriction = baseFriction

  function seek(): ScrollBodyType {
    const diff = target.get() - location.get()
    const isInstant = !scrollDuration

    if (isInstant) {
      bodyVelocity = 0
      location.set(target)
    } else {
      bodyVelocity += diff / scrollDuration
      bodyVelocity *= scrollFriction
      location.add(bodyVelocity)
    }

    hasSettled = mathAbs(diff) < 0.001
    return self
  }

  function settled(): boolean {
    return hasSettled
  }

  function duration(): number {
    return scrollDuration
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
    scrollDuration = n
    return self
  }

  function useFriction(n: number): ScrollBodyType {
    scrollFriction = n
    return self
  }

  function useDirection(n: number): ScrollBodyType {
    scrollDirection = mathSign(n)
    return self
  }

  const self: ScrollBodyType = {
    direction,
    duration,
    seek,
    settled,
    useBaseFriction,
    useBaseDuration,
    useDirection,
    useFriction,
    useDuration,
  }
  return self
}
