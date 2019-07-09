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

export type Scroller = {
  toNext: () => Scroller
  toPrevious: () => Scroller
  toIndex: (target: number) => Scroller
  toDistance: (force: number) => Scroller
}

export function Scroller(params: Params): Scroller {
  const { index, findTarget, animation } = params

  function scrollTo(next: Target): Scroller {
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

  function toDistance(force: number): Scroller {
    const next = findTarget.byDistance(force)
    scrollTo(next)
    return self
  }

  function findIndex(target: Counter, direction: number): Scroller {
    const next = findTarget.byIndex(target.get(), direction)
    scrollTo(next)
    return self
  }

  function toIndex(target: number): Scroller {
    const next = index.clone().set(target)
    findIndex(next, 0)
    return self
  }

  function toNext(): Scroller {
    const next = index.clone().add(1)
    findIndex(next, -1)
    return self
  }

  function toPrevious(): Scroller {
    const next = index.clone().add(-1)
    findIndex(next, 1)
    return self
  }

  const self: Scroller = {
    toDistance,
    toIndex,
    toNext,
    toPrevious,
  }
  return Object.freeze(self)
}
