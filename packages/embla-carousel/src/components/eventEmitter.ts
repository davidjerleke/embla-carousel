type CallbackType = (evt: EmblaEventType) => void
type ListenersType = Partial<{ [key in EmblaEventType]: CallbackType[] }>

export type EmblaEventType =
  | 'init'
  | 'pointerDown'
  | 'pointerUp'
  | 'scroll'
  | 'select'
  | 'settle'
  | 'destroy'
  | 'reInit'
  | 'resize'

export type EventEmitterType = {
  emit: (evt: EmblaEventType) => EventEmitterType
  on: (evt: EmblaEventType, cb: CallbackType) => EventEmitterType
  off: (evt: EmblaEventType, cb: CallbackType) => EventEmitterType
}

export function EventEmitter(): EventEmitterType {
  const listeners: ListenersType = {}

  function getListeners(evt: EmblaEventType): CallbackType[] {
    const eventListeners = listeners[evt]
    return eventListeners || []
  }

  function emit(evt: EmblaEventType): EventEmitterType {
    getListeners(evt).forEach((e) => e(evt))
    return self
  }

  function on(evt: EmblaEventType, cb: CallbackType): EventEmitterType {
    listeners[evt] = getListeners(evt).concat([cb])
    return self
  }

  function off(evt: EmblaEventType, cb: CallbackType): EventEmitterType {
    listeners[evt] = getListeners(evt).filter((e) => e !== cb)
    return self
  }

  const self: EventEmitterType = {
    emit,
    off,
    on,
  }
  return self
}
