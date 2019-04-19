import { Counter } from './counter'
import { Direction } from './direction'
import { Vector1D } from './vector1d'

type IsFound = (current: Target) => boolean

type Params = {
  location: Vector1D
  index: Counter
  diffDistances: number[]
  loop: boolean
  slideSizes: number[]
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
  const self = {} as TargetFinder
  const { location, diffDistances, loop, slideSizes } = params

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
    const targetIndex = index.set(target)
    const isFound = indexFound(targetIndex.get())

    if (!loop || index.max <= 1) {
      return findTarget(isFound, direction)
    } else {
      const d1 = findTarget(isFound, -1).distance
      const d2 = findTarget(isFound, 1).distance
      const distance = Math.abs(d1) > Math.abs(d2) ? d2 : d1
      return { index: target, distance }
    }
  }

  function byDistance(from: number, distance: number): Target {
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

  return Object.assign(self, {
    byDistance,
    byIndex,
  })
}
