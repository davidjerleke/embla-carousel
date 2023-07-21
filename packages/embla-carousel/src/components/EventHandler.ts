import { EmblaCarouselType } from './EmblaCarousel'

type CallbackType = (emblaApi: EmblaCarouselType, evt: EmblaEventType) => void
type ListenersType = Partial<{ [key in EmblaEventType]: CallbackType[] }>

export type EmblaEventType =
  | 'init'
  | 'pointerDown'
  | 'pointerUp'
  | 'slidesChanged'
  | 'slidesInView'
  | 'scroll'
  | 'select'
  | 'settle'
  | 'destroy'
  | 'reInit'
  | 'resize'

export type EventHandlerType = {
  init: (emblaApi: EmblaCarouselType) => void
  emit: (evt: EmblaEventType) => EventHandlerType
  on: (evt: EmblaEventType, cb: CallbackType) => EventHandlerType
  off: (evt: EmblaEventType, cb: CallbackType) => EventHandlerType
}

export function EventHandler(): EventHandlerType {
  const listeners: ListenersType = {}
  let api: EmblaCarouselType

  function init(emblaApi: EmblaCarouselType): void {
    api = emblaApi
  }

  function getListeners(evt: EmblaEventType): CallbackType[] {
    return listeners[evt] || []
  }

  function emit(evt: EmblaEventType): EventHandlerType {
    getListeners(evt).forEach((e) => e(api, evt))
    return self
  }

  function on(evt: EmblaEventType, cb: CallbackType): EventHandlerType {
    listeners[evt] = getListeners(evt).concat([cb])
    return self
  }

  function off(evt: EmblaEventType, cb: CallbackType): EventHandlerType {
    listeners[evt] = getListeners(evt).filter((e) => e !== cb)
    return self
  }

  const self: EventHandlerType = {
    init,
    emit,
    off,
    on
  }
  return self
}
