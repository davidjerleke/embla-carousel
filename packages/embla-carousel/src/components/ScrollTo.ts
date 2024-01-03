import { AnimationsType } from './Animations'
import { CounterType } from './Counter'
import { EventHandlerType } from './EventHandler'
import { ScrollTargetType, TargetType } from './ScrollTarget'
import { Vector1DType } from './Vector1d'

export type ScrollToType = {
  distance: (n: number, snap: boolean) => void
  index: (n: number, direction: number) => void
}

export function ScrollTo(
  animation: AnimationsType,
  indexCurrent: CounterType,
  indexPrevious: CounterType,
  scrollTarget: ScrollTargetType,
  targetVector: Vector1DType,
  eventHandler: EventHandlerType
): ScrollToType {
  function scrollTo(target: TargetType): void {
    const distanceDiff = target.distance
    const indexDiff = target.index !== indexCurrent.get()

    targetVector.add(distanceDiff)
    if (distanceDiff) animation.start()

    if (indexDiff) {
      indexPrevious.set(indexCurrent.get())
      indexCurrent.set(target.index)
      eventHandler.emit('select')
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
    index
  }
  return self
}
