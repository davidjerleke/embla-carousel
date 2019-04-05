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
  dragStartLocation: Vector1D
  isDown: () => boolean
  onClick: (evt: Event) => void
  down: (evt: Event) => void
  move: (evt: Event) => void
  up: () => void
  cancel: (evt: Event) => void
  removeAllEvents: () => void
  activate: () => void
}

export function DragBehaviour(params: Params): DragBehaviour {
  const self = {} as DragBehaviour
  const { element, pointer, location, limit, loop, events } = params
  const focusNodes = ['INPUT', 'SELECT', 'TEXTAREA']
  const dragStart = Vector1D(0)
  const startX = Vector1D(0)
  const startY = Vector1D(0)
  const activationEvents = EventStore()
  const interactionEvents = EventStore()
  const state = {
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
    dragStart.set(location)
    animation.start()
    state.preventClick = false
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
      evt.preventDefault()
      const diff = pointer.move(evt)
      const pastLimit = limit.reached.any(location.get())
      const resist = !loop && pastLimit ? 2 : 1
      location.addNumber(diff / resist)
    } else {
      const X = pointer.read(evt, 'x').get()
      const Y = pointer.read(evt, 'y').get()
      const diffX = X - startX.get()
      const diffY = Y - startY.get()
      state.preventScroll = Math.abs(diffX) > Math.abs(diffY)

      if (!state.preventScroll) {
        up()
      }
    }
  }

  function up(): void {
    const { travel, target, mover, index } = params
    const force = pointer.up() * (state.isMouse ? 1.2 : 2.4)
    const forceAbs = Math.abs(force)
    const speedLimit = Limit({ low: 11, high: 15 })
    const speed = speedLimit.constrain(forceAbs)

    state.isMouse = false
    state.preventScroll = false
    interactionEvents.removeAll()
    events.dispatch('dragEnd')

    if (!loop) {
      const targetLocation = location.get() + force
      const pastLowLimit = limit.reached.low(targetLocation)
      const pastHighLimit = limit.reached.high(targetLocation)

      if (pastHighLimit || pastLowLimit) {
        const nextIndex = pastHighLimit ? index.min : index.max
        target.setNumber(targetLocation)
        if (nextIndex !== index.get()) {
          index.set(nextIndex)
          events.dispatch('select')
        }
        return
      }
    }

    const diffDrag = Math.abs(dragStart.get() - location.get())
    const diffToTarget = Math.abs(target.get() - location.get())
    const minDragDiff = 5
    const minDiffToTarget = 1

    if (diffDrag > 1 && diffToTarget > minDiffToTarget) {
      state.preventClick = true
      if (diffDrag > minDragDiff) {
        mover.useSpeed(speed)
        travel.toDistance(dragStart.get(), force)
      }
    }
  }

  function click(evt: Event): void {
    if (state.preventClick) {
      evt.preventDefault()
    }
  }

  return Object.assign(self, {
    activate: addActivationEvents,
    cancel: up,
    direction: pointer.direction,
    down,
    dragStartLocation: dragStart,
    isDown: pointer.isDown,
    move,
    onClick: click,
    removeAllEvents,
    up,
  })
}
