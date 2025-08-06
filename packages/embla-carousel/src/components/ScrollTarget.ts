import { LimitType } from './Limit'
import { ScrollOptimizerType } from './ScrollOptimizer'
import { DirectionType } from './ScrollTo'
import { ScrollSnapListType } from './ScrollSnapList'
import { Vector1D, Vector1DType } from './Vector1d'
import { arrayLast, mathAbs, mathSign } from './utils'

export type TargetType = {
  distance: number
  index: number
}

export type ScrollTargetType = {
  byIndex: (target: number, direction: DirectionType) => TargetType
  byDistance: (force: number, snap: boolean) => TargetType
  shortcut: (target: number, direction: DirectionType) => number
}

export function ScrollTarget(
  loop: boolean,
  scrollSnaps: number[],
  scrollOptimizer: ScrollOptimizerType,
  contentSize: number,
  limit: LimitType,
  targetVector: Vector1DType,
  offsetLocation: Vector1DType,
  scrollSnapList: ScrollSnapListType
): ScrollTargetType {
  const { snapBySlideIndex } = scrollSnapList
  const { getSlidesInViewRange } = scrollOptimizer
  const { reachedAny, removeOffset, constrain } = limit

  function minDistance(distances: number[]): number {
    return distances.sort((a, b) => mathAbs(a) - mathAbs(b))[0]
  }

  function findTargetSnap(target: number): TargetType {
    const slidesInRange = getSlidesInViewRange(offsetLocation, Vector1D(target))
    const distance = loop ? removeOffset(target) : constrain(target)
    const ascDiffsToSnaps = slidesInRange
      .map((slideIndex) => {
        const index = snapBySlideIndex[slideIndex]
        const scrollSnap = scrollSnaps[index]
        return { diff: shortcut(scrollSnap - distance, 0), index }
      })
      .sort((d1, d2) => mathAbs(d1.diff) - mathAbs(d2.diff))

    const { index } = ascDiffsToSnaps[0]
    return { index, distance }
  }

  function shortcut(target: number, direction: DirectionType): number {
    if (!loop) return target

    const targets = [target, target + contentSize, target - contentSize]
    if (!direction) return minDistance(targets)

    const matchingTargets = targets.filter((t) => mathSign(t) === direction)
    if (matchingTargets.length) return minDistance(matchingTargets)
    return arrayLast(targets) - contentSize
  }

  function byIndex(index: number, direction: DirectionType): TargetType {
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
    shortcut
  }
  return self
}
