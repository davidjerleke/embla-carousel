import { Animation } from './animation'
import { Counter } from './counter'
import { Direction } from './direction'
import { EventDispatcher } from './eventDispatcher'
import { Target, TargetFinder } from './targetFinder'
import { Vector1D } from './vector1d'

interface Params {
  animation: Animation
  moverTarget: Vector1D
  index: Counter
  findTarget: TargetFinder
  events: EventDispatcher
}

export interface Traveller {
  toNext(): Traveller
  toPrevious(): Traveller
  toIndex(target: number): Traveller
  toDistance(from: number, distance: number): Traveller
}

export function Traveller(params: Params): Traveller {
  const self = {} as Traveller
  const { index, findTarget, animation, moverTarget } = params

  function travelTo(next: Target): Traveller {
    const { events } = params
    animation.start()
    moverTarget.addNumber(next.distance)
    index.set(next.index)
    events.dispatch('select')
    return self
  }

  function findIndex(target: Counter, direction: number): Traveller {
    const diff = index.get() - target.get()
    if (diff) {
      const d = direction || Direction(diff).get()
      const next = findTarget.byIndex(target.get(), d)
      travelTo(next)
    }
    return self
  }

  function toIndex(target: number): Traveller {
    const next = index.clone().set(target)
    findIndex(next, 0)
    return self
  }

  function toDistance(from: number, distance: number): Traveller {
    const next = findTarget.byDistance(from, distance)
    travelTo(next)
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

  return Object.assign(self, {
    toDistance,
    toIndex,
    toNext,
    toPrevious,
  })
}
