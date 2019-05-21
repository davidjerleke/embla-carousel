import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  limit: Limit
  location: Vector1D
  span: number
  vectors: Vector1D[]
}

export type EdgeLooper = {
  loop: (direction: number) => void
}

export function EdgeLooper(params: Params): EdgeLooper {
  const { limit, location, span, vectors } = params
  const { reachedMin, reachedMax } = limit

  function shouldLoop(direction: number): boolean {
    const reachedLimit = direction === -1 ? reachedMin : reachedMax
    return direction !== 0 && reachedLimit(location.get())
  }

  function loop(direction: number): void {
    if (shouldLoop(direction)) {
      const distance = span * (direction * -1)
      vectors.forEach(v => v.addNumber(distance))
    }
  }

  const self: EdgeLooper = {
    loop,
  }
  return Object.freeze(self)
}
