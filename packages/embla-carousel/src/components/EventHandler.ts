import { EmblaCarouselType } from './EmblaCarousel.js'

type CallbackType = (emblaApi: EmblaCarouselType, evt: EmblaEventType) => void
type ListenersType = Partial<{ [key in EmblaEventType]: CallbackType[] }>

export type EmblaEventType = EmblaEventListType[keyof EmblaEventListType]

export interface EmblaEventListType {
  init: 'init'
  pointerDown: 'pointerDown'
  pointerUp: 'pointerUp'
  slidesChanged: 'slidesChanged'
  slidesInView: 'slidesInView'
  scroll: 'scroll'
  select: 'select'
  settle: 'settle'
  destroy: 'destroy'
  reInit: 'reInit'
  resize: 'resize'
}

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
