import { Limit } from './limit'
import { PxToPercent } from './pxToPercent'
import { Vector1D } from './vector1d'

type Params = {
  contentSize: number
  limit: Limit
  location: Vector1D
  pxToPercent: PxToPercent
  vectors: Vector1D[]
}

export type ScrollLooper = {
  loop: (direction: number) => void
}

export function ScrollLooper(params: Params): ScrollLooper {
  const { contentSize, location, vectors } = params
  const { limit, pxToPercent } = params
  const min = limit.min + pxToPercent.measure(0.1)
  const max = limit.max + pxToPercent.measure(0.1)
  const { reachedMin, reachedMax } = Limit({ min, max })

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
