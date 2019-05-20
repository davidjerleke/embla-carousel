import { Counter } from './counter'
import { Direction } from './direction'
import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  diffSizes: number[]
  dragFree: boolean
  location: Vector1D
  index: Counter
  loop: boolean
  groupSizes: number[]
  groupPositions: number[]
  span: number
  limit: Limit
  target: Vector1D
}

type Bound = {
  start: number
  end: number
}

export type Target = {
  distance: number
  index: number
}

export type TargetFinder = {
  byIndex: (target: number, direction: number) => Target
  byDistance: (from: number, distance: number) => Target
}

export function TargetFinder(params: Params): TargetFinder {
  const { location, loop, groupPositions, span } = params
  const slideBounds = getSlideBounds()

  function getSlideBounds(): Bound[] {
    const { groupSizes } = params
    const startAt = groupPositions[0] + groupSizes[0] / 2

    return groupSizes.map((size, index) => {
      const sizes = groupSizes.slice(0, index)
      const start = sizes.reduce((a, i) => a - i, startAt)
      const end = start - size
      return { end, start }
    })
  }

  function offsetToSlide(target: Target): number {
    const { distance, index } = target
    const lastSlide = groupPositions[params.index.max]
    const pastLastSlide = distance < lastSlide
    const addOffset = loop && pastLastSlide && index === 0
    const offset = addOffset ? distance + span : distance
    return groupPositions[index] - offset
  }

  function findTarget(desired: number, direction: number): Target {
    const { reachedMin, reachedMax } = params.limit
    let distance = desired

    if (direction === 1) {
      while (reachedMax(distance)) distance -= span
    }
    if (direction === -1) {
      while (reachedMin(distance)) distance += span
    }

    const index = slideBounds.reduce((a, b, i) => {
      const { start, end } = b
      return distance < start && distance > end ? i : a
    }, 0)
    return { distance, index }
  }

  function freeDistance(from: number, force: number): Target {
    const targetDistance = location.get() + force
    const distance = location.get() + force - from
    const direction = Direction(distance).get()
    const { index } = findTarget(targetDistance, direction)
    return { distance, index }
  }

  function minDistance(d1: number, d2: number): number {
    return Math.abs(d1) < Math.abs(d2) ? d1 : d2
  }

  function byIndex(index: number, direction: number): Target {
    const target = params.target.get()
    const counter = params.index.clone()
    const slidePosition = groupPositions[index]

    if (!loop) {
      const distance = slidePosition - target
      return { distance, index }
    } else {
      if (direction === -1) {
        const d = -params.diffSizes[counter.get()]
        return { distance: d, index }
      }
      if (direction === 1) {
        const d = params.diffSizes[counter.add(-1).get()]
        return { distance: d, index }
      }
      const d1 = slidePosition - target
      const d2 = span + slidePosition - target
      const d3 = slidePosition - span - target
      const distance = minDistance(minDistance(d1, d2), d3)
      return { distance, index }
    }
  }

  function byDistance(from: number, force: number): Target {
    const { dragFree } = params
    const targetDistance = location.get() + force
    const { reachedAny, reachedMax } = params.limit

    if (!loop && reachedAny(targetDistance)) {
      const { min, max } = params.index.clone()
      const index = reachedMax(targetDistance) ? min : max
      const { distance } = freeDistance(from, force)
      return { distance, index }
    } else {
      if (dragFree) return freeDistance(from, force)
      const targetVector = params.target.get()
      const direction = Direction(force).get()
      const target = findTarget(targetDistance, direction)
      const offset = offsetToSlide(target)
      const distance = targetDistance + offset - targetVector
      const { index } = target
      return { distance, index }
    }
  }

  const self: TargetFinder = {
    byDistance,
    byIndex,
  }
  return Object.freeze(self)
}
