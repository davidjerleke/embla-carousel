import { AnimationsType } from './Animations.js'
import { CounterType } from './Counter.js'
import { EventHandlerType } from './EventHandler.js'
import { ScrollBodyType } from './ScrollBody.js'
import { ScrollTargetType, TargetType } from './ScrollTarget.js'
import { Vector1DType } from './Vector1d.js'

export type ScrollToType = {
  distance: (n: number, snap: boolean) => void
  index: (n: number, direction: number) => void
}

export function ScrollTo(
  animation: AnimationsType,
  indexCurrent: CounterType,
  indexPrevious: CounterType,
  scrollBody: ScrollBodyType,
  scrollTarget: ScrollTargetType,
  targetVector: Vector1DType,
  eventHandler: EventHandlerType
): ScrollToType {
  function scrollTo(target: TargetType): void {
    const distanceDiff = target.distance
    const indexDiff = target.index !== indexCurrent.get()

    targetVector.add(distanceDiff)

    if (distanceDiff) {
      if (scrollBody.duration()) {
        animation.start()
      } else {
        animation.update()
        animation.render(1)
        animation.update()
      }
    }

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
