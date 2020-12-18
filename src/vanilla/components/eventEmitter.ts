type Callback = (evt: EmblaEvent) => void
type Listeners = Partial<{ [key in EmblaEvent]: Callback[] }>

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
  const listeners: Listeners = {}

  function getListeners(evt: EmblaEvent): Callback[] {
    const eventListeners = listeners[evt]
    return eventListeners || []
  }

  function emit(evt: EmblaEvent): EventEmitter {
    getListeners(evt).forEach(e => e(evt))
    return self
  }

  function on(evt: EmblaEvent, cb: Callback): EventEmitter {
    listeners[evt] = getListeners(evt).concat([cb])
    return self
  }

  function off(evt: EmblaEvent, cb: Callback): EventEmitter {
    listeners[evt] = getListeners(evt).filter(e => e !== cb)
    return self
  }

  const self: EventEmitter = {
    emit,
    off,
    on,
  }
  return self
}
