import { EmblaCarouselType } from './EmblaCarousel'
import { PointerEventType } from './DragTracker'
import { SelectEventType } from './ScrollTo'
import { ScrollEventType } from './ScrollAnimator'
import { ScrollOptimizeEventType } from './ScrollOptimizer'
import { SlidesInViewEventType } from './SlidesInView'

export type EmblaEventType = keyof EmblaEventListType

export type EmblaEventModelType<EventType extends keyof EmblaEventListType> = {
  api: EmblaCarouselType
  type: EmblaEventType
  detail: EmblaEventListType[EventType]
}

export type EmblaCreatedEventType = {
  api: EmblaCarouselType
  emit: () => boolean
}

export type EmblaEventCallbackType<EventType extends keyof EmblaEventListType> =
  (
    api: EmblaCarouselType,
    event: EmblaEventModelType<EventType>
  ) => boolean | void

type EventStoreType = Partial<{
  [EventType in keyof EmblaEventListType]: EmblaEventCallbackType<EventType>[]
}>

export interface EmblaEventListType {
  pointerdown: PointerEventType
  pointermove: PointerEventType
  pointerup: PointerEventType
  slideschanged: MutationRecord[]
  slidesinview: SlidesInViewEventType
  scrolloptimize: ScrollOptimizeEventType
  select: SelectEventType
  scroll: ScrollEventType
  settle: null
  destroy: null
  reinit: null
  resize: ResizeObserverEntry[]
  slidefocus: FocusEvent
}

export type EventHandlerType = {
  init: (emblaApi: EmblaCarouselType) => void
  clear: () => void
  createEvent: <EventType extends keyof EmblaEventListType>(
    type: EventType,
    detail: EmblaEventListType[EventType]
  ) => EmblaCreatedEventType
  on<EventType extends keyof EmblaEventListType>(
    type: EventType,
    callback: EmblaEventCallbackType<EventType>
  ): EventHandlerType
  off<EventType extends keyof EmblaEventListType>(
    type: EventType,
    callback: EmblaEventCallbackType<EventType>
  ): EventHandlerType
}

export function EventHandler(): EventHandlerType {
  let eventStore: EventStoreType = {}
  let api: EmblaCarouselType

  function init(emblaApi: EmblaCarouselType): void {
    api = emblaApi
  }

  function getStore<EventType extends keyof EmblaEventListType>(
    type: EventType
  ): EmblaEventCallbackType<EventType>[] {
    return eventStore[type] || []
  }

  function setStore<EventType extends keyof EmblaEventListType>(
    type: EventType,
    update: (
      listeners: EmblaEventCallbackType<EventType>[]
    ) => EmblaEventCallbackType<EventType>[]
  ): EventHandlerType {
    eventStore = { ...eventStore, [type]: update(getStore(type)) }
    return self
  }

  function createEventModel<EventType extends keyof EmblaEventListType>(
    type: EventType,
    detail: EmblaEventListType[EventType]
  ): EmblaEventModelType<EventType> {
    return { api, type, detail }
  }

  function createEvent<EventType extends keyof EmblaEventListType>(
    type: EventType,
    detail: EmblaEventListType[EventType]
  ): EmblaCreatedEventType {
    const event: EmblaCreatedEventType = {
      api,
      emit: () => emit(type, detail)
    }
    return event
  }

  function emit<EventType extends keyof EmblaEventListType>(
    type: EventType,
    detail: EmblaEventListType[EventType]
  ): boolean {
    const event = createEventModel(type, detail)
    return getStore(type).every((listener) => listener(api, event) !== false)
  }

  function on<EventType extends keyof EmblaEventListType>(
    type: EventType,
    callback: EmblaEventCallbackType<EventType>
  ): EventHandlerType {
    setStore(type, (listeners) => [...listeners, callback])
    return self
  }

  function off<EventType extends keyof EmblaEventListType>(
    type: EventType,
    callback: EmblaEventCallbackType<EventType>
  ): EventHandlerType {
    setStore(type, (listeners) => listeners.filter((cb) => cb !== callback))
    return self
  }

  function clear(): void {
    eventStore = {}
  }

  const self: EventHandlerType = {
    init,
    clear,
    createEvent,
    on,
    off
  }
  return self
}
