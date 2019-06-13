import { Animation } from './animation'
import { Counter } from './counter'
import { EventDispatcher } from './eventDispatcher'
import { Target, TargetFinder } from './targetFinder'
import { Vector1D } from './vector1d'

type Params = {
  animation: Animation
  target: Vector1D
  index: Counter
  indexPrevious: Counter
  findTarget: TargetFinder
  events: EventDispatcher
}

export type Traveller = {
  toNext: () => Traveller
  toPrevious: () => Traveller
  toIndex: (target: number) => Traveller
  toDistance: (force: number) => Traveller
}

export function Traveller(params: Params): Traveller {
  const { index, findTarget, animation } = params

  function travelTo(next: Target): Traveller {
    const { indexPrevious, events, target } = params
    const distanceDiff = next.distance
    const indexDiff = next.index !== index.get()

    if (distanceDiff) {
      animation.start()
      target.addNumber(distanceDiff)
    }
    if (indexDiff) {
      indexPrevious.set(index.get())
      index.set(next.index)
      events.dispatch('select')
    }
    return self
  }

  function toDistance(force: number): Traveller {
    const next = findTarget.byDistance(force)
    travelTo(next)
    return self
  }

  function findIndex(target: Counter, direction: number): Traveller {
    const next = findTarget.byIndex(target.get(), direction)
    travelTo(next)
    return self
  }

  function toIndex(target: number): Traveller {
    const next = index.clone().set(target)
    findIndex(next, 0)
    return self
  }

  function toNext(): Traveller {
    const next = index.clone().add(1)
    findIndex(next, -1)
    return self
  }

  function toPrevious(): Traveller {
    const next = index.clone().add(-1)
    findIndex(next, 1)
    return self
  }

  const self: Traveller = {
    toDistance,
    toIndex,
    toNext,
    toPrevious,
  }
  return Object.freeze(self)
}
