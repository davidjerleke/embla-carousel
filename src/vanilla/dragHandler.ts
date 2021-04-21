import { AnimationType } from './animation'
import { CounterType } from './counter'
import { DirectionType } from './direction'
import { DragTrackerType } from './dragTracker'
import { EventEmitterType } from './eventEmitter'
import { AxisType } from './axis'
import { EventStore } from './eventStore'
import { ScrollBodyType } from './scrollBody'
import { ScrollTargetType } from './scrollTarget'
import { ScrollToType } from './scrollTo'
import { Vector1D, Vector1DType } from './vector1d'
import { deltaAbs, factorAbs, mathSign } from './utils'

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
  dragFree: boolean,
  dragTracker: DragTrackerType,
  location: Vector1DType,
  animation: AnimationType,
  scrollTo: ScrollToType,
  scrollBody: ScrollBodyType,
  scrollTarget: ScrollTargetType,
  index: CounterType,
  events: EventEmitterType,
  loop: boolean,
  skipSnaps: boolean,
): DragHandlerType {
  const { scroll: scrollAxis, cross: crossAxis } = axis
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA']
  const startScroll = Vector1D(0)
  const startCross = Vector1D(0)
  const dragStartPoint = Vector1D(0)
  const activationEvents = EventStore()
  const interactionEvents = EventStore()
  const snapForceBoost = { mouse: 2.5, touch: 3.5 }
  const freeForceBoost = { mouse: 5, touch: 7 }
  const baseSpeed = dragFree ? 5 : 20
  const baseMass = 1
  const dragThreshold = 20

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

    if (dragFree || Math.abs(force) < dragThreshold) return baseForce
    if (!loop && isEdge) return baseForce * 0.6
    if (skipSnaps && targetChanged) return baseForce * 0.5

    return scrollTarget.byIndex(next.get(), 0).distance
  }

  function down(evt: Event): void {
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
    startScroll.set(dragTracker.readPoint(evt, scrollAxis))
    startCross.set(dragTracker.readPoint(evt, crossAxis))
    events.emit('pointerDown')

    if (clearPreventClick) preventClick = false
    if (preventDefault) evt.preventDefault()
  }

  function move(evt: Event): void {
    if (!preventScroll && !isMouse) {
      if (!evt.cancelable) return up()
      const moveScroll = dragTracker.readPoint(evt, scrollAxis).get()
      const moveCross = dragTracker.readPoint(evt, crossAxis).get()
      const diffScroll = deltaAbs(moveScroll, startScroll.get())
      const diffCross = deltaAbs(moveCross, startCross.get())
      preventScroll = diffScroll > diffCross
      if (!preventScroll && !preventClick) return up()
    }
    const diff = dragTracker.pointerMove(evt)
    if (!preventClick && diff) preventClick = true
    animation.start()
    target.add(direction.applyTo(diff))
    evt.preventDefault()
  }

  function up(): void {
    const currentLocation = scrollTarget.byDistance(0, false)
    const targetChanged = currentLocation.index !== index.get()
    const rawForce = dragTracker.pointerUp() * forceBoost()
    const force = allowedForce(direction.applyTo(rawForce), targetChanged)
    const forceFactor = factorAbs(rawForce, force)
    const isMoving = deltaAbs(target.get(), dragStartPoint.get()) >= 0.5
    const isVigorous = targetChanged && forceFactor > 0.75
    const isBelowThreshold = Math.abs(rawForce) < dragThreshold

    const speed = isVigorous ? 12 : baseSpeed
    const mass = isVigorous ? baseMass + 2.5 * forceFactor : baseMass

    if (isMoving && !isMouse) preventClick = true
    preventScroll = false
    pointerIsDown = false
    interactionEvents.removeAll()
    scrollBody.useSpeed(isBelowThreshold ? 9 : speed).useMass(mass)
    scrollTo.distance(force, !dragFree)
    isMouse = false
    events.emit('pointerUp')
  }

  function click(evt: Event): void {
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
