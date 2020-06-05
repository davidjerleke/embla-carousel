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

export type EventEmitter = {
  emit: (evt: EmblaEvent) => EventEmitter
  on: (evt: EmblaEvent, cb: Callback) => EventEmitter
  off: (evt: EmblaEvent, cb: Callback) => EventEmitter
}

export function EventEmitter(): EventEmitter {
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

  function emit(evt: EmblaEvent): EventEmitter {
    listeners[evt].forEach(e => e())
    return self
  }

  function on(evt: EmblaEvent, cb: Callback): EventEmitter {
    listeners[evt] = listeners[evt].concat([cb])
    return self
  }

  function off(evt: EmblaEvent, cb: Callback): EventEmitter {
    listeners[evt] = listeners[evt].filter(e => e !== cb)
    return self
  }

  const self: EventEmitter = {
    emit,
    off,
    on,
  }
  return Object.freeze(self)
}
