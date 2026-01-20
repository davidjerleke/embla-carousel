import { LimitType } from './Limit'
import { DirectionType } from './ScrollTo'
import { NumberStoreType } from './NumberStore'
import { arrayLast, mathAbs, mathSign } from './utils'

export type TargetType = {
  distance: number
  index: number
}

export type ScrollTargetType = {
  byIndex: (target: number, direction: DirectionType) => TargetType
  byDistance: (force: number, snapToClosest: boolean) => TargetType
  shortcut: (target: number, direction: DirectionType) => number
}

export function ScrollTarget(
  loop: boolean,
  scrollSnaps: number[],
  contentSize: number,
  limit: LimitType,
  targetVector: NumberStoreType
): ScrollTargetType {
  const { pastAnyBound, removeOffset, clamp } = limit

  function minDistance(distances: number[]): number {
    return distances.sort((a, b) => mathAbs(a) - mathAbs(b))[0]
  }

  function getClosestSnap(target: number): TargetType {
    const distance = loop ? removeOffset(target) : clamp(target)
    const { index } = scrollSnaps.reduce(
      (result, snap, snapIndex) => {
        const displacementAbs = mathAbs(shortcut(snap - distance, 0))
        if (displacementAbs >= result.smallestDisplacement) return result
        return { smallestDisplacement: displacementAbs, index: snapIndex }
      },
      { smallestDisplacement: Infinity, index: 0 }
    )

    return { index, distance }
  }

  function shortcut(target: number, direction: DirectionType): number {
    if (!loop) return target

    const targets = [target, target + contentSize, target - contentSize]
    if (!direction) return minDistance(targets)

    const validTargets = targets.filter((t) => mathSign(t) === direction)
    if (validTargets.length) return minDistance(validTargets)
    return arrayLast(targets) - contentSize
  }

  function byIndex(index: number, direction: DirectionType): TargetType {
    const diffToSnap = scrollSnaps[index] - targetVector.get()
    const distance = shortcut(diffToSnap, direction)
    return { index, distance }
  }

  function byDistance(distance: number, snapToClosest: boolean): TargetType {
    const target = targetVector.plus(distance)
    const { index, distance: targetSnapDistance } = getClosestSnap(target)
    const isPastAnyBound = !loop && pastAnyBound(target)

    if (!snapToClosest || isPastAnyBound) return { index, distance }

    const diffToSnap = scrollSnaps[index] - targetSnapDistance
    const snapDistance = distance + shortcut(diffToSnap, 0)

    return { index, distance: snapDistance }
  }

  const self: ScrollTargetType = {
    byDistance,
    byIndex,
    shortcut
  }
  return self
}
