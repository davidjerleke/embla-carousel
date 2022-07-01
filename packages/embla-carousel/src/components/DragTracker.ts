import { AxisOptionType, AxisType } from './Axis'
import { mathAbs } from './utils'

type PointerCoordType = keyof Touch | keyof MouseEvent
export type PointerEventType = TouchEvent | MouseEvent

export type DragTrackerType = {
  isTouchEvent: (evt: PointerEventType) => evt is TouchEvent
  pointerDown: (evt: PointerEventType) => number
  pointerMove: (evt: PointerEventType) => number
  pointerUp: (evt: PointerEventType) => number
  readPoint: (evt: PointerEventType, evtAxis?: AxisOptionType) => number
}

export function DragTracker(axis: AxisType): DragTrackerType {
  const logInterval = 170

  let startEvent: PointerEventType
  let lastEvent: PointerEventType

  function isTouchEvent(evt: PointerEventType): evt is TouchEvent {
    return typeof TouchEvent !== 'undefined' && evt instanceof TouchEvent
  }

  function readTime(evt: PointerEventType): number {
    return evt.timeStamp
  }

  function readPoint(evt: PointerEventType, evtAxis?: AxisOptionType): number {
    const property = evtAxis || axis.scroll
    const coord: PointerCoordType = `client${property === 'x' ? 'X' : 'Y'}`
    return (isTouchEvent(evt) ? evt.touches[0] : evt)[coord]
  }

  function pointerDown(evt: PointerEventType): number {
    startEvent = evt
    lastEvent = evt
    return readPoint(evt)
  }

  function pointerMove(evt: PointerEventType): number {
    const diff = readPoint(evt) - readPoint(lastEvent)
    const expired = readTime(evt) - readTime(startEvent) > logInterval

    lastEvent = evt
    if (expired) startEvent = evt
    return diff
  }

  function pointerUp(evt: PointerEventType): number {
    if (!startEvent || !lastEvent) return 0
    const diffDrag = readPoint(lastEvent) - readPoint(startEvent)
    const diffTime = readTime(evt) - readTime(startEvent)
    const expired = readTime(evt) - readTime(lastEvent) > logInterval
    const force = diffDrag / diffTime
    const isFlick = diffTime && !expired && mathAbs(force) > 0.1

    return isFlick ? force : 0
  }

  const self: DragTrackerType = {
    isTouchEvent,
    pointerDown,
    pointerMove,
    pointerUp,
    readPoint,
  }
  return self
}
