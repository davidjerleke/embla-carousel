import { Animation } from './animation'
import { Counter } from './counter'
import { EventEmitter } from './eventEmitter'
import { ScrollTarget, Target } from './scrollTarget'
import { Vector1D } from './vector1d'

type Params = {
  animation: Animation
  target: Vector1D
  index: Counter
  indexPrevious: Counter
  scrollTarget: ScrollTarget
  events: EventEmitter
}

export type ScrollTo = {
  distance: (n: number, snap: boolean) => void
  index: (n: number, direction: number) => void
}

export function ScrollTo(params: Params): ScrollTo {
  const { index: indexCurrent, scrollTarget, animation } = params
  const { indexPrevious, events, target: targetDistance } = params

  function scrollTo(target: Target): void {
    const distanceDiff = target.distance
    const indexDiff = target.index !== indexCurrent.get()

    if (distanceDiff) {
      animation.start()
      targetDistance.add(distanceDiff)
    }
    if (indexDiff) {
      indexPrevious.set(indexCurrent.get())
      indexCurrent.set(target.index)
      events.emit('select')
    }
  }

  function distance(n: number, snap: boolean): void {
    const target = scrollTarget.byDistance(n, snap)
    scrollTo(target)
  }

  function index(n: number, direction: number): void {
    const targetIndex = indexCurrent.clone().set(n)
    const target = scrollTarget.byIndex(targetIndex.get(), direction)
    scrollTo(target)
  }

  const self: ScrollTo = {
    distance,
    index,
  }
  return self
}
