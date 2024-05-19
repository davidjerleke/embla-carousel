import { Limit, LimitType } from './Limit'
import { ScrollBodyType } from './ScrollBody'
import { Vector1DType } from './Vector1d'
import { mathAbs } from './utils'
import { PercentOfViewType } from './PercentOfView'

export type ScrollBoundsType = {
  shouldConstrain: () => boolean
  constrain: (pointerDown: boolean) => void
  toggleActive: (active: boolean) => void
}

export function ScrollBounds(
  limit: LimitType,
  offsetLocation: Vector1DType,
  target: Vector1DType,
  scrollBody: ScrollBodyType,
  percentOfView: PercentOfViewType
): ScrollBoundsType {
  const pullBackThreshold = percentOfView.measure(10)
  const edgeOffsetTolerance = percentOfView.measure(50)
  const frictionLimit = Limit(0.1, 0.99)
  let disabled = false

  function shouldConstrain(): boolean {
    if (disabled) return false
    if (!limit.reachedAny(target.get())) return false
    if (!limit.reachedAny(offsetLocation.get())) return false
    return true
  }

  function constrain(pointerDown: boolean): void {
    if (!shouldConstrain()) return
    const edge = limit.reachedMin(offsetLocation.get()) ? 'min' : 'max'
    const diffToEdge = mathAbs(limit[edge] - offsetLocation.get())
    const diffToTarget = target.get() - offsetLocation.get()
    const friction = frictionLimit.constrain(diffToEdge / edgeOffsetTolerance)

    target.subtract(diffToTarget * friction)

    if (!pointerDown && mathAbs(diffToTarget) < pullBackThreshold) {
      target.set(limit.constrain(target.get()))
      scrollBody.useDuration(25).useBaseFriction()
    }
  }

  function toggleActive(active: boolean): void {
    disabled = !active
  }

  const self: ScrollBoundsType = {
    shouldConstrain,
    constrain,
    toggleActive
  }
  return self
}
