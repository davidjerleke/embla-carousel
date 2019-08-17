import { Alignments } from './alignSize'
import { Counter } from './counter'
import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  align: Alignments
  dragFree: boolean
  index: Counter
  loop: boolean
  snapSizes: number[]
  scrollSnaps: number[]
  contentSize: number
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

export type ScrollTarget = {
  byIndex: (target: number, direction: number) => Target
  byDistance: (force: number) => Target
}

export function ScrollTarget(params: Params): ScrollTarget {
  const { loop, limit, scrollSnaps, contentSize } = params
  const { reachedMin, reachedMax, reachedAny } = limit
  const snapBounds = calculateSnapBounds()

  function calculateSnapBounds(): Bound[] {
    const { align, snapSizes } = params
    const counter = params.index.clone()

    return snapSizes.reduce((bounds: Bound[], size, i) => {
      const next = counter.set(i).add(align === 'end' ? 1 : 0)
      const end = scrollSnaps[i] - snapSizes[next.get()] / 2
      const start = !i ? scrollSnaps[0] : bounds[i - 1].end
      return bounds.concat([{ start, end }])
    }, [])
  }

  function offsetToSnap(target: Target): number {
    const { distance, index } = target
    const lastSnap = scrollSnaps[params.index.max]
    const addOffset = loop && distance < lastSnap && index === 0
    const offset = addOffset ? distance + contentSize : distance
    return scrollSnaps[index] - offset
  }

  function findTargetSnapAt(distance: number): Target {
    while (reachedMax(distance)) distance -= contentSize
    while (reachedMin(distance)) distance += contentSize
    const foundIndex = snapBounds.reduce((a, b, i) => {
      return distance < b.start && distance > b.end ? i : a
    }, 0)
    return { distance, index: foundIndex }
  }

  function minDistance(d1: number, d2: number): number {
    return Math.abs(d1) < Math.abs(d2) ? d1 : d2
  }

  function byIndex(index: number, direction: number): Target {
    const targetVector = params.target.get()
    const distanceToSnap = scrollSnaps[index] - targetVector
    const target = { distance: distanceToSnap, index }

    if (loop) {
      const d1 = distanceToSnap
      const d2 = contentSize + distanceToSnap
      const d3 = distanceToSnap - contentSize

      if (direction && params.index.max === 1) {
        const shortest = minDistance(d1, direction === 1 ? d2 : d3)
        target.distance = Math.abs(shortest) * direction
      } else {
        target.distance = minDistance(minDistance(d1, d2), d3)
      }
    }
    return target
  }

  function byDistance(force: number): Target {
    const { target, dragFree, index } = params
    const distance = target.get() + force
    const targetSnap = findTargetSnapAt(distance)
    const reachedEdge = !loop && reachedAny(distance)

    if (reachedEdge || dragFree) {
      const { min, max } = index
      const edgeIndex = reachedMax(distance) ? min : max
      const targetIndex = reachedEdge ? edgeIndex : targetSnap.index
      return { distance: force, index: targetIndex }
    } else {
      const currentSnap = { distance, index: index.get() }
      const snapPoint = force === 0 ? currentSnap : targetSnap
      const snapDistance = force + offsetToSnap(snapPoint)
      return { distance: snapDistance, index: snapPoint.index }
    }
  }

  const self: ScrollTarget = {
    byDistance,
    byIndex,
  }
  return Object.freeze(self)
}
