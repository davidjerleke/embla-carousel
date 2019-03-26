import { Limit } from './limit'
import { Mover } from './mover'
import { Vector1D } from './vector1d'

interface Params {
  limit: Limit
  location: Vector1D
  mover: Mover
  offset: number
}

export interface VectorBounds {
  constrain(v: Vector1D): VectorBounds
}

export function VectorBounds(params: Params): VectorBounds {
  const self = {} as VectorBounds
  const { limit, offset, location, mover } = params

  function constrain(v: Vector1D): VectorBounds {
    const lowLocationWithOffset = location.get() + offset
    const highLocationWithOffset = location.get() - offset
    if (
      limit.reached.low(lowLocationWithOffset) ||
      limit.reached.high(highLocationWithOffset)
    ) {
      const constraint = limit.constrain(v.get())
      v.setNumber(constraint)
      mover.useSpeed(10)
    }

    return self
  }

  return Object.assign(self, {
    constrain,
  })
}
