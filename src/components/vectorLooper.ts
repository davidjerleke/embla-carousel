import { Limit } from './limit'
import { Vector1D } from './vector1d'

interface Params {
  limit: Limit
  location: Vector1D
  span: number
  vectors: Vector1D[]
}

export interface VectorLooper {
  loop(direction: number): VectorLooper
}

export function VectorLooper(params: Params): VectorLooper {
  const self = {} as VectorLooper
  const { limit, location, span, vectors } = params

  function shouldLoop(direction: number): boolean {
    const { low, high } = limit.reached
    const limitReached = direction === -1 ? low : high
    return direction !== 0 && limitReached(location.get())
  }

  function loop(direction: number): VectorLooper {
    if (shouldLoop(direction)) {
      const distance = span * (direction * -1)
      vectors.forEach(v => v.addNumber(distance))
    }
    return self
  }

  return Object.assign(self, {
    loop,
  })
}
