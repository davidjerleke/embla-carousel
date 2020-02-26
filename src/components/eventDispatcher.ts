type State = { [key in Event]: Callback[] }
export type Callback = () => void
export type Event =
  | 'init'
  | 'scroll'
  | 'select'
  | 'settle'
  | 'dragStart'
  | 'dragEnd'
  | 'destroy'
  | 'resize'

export type EventDispatcher = {
  dispatch: (evt: Event) => EventDispatcher
  on: (evt: Event, cb: Callback) => EventDispatcher
  off: (evt: Event, cb: Callback) => EventDispatcher
}

export function EventDispatcher(): EventDispatcher {
  const state: State = {
    destroy: [],
    dragEnd: [],
    dragStart: [],
    init: [],
    resize: [],
    scroll: [],
    select: [],
    settle: [],
  }

  function dispatch(evt: Event): EventDispatcher {
    const eventListeners = state[evt]
    eventListeners.forEach(e => e())
    return self
  }

  function on(evt: Event, cb: Callback): EventDispatcher {
    const eventListeners = state[evt]
    state[evt] = eventListeners.concat([cb])
    return self
  }

  function off(evt: Event, cb: Callback): EventDispatcher {
    const eventListeners = state[evt]
    state[evt] = eventListeners.filter(e => e !== cb)
    return self
  }

  const self: EventDispatcher = {
    dispatch,
    off,
    on,
  }
  return Object.freeze(self)
}
