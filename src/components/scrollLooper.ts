import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  limit: Limit
  location: Vector1D
  contentSize: number
  vectors: Vector1D[]
}

export type ScrollLooper = {
  loop: (direction: number) => void
}

export function ScrollLooper(params: Params): ScrollLooper {
  const { limit, location, contentSize, vectors } = params
  const { reachedMin, reachedMax } = limit

  function shouldLoop(direction: number): boolean {
    const reachedLimit = direction === -1 ? reachedMin : reachedMax
    return direction !== 0 && reachedLimit(location.get())
  }

  function loop(direction: number): void {
    if (shouldLoop(direction)) {
      const loopDistance = contentSize * (direction * -1)
      vectors.forEach(v => v.addNumber(loopDistance))
    }
  }

  const self: ScrollLooper = {
    loop,
  }
  return Object.freeze(self)
}
