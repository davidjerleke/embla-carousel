import { Limit } from './limit'
import { Mover } from './mover'
import { Vector1D } from './vector1d'

interface Params {
  limit: Limit
  location: Vector1D
  mover: Mover
}

export interface VectorBounds {
  constrain(v: Vector1D): VectorBounds
}

export function VectorBounds(params: Params): VectorBounds {
  const self = {} as VectorBounds
  const { limit, location, mover } = params

  function constrain(v: Vector1D): VectorBounds {
    if (limit.reached.any(location.get())) {
      const constraint = limit.constrain(v.get())
      setTimeout(() => v.setNumber(constraint), 40)
      mover.useSpeed(10)
    }
    return self
  }

  return Object.assign(self, {
    constrain,
  })
}
