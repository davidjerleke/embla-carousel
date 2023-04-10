import { Limit } from './Limit'
import { map, roundToDecimals, mathSign } from './utils'
import { Vector1D, Vector1DType } from './Vector1d'

export type ScrollBodyType = {
  direction: () => number
  seek: (
    target: Vector1DType,
    frameRate: number,
    pointerDown: boolean,
  ) => ScrollBodyType
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
  const fps60 = (1 / 60) * 1000

  let frameRateFactor = 1
  let attractionDirection = 0
  let speed = baseSpeed
  let mass = baseMass

  function update(): void {
    velocity.add(acceleration)
    location.add(velocity)
    acceleration.multiply(0)
  }

  function applyForce(force: Vector1DType): void {
    // console.log(frameRateFactor, 'frameRateFactor')
    // console.log(frameRateFactor, 'frameRateFactor')
    // console.log(
    //   Limit(1 * frameRateFactor, 3 * frameRateFactor).constrain(mass),
    //   'mass * frameRateFactor',
    // )
    // force.divide(Limit(1, 12).constrain(mass * frameRateFactor))
    // force.divide(
    //   Limit(Math.max(1 * frameRateFactor, 1), 3 * frameRateFactor).constrain(
    //     mass * frameRateFactor,
    //   ),
    // )

    const testMass =
      mass === 1 || speed === 100 ? mass : mass * frameRateFactor * 0.95
    console.log('mass', testMass)
    // console.log(testMass, 'testMass')
    force.divide(testMass)

    // const frameRateMass = mass * frameRateFactor
    // force.divide(Limit(1, 10).constrain(frameRateMass))
    // console.log(Limit(1, 10).constrain(frameRateMass))

    acceleration.add(force)
  }

  function seek(
    target: Vector1DType,
    frameRate: number,
    pointerDown: boolean,
  ): ScrollBodyType {
    frameRateFactor = roundToTwoDecimals(fps60 / frameRate)
    attraction.set(target).subtract(location)

    const frameRateAttraction = attraction.get() / frameRateFactor
    // console.log(frameRateFactor, 'frameRateFactor')
    const magnitude = map(
      attraction.get(),
      0,
      100,
      0,
      pointerDown || speed === 100 ? speed : speed / frameRateFactor,
    )
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
    mass = Limit(1, 3).constrain(n)
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
