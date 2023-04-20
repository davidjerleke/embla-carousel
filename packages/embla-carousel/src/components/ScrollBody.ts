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
  const velocity = Vector1D(0)
  const acceleration = Vector1D(0)
  const attraction = Vector1D(0)

  let attractionDirection = 0
  let speed = baseSpeed
  let friction = baseFriction

  let xSpeed = 0

  function seek(target: Vector1DType): void {
    const diff = target.get() - location.get()

    const hasSettled = !roundToTwoDecimals(diff)

    if (hasSettled) {
      location.set(target)
      return
    }

    // if (!xSpeed && !friction) {
    //   attractionDirection = mathSign(diff)
    //   location.set(target)
    //   return
    // }
    // console.log(diff, 'd')

    // console.log(friction, speed, diff, 'friction, speed, diff')

    location.add(xSpeed)
    attractionDirection = mathSign(xSpeed)

    // const steps = 25
    xSpeed += speed ? diff / speed : diff

    if (friction) xSpeed *= friction

    // attraction.set(target).subtract(location)
    // const magnitude = map(attraction.get(), 0, 100, 0, speed)
    // attractionDirection = mathSign(attraction.get())
    // attraction.normalize().multiply(magnitude).subtract(velocity)
    // applyForce(attraction)
    // return self
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
