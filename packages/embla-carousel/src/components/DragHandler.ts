import { AnimationType } from './Animation'
import { CounterType } from './Counter'
import { DirectionType } from './Direction'
import { DragTrackerType, PointerEventType } from './DragTracker'
import { EventHandlerType } from './EventHandler'
import { AxisType } from './Axis'
import { EventStore } from './EventStore'
import { ScrollBodyType } from './ScrollBody'
import { ScrollTargetType } from './ScrollTarget'
import { ScrollToType } from './ScrollTo'
import { Vector1D, Vector1DType } from './Vector1d'
import { deltaAbs, factorAbs, mathAbs, mathSign } from './utils'
import { PercentOfViewType } from './PercentOfView'

export type DragHandlerType = {
  addActivationEvents: () => void
  clickAllowed: () => boolean
  pointerDown: () => boolean
  removeAllEvents: () => void
}

export function DragHandler(
  axis: AxisType,
  direction: DirectionType,
  rootNode: HTMLElement,
  target: Vector1DType,
  dragTracker: DragTrackerType,
  location: Vector1DType,
  animation: AnimationType,
  scrollTo: ScrollToType,
  scrollBody: ScrollBodyType,
  scrollTarget: ScrollTargetType,
  index: CounterType,
  eventHandler: EventHandlerType,
  percentOfView: PercentOfViewType,
  loop: boolean,
  dragFree: boolean,
  skipSnaps: boolean,
): DragHandlerType {
  const { cross: crossAxis } = axis
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA']
  const dragStartPoint = Vector1D(0)
  const activationEvents = EventStore()
  const interactionEvents = EventStore()
  const dragThreshold = percentOfView.measure(20)
  const snapForceBoost = { mouse: 300, touch: 400 }
  const freeForceBoost = { mouse: 500, touch: 600 }
  const baseSpeed = dragFree ? 5 : 16
  const baseMass = 1

  let startScroll = 0
  let startCross = 0
  let pointerIsDown = false
  let preventScroll = false
  let preventClick = false
  let isMouse = false

  function addActivationEvents(): void {
    const node = rootNode
    activationEvents
      .add(node, 'touchmove', () => undefined)
      .add(node, 'touchend', () => undefined)
      .add(node, 'touchstart', down)
      .add(node, 'mousedown', down)
      .add(node, 'touchcancel', up)
      .add(node, 'contextmenu', up)
      .add(node, 'click', click)
  }

  function addInteractionEvents(): void {
    const node = !isMouse ? rootNode : document
    interactionEvents
      .add(node, 'touchmove', move)
      .add(node, 'touchend', up)
      .add(node, 'mousemove', move)
      .add(node, 'mouseup', up)
  }

  function removeAllEvents(): void {
    activationEvents.removeAll()
    interactionEvents.removeAll()
  }

  function isFocusNode(node: Element): boolean {
    const name = node.nodeName || ''
    return focusNodes.indexOf(name) > -1
  }

  function forceBoost(): number {
    const boost = dragFree ? freeForceBoost : snapForceBoost
    const type = isMouse ? 'mouse' : 'touch'
    return boost[type]
  }

  function allowedForce(force: number, targetChanged: boolean): number {
    const next = index.clone().add(mathSign(force) * -1)
    const isEdge = next.get() === index.min || next.get() === index.max
    const baseForce = scrollTarget.byDistance(force, !dragFree).distance

    if (dragFree || mathAbs(force) < dragThreshold) return baseForce
    if (!loop && isEdge) return baseForce * 0.4
    if (skipSnaps && targetChanged) return baseForce * 0.5

    return scrollTarget.byIndex(next.get(), 0).distance
  }

  function down(evt: PointerEventType): void {
    isMouse = evt.type === 'mousedown'
    if (isMouse && (evt as MouseEvent).button !== 0) return

    const isMoving = deltaAbs(target.get(), location.get()) >= 2
    const clearPreventClick = isMouse || !isMoving
    const isNotFocusNode = !isFocusNode(evt.target as Element)
    const preventDefault = isMoving || (isMouse && isNotFocusNode)

    pointerIsDown = true
    dragTracker.pointerDown(evt)
    dragStartPoint.set(target)
    target.set(location)
    scrollBody.useBaseMass().useSpeed(80)
    addInteractionEvents()
    startScroll = dragTracker.readPoint(evt)
    startCross = dragTracker.readPoint(evt, crossAxis)
    eventHandler.emit('pointerDown')

    if (clearPreventClick) preventClick = false
    if (preventDefault) evt.preventDefault()
  }

  function move(evt: PointerEventType): void {
    if (!preventScroll && !isMouse) {
      if (!evt.cancelable) return up(evt)
      const lastScroll = dragTracker.readPoint(evt)
      const lastCross = dragTracker.readPoint(evt, crossAxis)
      const diffScroll = deltaAbs(lastScroll, startScroll)
      const diffCross = deltaAbs(lastCross, startCross)
      preventScroll = diffScroll > diffCross
      if (!preventScroll && !preventClick) return up(evt)
    }
    const diff = dragTracker.pointerMove(evt)
    if (!preventClick && diff) preventClick = true
    animation.start()
    target.add(direction.apply(diff))
    evt.preventDefault()
  }

  function up(evt: PointerEventType): void {
    const currentLocation = scrollTarget.byDistance(0, false)
    const targetChanged = currentLocation.index !== index.get()
    const rawForce = dragTracker.pointerUp(evt) * forceBoost()
    const force = allowedForce(direction.apply(rawForce), targetChanged)
    const forceFactor = factorAbs(rawForce, force)
    const isMoving = deltaAbs(target.get(), dragStartPoint.get()) >= 0.5
    const isVigorous = targetChanged && forceFactor > 0.75
    const isBelowThreshold = mathAbs(rawForce) < dragThreshold
    const speed = isVigorous ? 10 : baseSpeed
    const mass = isVigorous ? baseMass + 2.5 * forceFactor : baseMass

    if (isMoving && !isMouse) preventClick = true
    preventScroll = false
    pointerIsDown = false
    interactionEvents.removeAll()
    scrollBody.useSpeed(isBelowThreshold ? 9 : speed).useMass(mass)
    scrollTo.distance(force, !dragFree)
    isMouse = false
    eventHandler.emit('pointerUp')
  }

  function click(evt: MouseEvent): void {
    if (preventClick) evt.preventDefault()
  }

  function clickAllowed(): boolean {
    return !preventClick
  }

  function pointerDown(): boolean {
    return pointerIsDown
  }

  const self: DragHandlerType = {
    addActivationEvents,
    clickAllowed,
    pointerDown,
    removeAllEvents,
  }
  return self
}
