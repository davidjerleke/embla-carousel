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

type Boundary = {
  start: number
  end: number
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
  const { location, loop, slideSizes, slidePositions, span } = params
  const boundaries: Boundary[] = getSlideBoundaries()

  function shortestDistance(d1: number, d2: number): number {
    return Math.abs(d1) < Math.abs(d2) ? d1 : d2
  }

  function getSlideBoundaries(): Boundary[] {
    const startAt = slidePositions[0] + slideSizes[0] / 2
    return slideSizes.map((slideSize, index) => {
      const sizes = slideSizes.slice(0, index)
      const start = sizes.reduce((a, i) => a - i, startAt)
      const end = start - slideSize
      return { end, start }
    })
  }

  function byIndex(index: number): Target {
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
        const index = reachedMax(targetDistance) ? min : max
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
    const offsetToSlide = getOffsetToSlide(t.distance, t.index)

    const test = targetDistance + offsetToSlide - targetVector

    return { distance: test, index: t.index }
    // <-------- CLEAN UP
  }

  // CLEAN UP -------->
  function getOffsetToSlide(loc: number, index: number): number {
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
    let distance = desiredTarget

    if (direction === 1) {
      while (params.limit.reachedMax(distance)) {
        distance -= span
      }
    }
    if (direction === -1) {
      while (params.limit.reachedMin(distance)) {
        distance += span
      }
    }

    const index = boundaries.reduce(
      (foundIndex: number, boundary: Boundary, i: number) => {
        if (foundIndex) return foundIndex
        const { start, end } = boundary
        return distance < start && distance > end ? i : 0
      },
      0,
    )

    return { distance, index }
  }

  function freeScroll(from: number, force: number): Target {
    const targetDistance = location.get() + force
    const distance = location.get() + force - from
    const direction = Direction(distance).get()
    const { index } = getTargetByDistance(targetDistance, direction)
    return { distance, index }
  }
  // <-------- CLEAN UP

  const self: TargetFinder = {
    byDistance,
    byIndex,
  }
  return Object.freeze(self)
}
