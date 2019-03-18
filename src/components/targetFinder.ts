import { Counter } from './counter'
import { Direction } from './direction'
import { Vector1D } from './vector1d'

type IsFound = (current: Target) => boolean

interface Params {
  location: Vector1D
  index: Counter
  diffDistances: number[]
  loop: boolean
}

export interface Target {
  index: number
  distance: number
}

export interface TargetFinder {
  byIndex(target: number, direction: number): Target
  byDistance(from: number, distance: number): Target
}

export function TargetFinder(params: Params): TargetFinder {
  const self = {} as TargetFinder
  const { location, diffDistances, loop } = params

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
    return (current: Target): boolean => {
      return current.index === target
    }
  }

  function distanceFound(target: number): IsFound {
    return (current: Target): boolean => {
      return current.distance >= target
    }
  }

  function byIndex(target: number, direction: number): Target {
    const { index } = params
    const targetIndex = index.clone().set(target)
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
    const target = location.get() + distance
    const diff = target - from
    const direction = Direction(diff).get()
    const isFound = distanceFound(Math.abs(diff))
    return findTarget(isFound, direction)
  }

  return Object.assign(self, {
    byDistance,
    byIndex,
  })
}
