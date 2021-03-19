import { CounterType } from './counter'
import { LimitType } from './limit'
import { Vector1DType } from './vector1d'

export type TargetType = {
  distance: number
  index: number
}

export type ScrollTargetType = {
  byIndex: (target: number, direction: number) => TargetType
  byDistance: (force: number, snap: boolean) => TargetType
  shortcut: (target: number, direction: number) => number
}

export function ScrollTarget(
  indexCurrent: CounterType,
  loop: boolean,
  scrollSnaps: number[],
  contentSize: number,
  limit: LimitType,
  targetVector: Vector1DType,
): ScrollTargetType {
  const { reachedMax, reachedAny, removeOffset } = limit

  function minDistance(d1: number, d2: number): number {
    return Math.abs(d1) < Math.abs(d2) ? d1 : d2
  }

  function findTargetSnap(target: number): TargetType {
    const distance = removeOffset(target)
    const ascDiffsToSnaps = scrollSnaps
      .map((scrollSnap) => scrollSnap - distance)
      .map((diffToSnap) => shortcut(diffToSnap, 0))
      .map((diff, i) => ({ diff, index: i }))
      .sort((d1, d2) => Math.abs(d1.diff) - Math.abs(d2.diff))

    const { index } = ascDiffsToSnaps[0]
    return { index, distance }
  }

  function shortcut(target: number, direction: number): number {
    const t1 = target
    const t2 = target + contentSize
    const t3 = target - contentSize

    if (!loop) return t1
    if (!direction) return minDistance(minDistance(t1, t2), t3)

    const shortest = minDistance(t1, direction === 1 ? t2 : t3)
    return Math.abs(shortest) * direction
  }

  function findTargetIndex(target: number, index: number): number {
    const reachedBound = !loop && reachedAny(target)
    if (!reachedBound) return index

    const { min, max } = indexCurrent
    return reachedMax(target) ? min : max
  }

  function byIndex(index: number, direction: number): TargetType {
    const diffToSnap = scrollSnaps[index] - targetVector.get()
    const distance = shortcut(diffToSnap, direction)
    return { index, distance }
  }

  function byDistance(distance: number, snap: boolean): TargetType {
    const target = targetVector.get() + distance
    const targetSnap = findTargetSnap(target)
    const index = findTargetIndex(target, targetSnap.index)
    const reachedBound = !loop && reachedAny(target)

    if (!snap || reachedBound) return { index, distance }

    const diffToSnap = scrollSnaps[index] - targetSnap.distance
    const snapDistance = distance + shortcut(diffToSnap, 0)

    return { index, distance: snapDistance }
  }

  const self: ScrollTargetType = {
    byDistance,
    byIndex,
    shortcut,
  }
  return self
}
