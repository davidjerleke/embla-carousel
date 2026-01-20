import { AnimationsType } from './Animations'
import { CounterType } from './Counter'
import { EventHandlerType } from './EventHandler'
import { ScrollBodyType } from './ScrollBody'
import { ScrollTargetType, TargetType } from './ScrollTarget'
import { NumberStoreType } from './NumberStore'
import { isNumber } from './utils'

export type DirectionType = 0 | 1 | -1
export type ScrollToDirectionType = 'forward' | 'backward' | DirectionType
export type SelectEventType = { targetSnap: number; sourceSnap: number }

export type ScrollToType = {
  distance: (input: number, snapToClosest: boolean) => void
  index: (input: number, direction?: ScrollToDirectionType) => void
}

export function ScrollTo(
  animation: AnimationsType,
  indexCurrent: CounterType,
  indexPrevious: CounterType,
  scrollBody: ScrollBodyType,
  scrollTarget: ScrollTargetType,
  targetVector: NumberStoreType,
  eventHandler: EventHandlerType
): ScrollToType {
  function scrollTo(target: TargetType): void {
    const { index: targetSnap, distance: targetDisplacement } = target
    const sourceSnap = indexCurrent.get()
    const hasIndexChanged = targetSnap !== sourceSnap

    if (targetDisplacement) {
      targetVector.add(targetDisplacement)

      if (scrollBody.duration()) {
        animation.start()
      } else {
        animation.update()
        animation.render(1)
        animation.update()
      }
    }

    if (hasIndexChanged) {
      indexPrevious.set(sourceSnap)
      indexCurrent.set(targetSnap)

      const event = eventHandler.createEvent('select', {
        targetSnap,
        sourceSnap
      })
      event.emit()
    }
  }

  function distance(input: number, snapToClosest: boolean): void {
    const target = scrollTarget.byDistance(input, snapToClosest)
    scrollTo(target)
  }

  function index(input: number, direction?: ScrollToDirectionType): void {
    const targetIndex = indexCurrent.clone().set(input).get()
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
