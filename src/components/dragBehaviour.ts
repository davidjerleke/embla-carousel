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
  down: (evt: Event) => void
  move: (evt: Event) => void
  up: () => void
  removeAllEvents: () => void
  addActivationEvents: () => void
}

export function DragBehaviour(params: Params): DragBehaviour {
  const { element, pointer, location, events } = params
  const { locationAtDragStart } = params
  const { direction } = pointer
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA']
  const startX = Vector1D(0)
  const startY = Vector1D(0)
  const activationEvents = EventStore()
  const interactionEvents = EventStore()
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

  function down(evt: Event): void {
    const { animation } = params
    const node = evt.target as Element
    state.isMouse = evt.type === 'mousedown'
    pointer.down(evt)
    locationAtDragStart.set(location)
    state.preventClick = false
    state.isDown = true
    animation.start()
    addInteractionEvents()
    events.dispatch('dragStart')

    if (!state.isMouse) {
      startX.set(pointer.read(evt, 'x'))
      startY.set(pointer.read(evt, 'y'))
    } else if (!isFocusNode(node)) {
      evt.preventDefault()
    }
  }

  function move(evt: Event): void {
    if (state.preventScroll || state.isMouse) {
      const { limit, loop } = params
      const diff = pointer.move(evt)
      const reachedAnyLimit = limit.reachedAny(location.get())
      const resist = !loop && reachedAnyLimit ? 2 : 1
      location.addNumber(diff / resist)
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
    const force = pointer.up() * (state.isMouse ? 2 : 2.8)
    const speed = state.isMouse ? 12 : 15

    state.isMouse = false
    state.preventScroll = false
    state.isDown = false
    interactionEvents.removeAll()
    events.dispatch('dragEnd')

    const diffToTarget = Math.abs(target.get() - location.get())
    const minDiffToTarget = 1

    if (diffToTarget <= minDiffToTarget) return

    state.preventClick = true
    mover.useSpeed(speed)
    travel.toDistance(locationAtDragStart.get(), force)
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
    down,
    isDown,
    move,
    removeAllEvents,
    up,
  }
  return Object.freeze(self)
}
