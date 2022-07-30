import { LimitType } from './Limit'
import { Vector1DType } from './Vector1d'
import { mathAbs, mathSign } from './utils'

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

  function minDistance(distances: number[]): number {
    return distances.concat().sort((a, b) => mathAbs(a) - mathAbs(b))[0]
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
    const targets = [target, target + contentSize, target - contentSize]

    if (!loop) return targets[0]
    if (!direction) return minDistance(targets)

    const matchingTargets = targets.filter((t) => mathSign(t) === direction)
    return minDistance(matchingTargets)
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
