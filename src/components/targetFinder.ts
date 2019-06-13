import { Counter } from './counter'
import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  diffSizes: number[]
  dragFree: boolean
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
  byDistance: (force: number) => Target
}

export function TargetFinder(params: Params): TargetFinder {
  const { loop, groupPositions, span } = params
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

  function offsetToTargetGroup(target: Target): number {
    const { distance, index } = target
    const lastGroup = groupPositions[params.index.max]
    const pastLastGroup = distance < lastGroup
    const addOffset = loop && pastLastGroup && index === 0
    const offset = addOffset ? distance + span : distance
    return groupPositions[index] - offset
  }

  function findTargetGroupAt(targetDistance: number): Target {
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

  function byDistance(force: number): Target {
    const { target, dragFree, limit, index } = params
    const { reachedAny, reachedMax } = limit
    const targetDistance = target.get() + force
    const targetGroup = findTargetGroupAt(targetDistance)
    const reachedEdge = !loop && reachedAny(targetDistance)

    if (reachedEdge || dragFree) {
      const { min, max } = index
      const edgeIndex = reachedMax(targetDistance) ? min : max
      const targetIndex = reachedEdge ? edgeIndex : targetGroup.index
      return { distance: force, index: targetIndex }
    } else {
      const offset = offsetToTargetGroup(targetGroup)
      const snapDistance = targetDistance + offset - target.get()
      return { distance: snapDistance, index: targetGroup.index }
    }
  }

  const self: TargetFinder = {
    byDistance,
    byIndex,
  }
  return Object.freeze(self)
}
