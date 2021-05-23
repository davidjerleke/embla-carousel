import { AnimationType } from './animation'
import { CounterType } from './counter'
import { EventEmitterType } from './eventEmitter'
import { ScrollTargetType, TargetType } from './scrollTarget'
import { Vector1DType } from './vector1d'

export type ScrollToType = {
  distance: (n: number, snap: boolean) => void
  index: (n: number, direction: number) => void
}

export function ScrollTo(
  animation: AnimationType,
  indexCurrent: CounterType,
  indexPrevious: CounterType,
  scrollTarget: ScrollTargetType,
  targetVector: Vector1DType,
  events: EventEmitterType,
): ScrollToType {
  function scrollTo(target: TargetType): void {
    const distanceDiff = target.distance
    const indexDiff = target.index !== indexCurrent.get()

    if (distanceDiff) {
      animation.start()
      targetVector.add(distanceDiff)
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

  const self: ScrollToType = {
    distance,
    index,
  }
  return self
}
