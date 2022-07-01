import { Limit, LimitType } from './Limit'
import { Vector1DType } from './Vector1d'

export type ScrollLooperType = {
  loop: (direction: number) => void
}

export function ScrollLooper(
  contentSize: number,
  limit: LimitType,
  location: Vector1DType,
  vectors: Vector1DType[],
): ScrollLooperType {
  const jointSafety = 0.1
  const min = limit.min + jointSafety
  const max = limit.max + jointSafety
  const { reachedMin, reachedMax } = Limit(min, max)

  function shouldLoop(direction: number): boolean {
    if (direction === 1) return reachedMax(location.get())
    if (direction === -1) return reachedMin(location.get())
    return false
  }

  function loop(direction: number): void {
    if (!shouldLoop(direction)) return

    const loopDistance = contentSize * (direction * -1)
    vectors.forEach((v) => v.add(loopDistance))
  }

  const self: ScrollLooperType = {
    loop,
  }
  return self
}
