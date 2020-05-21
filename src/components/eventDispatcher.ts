type Callback = () => void
type Listeners = { [key in EmblaEvent]: Callback[] }

export type EmblaEvent =
  | 'init'
  | 'pointerDown'
  | 'pointerUp'
  | 'scroll'
  | 'select'
  | 'settle'
  | 'destroy'
  | 'reInit'
  | 'resize'

export type EventDispatcher = {
  dispatch: (evt: EmblaEvent) => EventDispatcher
  on: (evt: EmblaEvent, cb: Callback) => EventDispatcher
  off: (evt: EmblaEvent, cb: Callback) => EventDispatcher
}

export function EventDispatcher(): EventDispatcher {
  const listeners: Listeners = {
    destroy: [],
    pointerDown: [],
    pointerUp: [],
    init: [],
    reInit: [],
    resize: [],
    scroll: [],
    select: [],
    settle: [],
  }

  function dispatch(evt: EmblaEvent): EventDispatcher {
    listeners[evt].forEach(e => e())
    return self
  }

  function on(evt: EmblaEvent, cb: Callback): EventDispatcher {
    listeners[evt] = listeners[evt].concat([cb])
    return self
  }

  function off(evt: EmblaEvent, cb: Callback): EventDispatcher {
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
