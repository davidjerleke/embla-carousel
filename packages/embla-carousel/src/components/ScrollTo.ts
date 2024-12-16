import { AnimationsType } from './Animations'
import { CounterType } from './Counter'
import { EventHandlerType } from './EventHandler'
import { ScrollBodyType } from './ScrollBody'
import { ScrollTargetType, TargetType } from './ScrollTarget'
import { Vector1DType } from './Vector1d'
import { isNumber } from './utils'

export type DirectionType = 0 | 1 | -1
export type ScrollToDirectionType = 'forward' | 'backward' | DirectionType

export type ScrollToType = {
  distance: (n: number, snap: boolean) => void
  index: (n: number, direction?: ScrollToDirectionType) => void
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
      eventHandler.emit('select', null)
    }
  }

  function distance(n: number, snap: boolean): void {
    const target = scrollTarget.byDistance(n, snap)
    scrollTo(target)
  }

  function index(n: number, direction?: ScrollToDirectionType): void {
    const targetIndex = indexCurrent.clone().set(n).get()
    const target = scrollTarget.byIndex(targetIndex, getDirection(direction))
    scrollTo(target)
  }

  function getDirection(direction?: ScrollToDirectionType): DirectionType {
    if (!direction) return 0
    if (isNumber(direction)) return direction
    return direction === 'forward' ? -1 : 1
  }

  const self: ScrollToType = {
    distance,
    index
  }
  return self
}
