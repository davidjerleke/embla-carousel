import { Counter } from './counter'
import { Direction } from './direction'
import { Limit } from './limit'
import { Vector1D } from './vector1d'

type Params = {
  location: Vector1D
  index: Counter
  diffDistances: number[]
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
  byIndex: (target: number, direction: number) => Target
  byDistance: (from: number, distance: number) => Target
}

export function TargetFinder(params: Params): TargetFinder {
  const { location, diffDistances, loop, slideSizes } = params

  console.log(params.slidePositions)

  function findTarget(target: number, direction: number): number {
    const counter = params.index.clone()
    const indexDiff = direction === -1 ? 0 : -1

    function accumulate(distance: number): number {
      const index = counter.get()
      const nextIndex = counter.clone().add(indexDiff)
      const distanceToNext = diffDistances[nextIndex.get()]
      counter.add(direction * -1)

      return index === target
        ? distance * direction
        : accumulate(distance + distanceToNext)
    }
    return accumulate(0)
  }

  function byIndex(target: number, direction: number): Target {
    const index = params.index.clone()

    if (!loop || index.max <= 1) {
      const distance = findTarget(target, direction)

      const t = getTargetByDistance(
        location.get() + distance,
        direction,
      )
      const offsetToSlide = findDistanceToSnapPoint(
        t.distance,
        target,
      )
      const test =
        location.get() +
        distance +
        offsetToSlide -
        params.target.get()

      const d =
        params.target.get() === params.slidePositions[target]
          ? 0
          : test

      return { distance: d, index: target }
    } else {
      // DO SAME HERE AS ABOVE
      const d1 = findTarget(target, -1) //+ offsetToSlide
      const d2 = findTarget(target, 1) //+ offsetToSlide
      const distance = Math.abs(d1) > Math.abs(d2) ? d2 : d1
      return { index: target, distance }
    }
  }

  function byDistance(from: number, distance: number): Target {
    if (!loop) {
      const { index, limit } = params
      const target = location.get() + distance
      const reachedAnyLimit = limit.reachedAny(target)

      if (reachedAnyLimit) {
        const reachedMaxLimit = limit.reachedMax(target)
        const nextIndex = reachedMaxLimit ? index.min : index.max
        const next = freeScroll(from, distance)
        return { index: nextIndex, distance: next.distance }
      }
    }

    console.log(distance)

    const direction = Direction(distance).get()
    const target = getTargetByDistance(
      location.get() + distance,
      direction,
    )
    const offsetToSlide = findDistanceToSnapPoint(
      target.distance,
      target.index,
    )

    const test =
      location.get() + distance + offsetToSlide - params.target.get()

    return {
      distance: test,
      index: target.index,
    }
  }

  // TECH DEBT ---->
  // Not used yet. Upcoming freeScroll feature.
  // Finds index by any given carousel location.
  function findDistanceToSnapPoint(location: number, index: number) {
    const { slidePositions, span } = params
    const lastIndex = params.index.max
    const lastSlidePosition = slidePositions[lastIndex]
    const offset =
      loop && location < lastSlidePosition && index === 0
        ? location + span
        : location

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
    return {
      index: targetIndex,
      distance: target,
    }
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
  // <---- TECH DEBT

  const self: TargetFinder = {
    byDistance,
    byIndex,
  }
  return Object.freeze(self)
}
