import { Animation } from './animation'
import { Counter } from './counter'
import { Direction } from './direction'
import { DragTracker } from './dragTracker'
import { EventEmitter } from './eventEmitter'
import { Axis } from './axis'
import { EventStore } from './eventStore'
import { Limit } from './limit'
import { ScrollBody } from './scrollBody'
import { ScrollTarget } from './scrollTarget'
import { ScrollTo } from './scrollTo'
import { Vector1D } from './vector1d'
import { deltaAbs, factorAbs, mathSign } from './utils'

type Params = {
  axis: Axis
  direction: Direction
  root: HTMLElement
  target: Vector1D
  dragFree: boolean
  dragTracker: DragTracker
  location: Vector1D
  animation: Animation
  scrollTo: ScrollTo
  scrollBody: ScrollBody
  scrollTarget: ScrollTarget
  index: Counter
  limit: Limit
  events: EventEmitter
}

export type DragHandler = {
  addActivationEvents: () => void
  clickAllowed: () => boolean
  pointerDown: () => boolean
  removeAllEvents: () => void
}

export function DragHandler(params: Params): DragHandler {
  const { target, scrollBody, dragFree, animation, axis, scrollTo } = params
  const { root, dragTracker, location, events, limit, direction } = params
  const { scroll: scrollAxis, cross: crossAxis } = axis
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA']
  const startScroll = Vector1D(0)
  const startCross = Vector1D(0)
  const dragStartPoint = Vector1D(0)
  const activationEvents = EventStore()
  const interactionEvents = EventStore()
  const snapForceBoost = { mouse: 2.5, touch: 3.5 }
  const freeForceBoost = { mouse: 5, touch: 7 }
  const baseSpeed = dragFree ? 5 : 12
  const dragThreshold = 4

  let pointerIsDown = false
  let preventScroll = false
  let preventClick = false
  let isMouse = false

  function addActivationEvents(): void {
    const node = root
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
    const node = !isMouse ? root : document
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

  function allowedForce(force: number): number {
    const { scrollTarget, index } = params
    const currentLocation = scrollTarget.byDistance(0, false)
    const targetChanged = currentLocation.index !== index.get()
    const seekNext = !targetChanged && Math.abs(force) > dragThreshold
    const destination = force + location.get()

    if (seekNext && !dragFree && !limit.reachedAny(destination)) {
      const next = index.clone().add(mathSign(force) * -1)
      return scrollTarget.byIndex(next.get(), 0).distance
    }
    return scrollTarget.byDistance(force, !dragFree).distance
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
    const rawForce = dragTracker.pointerUp() * forceBoost()
    const force = allowedForce(direction.applyTo(rawForce))
    const speedFactor = factorAbs(rawForce, force)
    const isMoving = deltaAbs(target.get(), dragStartPoint.get()) >= 0.5

    if (isMoving && !isMouse) preventClick = true
    preventScroll = false
    pointerIsDown = false
    interactionEvents.removeAll()
    scrollBody.useSpeed(baseSpeed + baseSpeed * speedFactor)
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

  const self: DragHandler = {
    addActivationEvents,
    clickAllowed,
    pointerDown,
    removeAllEvents,
  }
  return self
}
