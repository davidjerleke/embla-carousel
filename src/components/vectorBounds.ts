import { Animation } from './animation'
import { Limit } from './limit'
import { Mover } from './mover'
import { Vector1D } from './vector1d'

type Params = {
  limit: Limit
  location: Vector1D
  mover: Mover
  animation: Animation
  tolerance: number
}

export type VectorBounds = {
  constrain: (v: Vector1D) => VectorBounds
}

export function VectorBounds(params: Params): VectorBounds {
  const { limit, location, mover, animation, tolerance } = params
  const state = { timeout: 0 }

  function shouldConstrain(v: Vector1D): boolean {
    const l = location.get()
    const alreadyLow = v.get() === limit.low
    const alreadyHigh = v.get() === limit.high
    return (
      (limit.reached.low(l) && !alreadyLow) ||
      (limit.reached.high(l) && !alreadyHigh)
    )
  }

  function constrain(v: Vector1D): VectorBounds {
    if (!state.timeout && shouldConstrain(v)) {
      const constraint = limit.constrain(v.get())
      state.timeout = window.setTimeout(() => {
        v.setNumber(constraint)
        mover.useSpeed(10)
        animation.start()
        state.timeout = 0
      }, tolerance)
    }
    return self
  }

  const self: VectorBounds = {
    constrain,
  }
  return Object.freeze(self)
}
