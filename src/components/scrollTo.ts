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

export type ScrollTo = {
  next: () => void
  previous: () => void
  index: (n: number) => void
  distance: (n: number) => void
}

export function ScrollTo(params: Params): ScrollTo {
  const { index: indexCurrent, scrollTarget, animation } = params
  const { indexPrevious, events, target: targetDistance } = params

  function scrollTo(target: Target): void {
    const distanceDiff = target.distance
    const indexDiff = target.index !== indexCurrent.get()

    if (distanceDiff) {
      animation.start()
      targetDistance.addNumber(distanceDiff)
    }
    if (indexDiff) {
      indexPrevious.set(indexCurrent.get())
      indexCurrent.set(target.index)
      events.dispatch('select')
    }
  }

  function findIndex(counter: Counter, direction: number): void {
    const target = scrollTarget.byIndex(counter.get(), direction)
    scrollTo(target)
  }

  function distance(n: number): void {
    const target = scrollTarget.byDistance(n)
    scrollTo(target)
  }

  function index(n: number): void {
    const target = indexCurrent.clone().set(n)
    findIndex(target, 0)
  }

  function next(): void {
    const target = indexCurrent.clone().add(1)
    findIndex(target, -1)
  }

  function previous(): void {
    const target = indexCurrent.clone().add(-1)
    findIndex(target, 1)
  }

  const self: ScrollTo = {
    distance,
    index,
    next,
    previous,
  }
  return Object.freeze(self)
}
