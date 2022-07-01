import { LimitType } from './Limit'
import { ScrollBodyType } from './ScrollBody'
import { Vector1DType } from './Vector1d'
import { mathAbs } from './utils'
import { PercentOfViewType } from './PercentOfView'

export type ScrollBoundsType = {
  constrain: (pointerDown: boolean) => void
  toggleActive: (active: boolean) => void
}

export function ScrollBounds(
  limit: LimitType,
  location: Vector1DType,
  target: Vector1DType,
  scrollBody: ScrollBodyType,
  percentOfView: PercentOfViewType,
): ScrollBoundsType {
  const pullBackThreshold = percentOfView.measure(10)
  const edgeOffsetTolerance = percentOfView.measure(50)
  const maxFriction = 0.85
  let disabled = false

  function shouldConstrain(): boolean {
    if (disabled) return false
    if (!limit.reachedAny(target.get())) return false
    if (!limit.reachedAny(location.get())) return false
    return true
  }

  function constrain(pointerDown: boolean): void {
    if (!shouldConstrain()) return
    const edge = limit.reachedMin(location.get()) ? 'min' : 'max'
    const diffToEdge = mathAbs(limit[edge] - location.get())
    const diffToTarget = target.get() - location.get()
    const friction = Math.min(diffToEdge / edgeOffsetTolerance, maxFriction)

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
