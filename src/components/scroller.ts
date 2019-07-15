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
  toNext: () => void
  toPrevious: () => void
  toIndex: (target: number) => void
  toDistance: (force: number) => void
}

export function Scroller(params: Params): Scroller {
  const { index, findTarget, animation } = params

  function scrollTo(next: Target): void {
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
  }

  function toDistance(force: number): void {
    const next = findTarget.byDistance(force)
    scrollTo(next)
  }

  function findIndex(target: Counter, direction: number): void {
    const next = findTarget.byIndex(target.get(), direction)
    scrollTo(next)
  }

  function toIndex(target: number): void {
    const next = index.clone().set(target)
    findIndex(next, 0)
  }

  function toNext(): void {
    const next = index.clone().add(1)
    findIndex(next, -1)
  }

  function toPrevious(): void {
    const next = index.clone().add(-1)
    findIndex(next, 1)
  }

  const self: Scroller = {
    toDistance,
    toIndex,
    toNext,
    toPrevious,
  }
  return Object.freeze(self)
}
