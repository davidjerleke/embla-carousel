import { LimitType } from './Limit'
import { ScrollBodyType } from './ScrollBody'
import { Vector1DType } from './Vector1d'
import { mathAbs } from './utils'

export type ScrollBoundsType = {
  constrain: (pointerDown: boolean) => void
  toggleActive: (active: boolean) => void
}

export function ScrollBounds(
  limit: LimitType,
  location: Vector1DType,
  target: Vector1DType,
  scrollBody: ScrollBodyType,
): ScrollBoundsType {
  const pullBackThreshold = 10
  let disabled = false

  function shouldConstrain(): boolean {
    if (disabled) return false
    if (!limit.reachedAny(target.get())) return false
    if (!limit.reachedAny(location.get())) return false
    return true
  }

  function constrain(pointerDown: boolean): void {
    if (!shouldConstrain()) return
    const friction = pointerDown ? 0.7 : 0.45
    const diffToTarget = target.get() - location.get()

    target.subtract(diffToTarget * friction)

    if (!pointerDown && mathAbs(diffToTarget) < pullBackThreshold) {
      target.set(limit.constrain(target.get()))
      scrollBody.useSpeed(10).useMass(3)
    }
  }

  function toggleActive(active: boolean): void {
    disabled = !active
  }

  const self: ScrollBoundsType = {
    constrain,
    toggleActive,
  }
  return self
}
