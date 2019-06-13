import { Animation } from './animation'
import { Counter } from './counter'
import { Direction } from './direction'
import { EventDispatcher } from './eventDispatcher'
import { EventStore } from './eventStore'
import { Limit } from './limit'
import { Mover } from './mover'
import { Pointer } from './pointer'
import { Traveller } from './traveller'
import { Vector1D } from './vector1d'

type Params = {
  element: HTMLElement
  target: Vector1D
  dragFree: boolean
  groupSizes: number[]
  pointer: Pointer
  location: Vector1D
  locationAtDragStart: Vector1D
  animation: Animation
  travel: Traveller
  mover: Mover
  index: Counter
  limit: Limit
  loop: boolean
  events: EventDispatcher
}

export type DragBehaviour = {
  direction: Direction
  isDown: () => boolean
  removeAllEvents: () => void
  addActivationEvents: () => void
}

export function DragBehaviour(params: Params): DragBehaviour {
  const { element, pointer, location, events } = params
  const { locationAtDragStart, dragFree, animation } = params
  const { direction } = pointer
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA']
  const startX = Vector1D(0)
  const startY = Vector1D(0)
  const activationEvents = EventStore()
  const interactionEvents = EventStore()
  const snapForceBoost = { mouse: 2, touch: 2.8 }
  const freeForceBoost = { mouse: 4, touch: 7 }
  const snapSpeed = { mouse: 12, touch: 15 }
  const freeSpeed = { mouse: 6, touch: 5 }
  const dragForceThreshold = 5
  const state = {
    isDown: false,
    isMouse: false,
    preventClick: false,
    preventScroll: false,
  }

  function addActivationEvents(): void {
    const node = element
    activationEvents
      .add(node, 'touchmove', () => undefined)
      .add(node, 'touchend', () => undefined)
      .add(node, 'touchstart', down)
      .add(node, 'touchcancel', up)
      .add(node, 'mousedown', down)
      .add(node, 'click', click)
  }

  function addInteractionEvents(): void {
    const node = !state.isMouse ? element : document
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

  function movementSpeed(): number {
    const speed = dragFree ? freeSpeed : snapSpeed
    const type = state.isMouse ? 'mouse' : 'touch'
    return speed[type]
  }

  function pointerForceBoost(): number {
    const boost = dragFree ? freeForceBoost : snapForceBoost
    const type = state.isMouse ? 'mouse' : 'touch'
    return boost[type]
  }

  function allowedForce(force: number): number {
    const { groupSizes, index } = params
    const forceAbs = Math.abs(force)
    const halfGroup = groupSizes[index.get()] / 2
    const aboveThreshold = forceAbs > dragForceThreshold
    const belowHalfGroup = forceAbs < halfGroup
    const forceToNext = halfGroup * Direction(force).get()
    return !dragFree && aboveThreshold && belowHalfGroup
      ? forceToNext
      : force
  }

  function down(evt: Event): void {
    const { target, mover } = params
    const { target: evtTarget, type } = evt

    state.isMouse = !!type.match(/mouse/)
    pointer.down(evt)
    locationAtDragStart.set(location)
    target.set(location)
    state.preventClick = false
    state.isDown = true
    mover.useSpeed(50)
    animation.start()
    addInteractionEvents()
    events.dispatch('dragStart')

    if (!state.isMouse) {
      startX.set(pointer.read(evt, 'x'))
      startY.set(pointer.read(evt, 'y'))
    } else if (!isFocusNode(evtTarget as Element)) {
      evt.preventDefault()
    }
  }

  function move(evt: Event): void {
    if (state.preventScroll || state.isMouse) {
      const { limit, loop, target } = params
      const diff = pointer.move(evt)
      const reachedAnyLimit = limit.reachedAny(location.get())
      const resist = !loop && reachedAnyLimit ? 2 : 1
      target.addNumber(diff / resist)
      evt.preventDefault()
    } else {
      const X = pointer.read(evt, 'x').get()
      const Y = pointer.read(evt, 'y').get()
      const diffX = Math.abs(X - startX.get())
      const diffY = Math.abs(Y - startY.get())
      state.preventScroll = diffX > diffY
      if (!state.preventScroll) up()
    }
  }

  function up(): void {
    const { travel, target, mover } = params
    const boostedForce = pointer.up() * pointerForceBoost()
    const force = allowedForce(boostedForce)
    const speed = movementSpeed()
    const diffToTarget = Math.abs(target.get() - location.get())
    const minDiffToTarget = 1
    const isMoving = diffToTarget <= minDiffToTarget

    if (isMoving) state.preventClick = true
    state.isMouse = false
    state.preventScroll = false
    state.isDown = false
    interactionEvents.removeAll()
    mover.useSpeed(speed)
    events.dispatch('dragEnd')
    travel.toDistance(force)
  }

  function click(evt: Event): void {
    if (state.preventClick) evt.preventDefault()
  }

  function isDown(): boolean {
    return state.isDown
  }

  const self: DragBehaviour = {
    addActivationEvents,
    direction,
    isDown,
    removeAllEvents,
  }
  return Object.freeze(self)
}
