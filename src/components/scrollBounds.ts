import { Animation } from './animation'
import { Limit } from './limit'
import { ScrollBody } from './scrollBody'
import { Vector1D } from './vector1d'

type Params = {
  limit: Limit
  location: Vector1D
  scrollBody: ScrollBody
  animation: Animation
  tolerance: number
}

export type ScrollBounds = {
  constrain: (v: Vector1D) => void
}

export function ScrollBounds(params: Params): ScrollBounds {
  const { limit, location, scrollBody, animation, tolerance } = params
  const { min, max, reachedMin, reachedMax } = limit
  const state = { timeout: 0 }

  function shouldConstrain(v: Vector1D): boolean {
    if (state.timeout) return false
    if (reachedMin(location.get())) return v.get() !== min
    if (reachedMax(location.get())) return v.get() !== max
    return false
  }

  function constrain(v: Vector1D): void {
    if (!shouldConstrain(v)) return

    state.timeout = window.setTimeout(() => {
      const constraint = limit.constrain(v.get())
      v.set(constraint)
      scrollBody.useSpeed(10).useMass(3)
      animation.start()
      state.timeout = 0
    }, tolerance)
  }

  const self: ScrollBounds = {
    constrain,
  }
  return Object.freeze(self)
}
