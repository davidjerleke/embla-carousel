import { EmblaCarouselType } from './EmblaCarousel'

type CallbackType = (emblaApi: EmblaCarouselType, evt: EmblaEventType) => void
type StoreType = Partial<{ [key in EmblaEventType]: CallbackType[] }>

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
  slideFocusStart: 'slideFocusStart'
  slideFocus: 'slideFocus'
}

export type EventHandlerType = {
  init: (emblaApi: EmblaCarouselType) => void
  clear: () => void
  emit: (evt: EmblaEventType) => EventHandlerType
  on: (evt: EmblaEventType, callback: CallbackType) => EventHandlerType
  off: (evt: EmblaEventType, callback: CallbackType) => EventHandlerType
}

export function EventHandler(): EventHandlerType {
  let store: StoreType = {}
  let api: EmblaCarouselType

  function init(emblaApi: EmblaCarouselType): void {
    api = emblaApi
  }

  function getListeners(evt: EmblaEventType): CallbackType[] {
    return store[evt] || []
  }

  function emit(evt: EmblaEventType): EventHandlerType {
    getListeners(evt).forEach((e) => e(api, evt))
    return self
  }

  function on(evt: EmblaEventType, callback: CallbackType): EventHandlerType {
    store[evt] = getListeners(evt).concat([callback])
    return self
  }

  function off(evt: EmblaEventType, callback: CallbackType): EventHandlerType {
    store[evt] = getListeners(evt).filter((e) => e !== callback)
    return self
  }

  function clear(): void {
    store = {}
  }

  const self: EventHandlerType = {
    init,
    emit,
    off,
    on,
    clear
  }
  return self
}
