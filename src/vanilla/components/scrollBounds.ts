import { Animation } from './animation'
import { Limit } from './limit'
import { ScrollBody } from './scrollBody'
import { Vector1D } from './vector1d'

type Params = {
  limit: Limit
  location: Vector1D
  scrollBody: ScrollBody
  animation: Animation
}

export type ScrollBounds = {
  constrain: (v: Vector1D) => void
  toggleActive: (active: boolean) => void
}

export function ScrollBounds(params: Params): ScrollBounds {
  const { limit, location, scrollBody, animation } = params
  const { min, max } = limit
  const tolerance = 70
  const edgeLimit = Limit({
    min: min - tolerance,
    max: max + tolerance,
  })

  let disabled = false
  let timeout = 0

  function shouldConstrain(target: Vector1D): boolean {
    if (disabled) return false
    if (!limit.reachedAny(location.get())) return false
    if (target.get() === min || target.get() === max) return false
    return true
  }

  function constrain(target: Vector1D): void {
    if (!shouldConstrain(target)) return
    target.set(edgeLimit.constrain(target.get()))

    if (!timeout) {
      timeout = window.setTimeout(() => {
        target.set(limit.constrain(target.get()))
        scrollBody.useSpeed(10).useMass(3)
        animation.start()
        timeout = 0
      }, tolerance)
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
