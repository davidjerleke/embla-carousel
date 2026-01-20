import { AnimationsType } from './Animations'
import { CounterType } from './Counter'
import { DragTrackerType, PointerEventType } from './DragTracker'
import { EventHandlerType } from './EventHandler'
import { AxisType } from './Axis'
import { EventStore } from './EventStore'
import { ScrollBodyType } from './ScrollBody'
import { ScrollTargetType } from './ScrollTarget'
import { ScrollToType } from './ScrollTo'
import { NumberStoreType } from './NumberStore'
import { PercentOfViewType } from './PercentOfView'
import { Limit } from './Limit'
import {
  deltaAbs,
  factorAbs,
  isMouseEvent,
  mathAbs,
  mathSign,
  WindowType
} from './utils'

export type DragHandlerType = {
  init: (ownerWindow: WindowType) => void
  destroy: () => void
  pointerDown: () => boolean
}

export function DragHandler(
  active: boolean,
  axis: AxisType,
  rootNode: HTMLElement,
  target: NumberStoreType,
  dragTracker: DragTrackerType,
  location: NumberStoreType,
  animation: AnimationsType,
  scrollTo: ScrollToType,
  scrollBody: ScrollBodyType,
  scrollTarget: ScrollTargetType,
  indexCurrent: CounterType,
  eventHandler: EventHandlerType,
  percentOfView: PercentOfViewType,
  dragFree: boolean,
  dragThreshold: number,
  skipSnaps: boolean,
  baseFriction: number
): DragHandlerType {
  const { cross: crossAxis, direction } = axis
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA']
  const nonPassiveEvent = { passive: false }
  const initEvents = EventStore()
  const mouseEvents = EventStore()
  const goToNextThreshold = Limit(50, 225).clamp(percentOfView.measure(20))
  const snapForceBoost = { mouse: 300, touch: 400 }
  const freeForceBoost = { mouse: 500, touch: 600 }
  const baseDuration = dragFree ? 43 : 25

  let documentInstance: Document
  let windowInstance: WindowType
  let isMoving = false
  let startScroll = 0
  let startCross = 0
  let runTouchEvents = false
  let pointerIsDown = false
  let preventScroll = false
  let preventClick = false
  let isMouse = false

  function init(ownerWindow: WindowType): void {
    if (!active) return

    documentInstance = ownerWindow.document
    windowInstance = ownerWindow

    dragTracker.init(ownerWindow)

    const node = rootNode
    initEvents
      .add(node, 'dragstart', (evt) => evt.preventDefault(), nonPassiveEvent)
      .add(node, 'touchmove', (e) => runTouchEvents && move(e), nonPassiveEvent)
      .add(node, 'touchend', (e) => runTouchEvents && up(e))
      .add(node, 'touchstart', down)
      .add(node, 'mousedown', down)
      .add(node, 'touchcancel', up)
      .add(node, 'contextmenu', up)
      .add(node, 'click', click, true)
  }

  function destroy(): void {
    initEvents.clear()
    mouseEvents.clear()
    runTouchEvents = false
  }

  function addMouseEvents(): void {
    const node = isMouse ? documentInstance : rootNode

    mouseEvents
      .add(node, 'mousemove', move, nonPassiveEvent)
      .add(node, 'mouseup', up)
  }

  function isFocusNode(node: Element): boolean {
    const nodeName = node.nodeName || ''
    return focusNodes.includes(nodeName)
  }

  function forceBoost(): number {
    const boost = dragFree ? freeForceBoost : snapForceBoost
    const type = isMouse ? 'mouse' : 'touch'
    return boost[type]
  }

  function indexChanged(): boolean {
    const currentLocation = scrollTarget.byDistance(0, false)
    return currentLocation.index !== indexCurrent.get()
  }

  function baseForce(force: number): number {
    return scrollTarget.byDistance(force, !dragFree).distance
  }

  function allowedForce(force: number): number {
    const next = indexCurrent.add(mathSign(force) * -1)

    if (dragFree || mathAbs(force) < goToNextThreshold) return baseForce(force)
    if (skipSnaps && indexChanged()) return baseForce(force) * 0.5

    return scrollTarget.byIndex(next.get(), 0).distance
  }

  function down(evt: PointerEventType): void {
    const event = eventHandler.createEvent('pointerdown', evt)
    const preventDefault = !event.emit()
    if (preventDefault) return

    const isMouseEvt = isMouseEvent(evt, windowInstance)
    const isNotLeftButton = isMouseEvt && evt.button !== 0

    isMouse = isMouseEvt
    preventClick = dragFree && isMouseEvt && !evt.buttons && isMoving
    isMoving = deltaAbs(target.get(), location.get()) >= 2

    if (isNotLeftButton) return
    if (isFocusNode(evt.target as Element)) return

    pointerIsDown = true
    dragTracker.pointerDown(evt)
    scrollBody.useFriction(0).useDuration(0)
    target.set(location)
    startScroll = dragTracker.readPoint(evt)
    startCross = dragTracker.readPoint(evt, crossAxis)

    addMouseEvents()
    runTouchEvents = true
  }

  function move(evt: PointerEventType): void {
    const event = eventHandler.createEvent('pointermove', evt)
    const preventDefault = !event.emit()
    if (preventDefault) return up(evt)

    const isTouchEvt = !isMouseEvent(evt, windowInstance)
    const isPinching = isTouchEvt && evt.touches.length >= 2
    if (isPinching) return up(evt)

    const lastScroll = dragTracker.readPoint(evt)
    const lastCross = dragTracker.readPoint(evt, crossAxis)
    const diffScroll = deltaAbs(lastScroll, startScroll)
    const diffCross = deltaAbs(lastCross, startCross)

    if (!preventScroll && !isMouse) {
      if (!evt.cancelable) return up(evt)
      preventScroll = diffScroll > diffCross
      if (!preventScroll) return up(evt)
    }
    const diff = dragTracker.pointerMove(evt)
    if (diffScroll > dragThreshold) preventClick = true

    scrollBody.useFriction(0.3).useDuration(0.75)
    animation.start()
    target.add(direction(diff))

    if (evt.cancelable) evt.preventDefault()
  }

  function up(evt: PointerEventType): void {
    const event = eventHandler.createEvent('pointerup', evt)

    const rawForce = dragTracker.pointerUp(evt) * forceBoost()
    const force = allowedForce(direction(rawForce))
    const forceFactor = factorAbs(rawForce, force)
    const duration = baseDuration - 10 * forceFactor
    const friction = baseFriction + forceFactor / 50

    preventScroll = false
    pointerIsDown = false
    runTouchEvents = false
    isMouse = false
    mouseEvents.clear()

    scrollBody.useDuration(duration).useFriction(friction)
    scrollTo.distance(force, !dragFree)
    event.emit()
  }

  function click(evt: MouseEvent): void {
    if (preventClick) {
      evt.stopPropagation()
      evt.preventDefault()
      preventClick = false
    }
  }

  function pointerDown(): boolean {
    return pointerIsDown
  }

  const self: DragHandlerType = {
    init,
    destroy,
    pointerDown
  }
  return self
}
