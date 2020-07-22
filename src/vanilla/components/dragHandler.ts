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

type Params = {
  axis: Axis
  element: HTMLElement
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
  loop: boolean
  events: EventEmitter
}

export type DragHandler = {
  addActivationEvents: () => void
  clickAllowed: () => boolean
  pointerDown: () => boolean
  removeActivationEvents: EventStore['removeAll']
  removeInteractionEvents: EventStore['removeAll']
}

export function DragHandler(params: Params): DragHandler {
  const { target, scrollBody, dragFree, animation, axis } = params
  const { element, dragTracker, location, events, limit } = params
  const { scroll: scrollAxis, cross: crossAxis } = axis
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA']
  const startScroll = Vector1D(0)
  const startCross = Vector1D(0)
  const dragStartPoint = Vector1D(0)
  const activationEvents = EventStore()
  const interactionEvents = EventStore()
  const removeActivationEvents = activationEvents.removeAll
  const removeInteractionEvents = interactionEvents.removeAll
  const snapForceBoost = { mouse: 2.5, touch: 4 }
  const freeForceBoost = { mouse: 5, touch: 8 }
  const baseSpeed = dragFree ? 5 : 12
  const dragThreshold = 4
  const edgeLimit = Limit({
    min: limit.min - 70,
    max: limit.max + 70,
  })

  let pointerIsDown = false
  let preventScroll = false
  let preventClick = false
  let isMouse = false

  function addActivationEvents(): void {
    const node = element
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
    const node = !isMouse ? element : document
    interactionEvents
      .add(node, 'touchmove', move)
      .add(node, 'touchend', up)
      .add(node, 'mousemove', move)
      .add(node, 'mouseup', up)
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

  function speedFactor(forceB: number, forceA: number): number {
    const diff = delta(Math.abs(forceB), Math.abs(forceA))
    if (Math.abs(forceB) <= Math.abs(forceA)) return 0
    if (forceB === 0 || forceA === 0) return 0
    return Math.abs(diff / forceB)
  }

  function allowedForce(force: number): number {
    const { scrollTarget, index } = params
    const currentLocation = scrollTarget.byDistance(0, false)
    const targetChanged = currentLocation.index !== index.get()
    const seekNext = !targetChanged && Math.abs(force) > dragThreshold
    const destination = force + location.get()

    if (seekNext && !dragFree && !limit.reachedAny(destination)) {
      const next = index.clone().add(Direction(force).get() * -1)
      return scrollTarget.byIndex(next.get(), 0).distance
    }
    if (!params.loop && edgeLimit.reachedAny(destination)) {
      const edge = edgeLimit.reachedMax(destination) ? 'max' : 'min'
      return edgeLimit[edge] - target.get()
    }
    return scrollTarget.byDistance(force, !dragFree).distance
  }

  function down(evt: Event): void {
    isMouse = evt.type === 'mousedown'
    if (isMouse && (evt as MouseEvent).button !== 0) return

    const isMoving = delta(target.get(), location.get()) >= 2
    const clearPreventClick = isMouse || !isMoving
    const isNotFocusNode = !isFocusNode(evt.target as Element)
    const preventDefault = isMoving || (isMouse && isNotFocusNode)

    pointerIsDown = true
    dragTracker.pointerDown(evt)
    dragStartPoint.set(target)
    target.set(location)
    scrollBody.useDefaultMass().useSpeed(80)
    addInteractionEvents()
    startScroll.set(dragTracker.readPoint(evt, scrollAxis))
    startCross.set(dragTracker.readPoint(evt, crossAxis))
    events.emit('pointerDown')

    if (clearPreventClick) preventClick = false
    if (preventDefault) evt.preventDefault()
  }

  function move(evt: Event): void {
    if (!preventScroll && !isMouse) {
      const moveScroll = dragTracker.readPoint(evt, scrollAxis).get()
      const moveCross = dragTracker.readPoint(evt, crossAxis).get()
      const diffScroll = delta(moveScroll, startScroll.get())
      const diffCross = delta(moveCross, startCross.get())
      preventScroll = diffScroll > diffCross
      if (!preventScroll && !preventClick) return up()
    }
    const diff = dragTracker.pointerMove(evt)
    const reachedLimit = limit.reachedAny(location.get())
    const resist = !params.loop && reachedLimit ? 2 : 1

    if (!preventClick && diff) preventClick = true
    animation.start()
    target.add(diff / resist)
    evt.preventDefault()
  }

  function up(): void {
    const { scrollTo } = params
    const rawForce = dragTracker.pointerUp() * forceBoost()
    const force = allowedForce(rawForce)
    const factor = speedFactor(rawForce, force)
    const isMoving = delta(target.get(), dragStartPoint.get()) >= 0.5

    if (isMoving && !isMouse) preventClick = true
    preventScroll = false
    pointerIsDown = false
    interactionEvents.removeAll()
    scrollBody.useSpeed(baseSpeed + baseSpeed * factor)
    scrollTo.distance(force, !dragFree)
    isMouse = false
    events.emit('pointerUp')
  }

  function delta(pointB: number, pointA: number): number {
    return Math.abs(pointB - pointA)
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
    removeActivationEvents,
    removeInteractionEvents,
  }
  return self
}
