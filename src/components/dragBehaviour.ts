import { Animation } from './animation'
import { Counter } from './counter'
import { Direction } from './direction'
import { EventDispatcher } from './eventDispatcher'
import { EventStore } from './eventStore'
import { Limit } from './limit'
import { Mover } from './mover'
import { Pointer } from './pointer'
import { Scroll } from './scroll'
import { Vector1D } from './vector1d'

type Params = {
  element: HTMLElement
  target: Vector1D
  dragFree: boolean
  snapSizes: number[]
  pointer: Pointer
  location: Vector1D
  animation: Animation
  scroll: Scroll
  mover: Mover
  index: Counter
  limit: Limit
  loop: boolean
  events: EventDispatcher
}

export type DragBehaviour = {
  addActivationEvents: () => void
  clickAllowed: () => boolean
  direction: Direction
  isDown: () => boolean
  removeAllEvents: () => void
}

export function DragBehaviour(params: Params): DragBehaviour {
  const { target, mover, dragFree, animation } = params
  const { element, pointer, location, events, limit } = params
  const { direction } = pointer
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA']
  const startX = Vector1D(0)
  const startY = Vector1D(0)
  const dragStartLocation = Vector1D(0)
  const activationEvents = EventStore()
  const interactionEvents = EventStore()
  const snapForceBoost = { mouse: 2.5, touch: 3.5 }
  const freeForceBoost = { mouse: 4, touch: 7 }
  const snapSpeed = { mouse: 12, touch: 14 }
  const freeSpeed = { mouse: 6, touch: 5 }
  const dragThreshold = 4
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

  function seekTargetBy(force: number): void {
    const { scroll, snapSizes, index } = params
    const forceAbs = Math.abs(force)
    const halfSnap = snapSizes[index.get()] / 2
    const reachedLimit = limit.reachedAny(target.get() + force)
    const seekNext = forceAbs > dragThreshold && forceAbs < halfSnap

    if (!dragFree && !reachedLimit && seekNext) {
      const indexDiff = Direction(force).get() * -1
      const next = index.clone().add(indexDiff)
      scroll.toIndex(next.get())
    } else {
      scroll.toDistance(force)
    }
  }

  function down(evt: Event): void {
    const node = evt.target as Element
    const diffToTarget = target.get() - location.get()
    const isMoving = Math.abs(diffToTarget) >= 2

    state.isMouse = !!evt.type.match(/mouse/)
    state.isDown = true
    pointer.down(evt)
    dragStartLocation.set(target)
    target.set(location)
    mover.useDefaultMass().useSpeed(80)
    animation.start()
    addInteractionEvents()
    events.dispatch('dragStart')

    if (isMoving) evt.preventDefault()
    if (!isMoving || state.isMouse) state.preventClick = false
    if (state.isMouse && !isFocusNode(node)) evt.preventDefault()
    if (!state.isMouse) {
      startX.set(pointer.read(evt, 'x'))
      startY.set(pointer.read(evt, 'y'))
    }
  }

  function move(evt: Event): void {
    if (state.preventScroll || state.isMouse) {
      const diff = pointer.move(evt)
      const reachedLimit = limit.reachedAny(location.get())
      const resist = !params.loop && reachedLimit ? 2 : 1
      target.addNumber(diff / resist)
      evt.preventDefault()
      if (!state.preventClick && diff) state.preventClick = true
    } else {
      const X = pointer.read(evt, 'x').get()
      const Y = pointer.read(evt, 'y').get()
      const diffX = Math.abs(X - startX.get())
      const diffY = Math.abs(Y - startY.get())
      state.preventScroll = diffX > diffY
      if (!state.preventScroll && !state.preventClick) up()
    }
  }

  function up(): void {
    const force = pointer.up() * pointerForceBoost()
    const diffToTarget = target.get() - dragStartLocation.get()
    const isMoving = Math.abs(diffToTarget) >= 0.5

    if (isMoving && !state.isMouse) state.preventClick = true
    state.isMouse = false
    state.preventScroll = false
    state.isDown = false
    interactionEvents.removeAll()
    mover.useSpeed(movementSpeed())
    seekTargetBy(force)
    events.dispatch('dragEnd')
  }

  function click(evt: Event): void {
    if (state.preventClick) evt.preventDefault()
  }

  function clickAllowed(): boolean {
    return !state.preventClick
  }

  function isDown(): boolean {
    return state.isDown
  }

  const self: DragBehaviour = {
    addActivationEvents,
    clickAllowed,
    direction,
    isDown,
    removeAllEvents,
  }
  return Object.freeze(self)
}
