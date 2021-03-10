import { Limit } from './limit'
import { PxToPercent } from './pxToPercent'
import { Vector1D } from './vector1d'

export type ScrollLooper = {
  loop: (vectors: Vector1D[], direction: number) => void
}

export function ScrollLooper(
  contentSize: number,
  pxToPercent: PxToPercent,
  limit: Limit,
  location: Vector1D,
): ScrollLooper {
  const min = limit.min + pxToPercent.measure(0.1)
  const max = limit.max + pxToPercent.measure(0.1)
  const { reachedMin, reachedMax } = Limit(min, max)

  function shouldLoop(direction: number): boolean {
    if (direction === 1) return reachedMax(location.get())
    if (direction === -1) return reachedMin(location.get())
    return false
  }

  function loop(vectors: Vector1D[], direction: number): void {
    if (!shouldLoop(direction)) return

    const loopDistance = contentSize * (direction * -1)
    vectors.forEach(v => v.add(loopDistance))
  }

  const self: ScrollLooper = {
    loop,
  }
  return self
}
