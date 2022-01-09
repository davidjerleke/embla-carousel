import { LimitType } from './Limit'
import { Vector1DType } from './Vector1d'
import { mathAbs } from './utils'

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
  loop: boolean,
  scrollSnaps: number[],
  contentSize: number,
  limit: LimitType,
  targetVector: Vector1DType,
): ScrollTargetType {
  const { reachedAny, removeOffset, constrain } = limit

  function minDistance(d1: number, d2: number): number {
    return mathAbs(d1) < mathAbs(d2) ? d1 : d2
  }

  function findTargetSnap(target: number): TargetType {
    const distance = loop ? removeOffset(target) : constrain(target)
    const ascDiffsToSnaps = scrollSnaps
      .map((scrollSnap) => scrollSnap - distance)
      .map((diffToSnap) => shortcut(diffToSnap, 0))
      .map((diff, i) => ({ diff, index: i }))
      .sort((d1, d2) => mathAbs(d1.diff) - mathAbs(d2.diff))

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
    return mathAbs(shortest) * direction
  }

  function byIndex(index: number, direction: number): TargetType {
    const diffToSnap = scrollSnaps[index] - targetVector.get()
    const distance = shortcut(diffToSnap, direction)
    return { index, distance }
  }

  function byDistance(distance: number, snap: boolean): TargetType {
    const target = targetVector.get() + distance
    const { index, distance: targetSnapDistance } = findTargetSnap(target)
    const reachedBound = !loop && reachedAny(target)

    if (!snap || reachedBound) return { index, distance }

    const diffToSnap = scrollSnaps[index] - targetSnapDistance
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
