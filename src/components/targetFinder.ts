import { Counter } from './counter'
import { Direction } from './direction'
import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  location: Vector1D
  index: Counter
  loop: boolean
  slideSizes: number[]
  slidePositions: number[]
  span: number
  limit: Limit
  target: Vector1D
}

export type Target = {
  index: number
  distance: number
}

export type TargetFinder = {
  byIndex: (target: number) => Target
  byDistance: (from: number, distance: number) => Target
}

export function TargetFinder(params: Params): TargetFinder {
  const { location, loop, slideSizes } = params

  function shortestDistance(d1: number, d2: number): number {
    return Math.abs(d1) < Math.abs(d2) ? d1 : d2
  }

  function byIndex(index: number): Target {
    const { slidePositions, span } = params
    const target = params.target.get()
    const counter = params.index.clone()
    const slidePosition = slidePositions[index]

    if (!loop || counter.max <= 1) {
      const distance = slidePosition - target
      return { distance, index }
    } else {
      const d1 = slidePosition - target
      const d2 = span + slidePosition - target
      const d3 = slidePosition - span - target
      const distance = shortestDistance(shortestDistance(d1, d2), d3)
      return { distance, index }
    }
  }

  function byDistance(from: number, distance: number): Target {
    const targetDistance = location.get() + distance

    if (!loop) {
      const { min, max } = params.index.clone()
      const { reachedAny, reachedMax } = params.limit

      if (reachedAny(targetDistance)) {
        const reachedMaxLimit = reachedMax(targetDistance)
        const index = reachedMaxLimit ? min : max
        const next = freeScroll(from, distance)
        return { distance: next.distance, index }
      }
    }

    // FREE SCROLL FUNCTIONALITY
    // const next = freeScroll(from, distance)
    // return next

    // CLEAN UP -------->
    const targetVector = params.target.get()
    const direction = Direction(distance).get()
    const t = getTargetByDistance(targetDistance, direction)
    const offsetToSlide = getOffsetToSnapPoint(t.distance, t.index)

    const test = targetDistance + offsetToSlide - targetVector

    return { distance: test, index: t.index }
    // <-------- CLEAN UP
  }

  // CLEAN UP -------->
  function getOffsetToSnapPoint(loc: number, index: number) {
    const { slidePositions, span } = params
    const lastIndex = params.index.max
    const lastSlidePosition = slidePositions[lastIndex]
    const offset =
      loop && loc < lastSlidePosition && index === 0
        ? loc + span
        : loc

    return slidePositions[index] - offset
  }

  function getTargetByDistance(
    desiredTarget: number,
    direction: number,
  ): Target {
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

    return { distance: target, index: targetIndex }
  }

  function freeScroll(from: number, distance: number): Target {
    const desiredDiff = location.get() + distance - from
    const direction = Direction(desiredDiff).get()
    const i = getTargetByDistance(
      location.get() + distance,
      direction,
    )

    return {
      distance: location.get() + distance - from,
      index: i.index,
    }
  }
  // <-------- CLEAN UP

  const self: TargetFinder = {
    byDistance,
    byIndex,
  }
  return Object.freeze(self)
}
