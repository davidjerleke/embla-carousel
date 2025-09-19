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
  location: Vector1DType,
  target: Vector1DType,
  scrollBody: ScrollBodyType,
  percentOfView: PercentOfViewType
): ScrollBoundsType {
  const { pastAnyBound, pastMinBound, clamp } = limit
  const pullBackThreshold = percentOfView.measure(10)
  const edgeOffsetTolerance = percentOfView.measure(50)
  const frictionLimit = Limit(0.1, 0.99)
  let disabled = false

  function shouldConstrain(): boolean {
    if (disabled) return false
    if (!pastAnyBound(target.get())) return false
    if (!pastAnyBound(location.get())) return false
    return true
  }

  function constrain(pointerDown: boolean): void {
    if (!shouldConstrain()) return
    const edge = pastMinBound(location.get()) ? 'min' : 'max'
    const diffToEdge = mathAbs(limit[edge] - location.get())
    const diffToTarget = target.get() - location.get()
    const friction = frictionLimit.clamp(diffToEdge / edgeOffsetTolerance)

    target.subtract(diffToTarget * friction)

    if (!pointerDown && mathAbs(diffToTarget) < pullBackThreshold) {
      target.set(clamp(target.get()))
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
