import { Limit } from './limit'
import { Mover } from './mover'
import { Vector1D } from './vector1d'
import { Animation } from './animation'

interface Params {
  limit: Limit
  location: Vector1D
  mover: Mover
  animation: Animation
}

export interface VectorBounds {
  constrain(v: Vector1D): VectorBounds
}

export function VectorBounds(params: Params): VectorBounds {
  const self = {} as VectorBounds
  const { limit, location, mover, animation } = params
  const state = { timeout: 0 }

  function shouldConstrain(v: Vector1D): boolean {
    const l = location.get()
    const isNotLowLimit = v.get() !== limit.low
    const isNotHighLimit = v.get() !== limit.high
    return (
      (limit.reached.low(l) && isNotLowLimit) ||
      (limit.reached.high(l) && isNotHighLimit)
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
      }, 50)
    }
    return self
  }

  return Object.assign(self, {
    constrain,
  })
}
