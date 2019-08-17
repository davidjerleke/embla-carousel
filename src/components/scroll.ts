import { Animation } from './animation'
import { Counter } from './counter'
import { EventDispatcher } from './eventDispatcher'
import { ScrollTarget, Target } from './scrollTarget'
import { Vector1D } from './vector1d'

type Params = {
  animation: Animation
  target: Vector1D
  index: Counter
  indexPrevious: Counter
  scrollTarget: ScrollTarget
  events: EventDispatcher
}

export type Scroll = {
  toNext: () => void
  toPrevious: () => void
  toIndex: (target: number) => void
  toDistance: (force: number) => void
}

export function Scroll(params: Params): Scroll {
  const { index, scrollTarget, animation } = params

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

  function findIndex(target: Counter, direction: number): void {
    const next = scrollTarget.byIndex(target.get(), direction)
    scrollTo(next)
  }

  function toDistance(force: number): void {
    const next = scrollTarget.byDistance(force)
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

  const self: Scroll = {
    toDistance,
    toIndex,
    toNext,
    toPrevious,
  }
  return Object.freeze(self)
}
