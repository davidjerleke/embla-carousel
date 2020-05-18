type Listeners = { [key in Event]: Callback[] }
export type Callback = () => void
export type Event =
  | 'init'
  | 'scroll'
  | 'select'
  | 'settle'
  | 'dragStart'
  | 'dragEnd'
  | 'destroy'
  | 'reInit'

export type EventDispatcher = {
  dispatch: (evt: Event) => EventDispatcher
  on: (evt: Event, cb: Callback) => EventDispatcher
  off: (evt: Event, cb: Callback) => EventDispatcher
}

export function EventDispatcher(): EventDispatcher {
  const listeners: Listeners = {
    destroy: [],
    dragEnd: [],
    dragStart: [],
    init: [],
    reInit: [],
    scroll: [],
    select: [],
    settle: [],
  }

  function dispatch(evt: Event): EventDispatcher {
    listeners[evt].forEach(e => e())
    return self
  }

  function on(evt: Event, cb: Callback): EventDispatcher {
    listeners[evt] = listeners[evt].concat([cb])
    return self
  }

  function off(evt: Event, cb: Callback): EventDispatcher {
    listeners[evt] = listeners[evt].filter(e => e !== cb)
    return self
  }

  const self: EventDispatcher = {
    dispatch,
    off,
    on,
  }
  return Object.freeze(self)
}
