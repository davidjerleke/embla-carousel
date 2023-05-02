import { Limit, LimitType } from './Limit'
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
  const frictionLimit = Limit(0.1, 0.99)
  let disabled = false

  function shouldConstrain(): boolean {
    if (disabled) return false
    if (!limit.reachedAny(target.value)) return false
    if (!limit.reachedAny(location.value)) return false
    return true
  }

  function constrain(pointerDown: boolean): void {
    if (!shouldConstrain()) return
    const edge = limit.reachedMin(location.value) ? 'min' : 'max'
    const diffToEdge = mathAbs(limit[edge] - location.value)
    const diffToTarget = target.value - location.value
    const friction = frictionLimit.constrain(diffToEdge / edgeOffsetTolerance)

    target.value -= diffToTarget * friction

    if (!pointerDown && mathAbs(diffToTarget) < pullBackThreshold) {
      target.value = limit.constrain(target.value)
      scrollBody.useDuration(25).useBaseFriction()
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
