import { EmblaCarouselType } from './EmblaCarousel'
import { PointerEventType } from './DragTracker'

export type EmblaEventType = EmblaEventListType[keyof EmblaEventListType]

export type EmblaEventCallbackType<EventType extends keyof EmblaEventListType> =
  (
    emblaApi: EmblaCarouselType,
    eventName: EventType,
    detail: EmblaEventDetailType[EventType]
  ) => void

type EventStoreType = Partial<{
  [EventType in EmblaEventType]: EmblaEventCallbackType<EventType>[]
}>

export interface EmblaEventListType {
  init: 'init'
  pointerdown: 'pointerdown'
  pointerup: 'pointerup'
  slideschanged: 'slideschanged'
  slidesinview: 'slidesinview'
  scroll: 'scroll'
  select: 'select'
  settle: 'settle'
  destroy: 'destroy'
  reinit: 'reinit'
  resize: 'resize'
  slidefocusstart: 'slidefocusstart'
  slidefocus: 'slidefocus'
}

export interface EmblaEventDetailType {
  init: null
  pointerdown: PointerEventType
  pointerup: PointerEventType
  slideschanged: MutationRecord[]
  slidesinview: null
  scroll: null
  select: null
  settle: null
  destroy: null
  reinit: null
  resize: ResizeObserverEntry[]
  slidefocusstart: FocusEvent
  slidefocus: FocusEvent
}

export type EventHandlerType = {
  init: (emblaApi: EmblaCarouselType) => void
  clear: () => void
  emit: <EventType extends keyof EmblaEventListType>(
    eventName: EventType,
    detail: EmblaEventDetailType[EventType]
  ) => EventHandlerType
  on: <EventType extends keyof EmblaEventListType>(
    eventName: EventType,
    callback: EmblaEventCallbackType<EventType>
  ) => EventHandlerType
  off: <EventType extends keyof EmblaEventListType>(
    eventName: EventType,
    callback: EmblaEventCallbackType<EventType>
  ) => EventHandlerType
}

export function EventHandler(): EventHandlerType {
  let store: EventStoreType = {}
  let api: EmblaCarouselType

  function init(emblaApi: EmblaCarouselType): void {
    api = emblaApi
  }

  function getListeners<EventType extends keyof EmblaEventListType>(
    eventName: EventType
  ): EmblaEventCallbackType<EventType>[] {
    return store[eventName] || []
  }

  function emit<EventType extends keyof EmblaEventListType>(
    eventName: EventType,
    detail: EmblaEventDetailType[EventType]
  ): EventHandlerType {
    getListeners(eventName).forEach((e) => e(api, eventName, detail))
    return self
  }

  function on<EventType extends keyof EmblaEventListType>(
    eventName: EventType,
    callback: EmblaEventCallbackType<EventType>
  ): EventHandlerType {
    store = {
      ...store,
      [eventName]: getListeners(eventName).concat([callback])
    }
    return self
  }

  function off<EventType extends keyof EmblaEventListType>(
    eventName: EventType,
    callback: EmblaEventCallbackType<EventType>
  ): EventHandlerType {
    store = {
      ...store,
      [eventName]: getListeners(eventName).filter((e) => e !== callback)
    }
    return self
  }

  function clear(): void {
    store = {}
  }

  const self: EventHandlerType = {
    init,
    clear,
    emit,
    on,
    off
  }
  return self
}
