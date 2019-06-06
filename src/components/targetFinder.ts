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
  const groupBounds = calculateGroupBounds()

  function calculateGroupBounds(): Bound[] {
    const { groupSizes } = params
    const startAt = groupPositions[0] + groupSizes[0] / 2

    return groupSizes.map((size, index) => {
      const sizes = groupSizes.slice(0, index)
      const start = sizes.reduce((a, i) => a - i, startAt)
      const end = start - size
      return { end, start }
    })
  }

  function offsetToGroupPosition(target: Target): number {
    const { distance, index } = target
    const lastGroup = groupPositions[params.index.max]
    const pastLastGroup = distance < lastGroup
    const addOffset = loop && pastLastGroup && index === 0
    const offset = addOffset ? distance + span : distance
    return groupPositions[index] - offset
  }

  function findTargetAt(targetDistance: number): Target {
    const { reachedMin, reachedMax } = params.limit
    let distance = targetDistance
    while (reachedMax(distance)) distance -= span
    while (reachedMin(distance)) distance += span
    const index = groupBounds.reduce(
      (a, b, i) => (distance < b.start && distance > b.end ? i : a),
      0,
    )
    return { distance, index }
  }

  function freeDistance(from: number, force: number): Target {
    const targetDistance = location.get() + force
    const distance = location.get() + force - from
    const { index } = findTargetAt(targetDistance)
    return { distance, index }
  }

  function minDistance(d1: number, d2: number): number {
    return Math.abs(d1) < Math.abs(d2) ? d1 : d2
  }

  function byIndex(index: number, direction: number): Target {
    const target = params.target.get()
    const distanceToGroup = groupPositions[index] - target

    if (!loop) {
      const distance = distanceToGroup
      return { distance, index }
    } else {
      const d1 = distanceToGroup
      const d2 = span + distanceToGroup
      const d3 = distanceToGroup - span

      if (direction && params.index.max === 1) {
        const shortest = minDistance(d1, direction === 1 ? d2 : d3)
        const distance = Math.abs(shortest) * direction
        return { distance, index }
      } else {
        const distance = minDistance(minDistance(d1, d2), d3)
        return { distance, index }
      }
    }
  }

  function byDistance(from: number, force: number): Target {
    const { target, dragFree } = params
    const forceAbs = Math.abs(force)
    const halfGroup = params.groupSizes[params.index.get()] / 2
    const minForce =
      !dragFree && forceAbs > 1 && forceAbs < halfGroup
        ? halfGroup * Direction(force).get()
        : force

    const targetDistance = location.get() + minForce
    const { reachedAny, reachedMax } = params.limit

    if (!loop && reachedAny(targetDistance)) {
      const { min, max } = params.index
      const index = reachedMax(targetDistance) ? min : max
      const { distance } = freeDistance(from, force)
      return { distance, index }
    } else {
      if (dragFree) return freeDistance(from, force)
      const targetGroup = findTargetAt(targetDistance)
      const offset = offsetToGroupPosition(targetGroup)
      const distance = targetDistance + offset - target.get()
      const { index } = targetGroup
      return { distance, index }
    }
  }

  const self: TargetFinder = {
    byDistance,
    byIndex,
  }
  return Object.freeze(self)
}
