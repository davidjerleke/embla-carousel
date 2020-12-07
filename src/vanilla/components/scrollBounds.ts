import { Limit } from './limit'
import { ScrollBody } from './scrollBody'
import { Vector1D } from './vector1d'

type Params = {
  limit: Limit
  location: Vector1D
  scrollBody: ScrollBody
}

export type ScrollBounds = {
  constrain: (v: Vector1D, pointerDown: boolean) => void
  toggleActive: (active: boolean) => void
}

export function ScrollBounds(params: Params): ScrollBounds {
  const { limit, location, scrollBody } = params
  const pullBackThreshold = 10
  let disabled = false

  function shouldConstrain(target: Vector1D): boolean {
    if (disabled) return false
    if (!limit.reachedAny(target.get())) return false
    if (!limit.reachedAny(location.get())) return false
    return true
  }

  function constrain(target: Vector1D, pointerDown: boolean): void {
    if (!shouldConstrain(target)) return
    const friction = pointerDown ? 0.7 : 0.4
    const diffToTarget = target.get() - location.get()

    target.subtract(diffToTarget * friction)

    if (!pointerDown && Math.abs(diffToTarget) < pullBackThreshold) {
      target.set(limit.constrain(target.get()))
      scrollBody.useSpeed(10).useMass(3)
    }
  }

  function toggleActive(active: boolean): void {
    disabled = !active
  }

  const self: ScrollBounds = {
    constrain,
    toggleActive,
  }
  return self
}
