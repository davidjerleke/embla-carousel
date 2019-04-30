import { Counter } from './counter'
import { Direction } from './direction'
import { Limit } from './limit'
import { Vector1D } from './vector1d'

type IsFound = (current: Target) => boolean

type Params = {
  location: Vector1D
  index: Counter
  diffDistances: number[]
  loop: boolean
  slideSizes: number[]
  slidePositions: number[]
  span: number
  limit: Limit
}

export type Target = {
  index: number
  distance: number
}

export type TargetFinder = {
  byIndex: (target: number, direction: number) => Target
  byDistance: (from: number, distance: number) => Target
}

export function TargetFinder(params: Params): TargetFinder {
  const { location, diffDistances, loop, slideSizes } = params
  let lastInteractionIsDrag = false

  function findTarget(found: IsFound, direction: number): Target {
    const counter = params.index.clone()
    const indexDiff = direction === -1 ? 0 : -1

    function accumulate(distance: number): Target {
      const index = counter.get()
      const nextIndex = counter.clone().add(indexDiff)
      const nextDistance = diffDistances[nextIndex.get()]
      const targetDistance = distance * direction
      counter.add(direction * -1)

      return !found({ distance, index })
        ? accumulate(distance + nextDistance)
        : { index, distance: targetDistance }
    }
    return accumulate(0)
  }

  function indexFound(target: number): IsFound {
    return ({ index }: Target): boolean => {
      return index === target
    }
  }

  function distanceFound(target: number): IsFound {
    return ({ index, distance }: Target): boolean => {
      return distance + slideSizes[index] / 2 >= target
    }
  }

  function byIndex(target: number, direction: number): Target {
    const index = params.index.clone()
    const currentIndex = index.get()
    const targetIndex = index.set(target)
    const isFound = indexFound(targetIndex.get())

    // TECH DEBT ---->
    // This finds distance offset from the closest slide position.
    // Works for both loop and not loop.
    const { slidePositions } = params
    let distanceToSlide = 0
    if (lastInteractionIsDrag) {
      const offset =
        loop &&
        location.get() < slidePositions[slidePositions.length - 1] &&
        currentIndex === 0
          ? location.get() + params.span
          : location.get()

      distanceToSlide = slidePositions[currentIndex] - offset
      lastInteractionIsDrag = false
    }
    // <---- TECH DEBT

    if (!loop || index.max <= 1) {
      const t = findTarget(isFound, direction)
      return {
        distance: t.distance + distanceToSlide,
        index: t.index,
      }
    } else {
      const d1 = findTarget(isFound, -1).distance + distanceToSlide
      const d2 = findTarget(isFound, 1).distance + distanceToSlide
      const distance = Math.abs(d1) > Math.abs(d2) ? d2 : d1
      return { index: target, distance }
    }
  }

  function byDistance(from: number, distance: number): Target {
    // TECH DEBT ---->
    // Don't restrict to a specific slide position if drag will
    // reach any end of the carousel.
    if (!loop) {
      const targetLocation = location.get() + distance
      const reachedMinLimit = params.limit.reachedMin(targetLocation)
      const reachedMaxLimit = params.limit.reachedMax(targetLocation)

      if (reachedMaxLimit || reachedMinLimit) {
        const nextIndex = reachedMaxLimit
          ? params.index.min
          : params.index.max
        const next = freeScroll(from, distance)
        next.index = nextIndex
        return next
      }
    }
    // <---- TECH DEBT

    const index = params.index.get()
    const slideSize = slideSizes[index]
    const desiredDiff = location.get() + distance - from
    const direction = Direction(desiredDiff).get()
    const minDiff = slideSize * direction
    const diffBelowSlide = Math.abs(desiredDiff) < slideSize
    const allowedDiff = diffBelowSlide ? minDiff : desiredDiff
    const isFound = distanceFound(Math.abs(allowedDiff))
    return findTarget(isFound, direction)
  }

  // TECH DEBT ---->
  // Not used yet. Upcoming freeScroll feature.
  // Finds index by any given carousel location.
  function findTargetIndexByLocation(
    desiredTarget: number,
    direction: number,
  ): number {
    const { slidePositions } = params
    let target = desiredTarget

    if (direction === 1) {
      while (params.limit.reachedMax(target)) {
        target -= params.span
      }
    }
    if (direction === -1) {
      while (params.limit.reachedMin(target)) {
        target += params.span
      }
    }

    type Boundary = { low: number; high: number }
    const boundaries: Boundary[] = []
    let startPos = slidePositions[0] + slideSizes[0] / 2

    for (let i = 0; i < slidePositions.length; i += 1) {
      ;(() => {
        boundaries.push({
          high: startPos - slideSizes[i],
          low: startPos,
        })
        startPos = startPos - slideSizes[i]
      })()
    }

    const targetIndex = boundaries.reduce(
      (result: number, boundary: Boundary, index: number) => {
        if (result) return result
        return target < boundary.low && target > boundary.high
          ? index
          : 0
      },
      0,
    )
    return targetIndex
  }

  function freeScroll(from: number, distance: number): Target {
    lastInteractionIsDrag = true
    const desiredDiff = location.get() + distance - from
    const direction = Direction(desiredDiff).get()

    const i = findTargetIndexByLocation(
      location.get() + distance,
      direction,
    )
    return {
      distance: location.get() + distance - from,
      index: i,
    }
  }
  // <---- TECH DEBT

  const self: TargetFinder = {
    byDistance,
    byIndex,
  }
  return Object.freeze(self)
}
