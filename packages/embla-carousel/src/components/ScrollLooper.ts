import { Limit, LimitType } from './Limit'
import { PxToPercentType } from './PxToPercent'
import { Vector1DType } from './Vector1d'

export type ScrollLooperType = {
  loop: (direction: number) => void
}

export function ScrollLooper(
  contentSize: number,
  pxToPercent: PxToPercentType,
  limit: LimitType,
  location: Vector1DType,
  vectors: Vector1DType[],
): ScrollLooperType {
  const min = limit.min + pxToPercent.measure(0.1)
  const max = limit.max + pxToPercent.measure(0.1)
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
