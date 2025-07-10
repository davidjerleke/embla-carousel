import { EmblaCarouselType } from './EmblaCarousel'
import { PointerEventType } from './DragTracker'
import { SelectEventType } from './ScrollTo'
import { ScrollEventType } from './ScrollAnimator'

export type EmblaEventType = keyof EmblaEventListType

export type EmblaEventModel<EventType extends keyof EmblaEventListType> = {
  api: EmblaCarouselType
  type: EmblaEventType
  detail: EmblaEventListType[EventType]
}

export type EmblaCreatedEventType = {
  api: EmblaCarouselType
  emitBefore: () => boolean
  emitAfter: () => void
}

export type EmblaEventOptionsType = {
  phase?: 'before' | 'after'
}

export type EmblaEventAfterCallbackType<
  EventType extends keyof EmblaEventListType
> = (event: EmblaEventModel<EventType>) => void

export type EmblaEventBeforeCallbackType<
  EventType extends keyof EmblaEventListType
> = (event: EmblaEventModel<EventType>) => boolean

type EmblaEventCallbackType<EventType extends keyof EmblaEventListType> =
  | EmblaEventBeforeCallbackType<EventType>
  | EmblaEventAfterCallbackType<EventType>

type EventAfterStoreType = Partial<{
  [EventType in keyof EmblaEventListType]: EmblaEventAfterCallbackType<EventType>[]
}>

type EventBeforeStoreType = Partial<{
  [EventType in keyof EmblaEventListType]: EmblaEventBeforeCallbackType<EventType>[]
}>

// TODO: Add missing context here to events where it makes sense
export interface EmblaEventListType {
  pointerdown: PointerEventType
  pointermove: PointerEventType
  pointerup: PointerEventType
  slideschanged: MutationRecord[]
  slidesinview: IntersectionObserverEntry[]
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
    callback: EmblaEventBeforeCallbackType<EventType>,
    options: EmblaEventOptionsType & { phase: 'before' }
  ): EventHandlerType
  on<EventType extends keyof EmblaEventListType>(
    type: EventType,
    callback: EmblaEventAfterCallbackType<EventType>,
    options?: EmblaEventOptionsType & { phase?: 'after' }
  ): EventHandlerType
  off<EventType extends keyof EmblaEventListType>(
    type: EventType,
    callback: EmblaEventBeforeCallbackType<EventType>,
    options: EmblaEventOptionsType & { phase: 'before' }
  ): EventHandlerType
  off<EventType extends keyof EmblaEventListType>(
    type: EventType,
    callback: EmblaEventAfterCallbackType<EventType>,
    options?: EmblaEventOptionsType & { phase?: 'after' }
  ): EventHandlerType
}

export function EventHandler(): EventHandlerType {
  let beforeStore: EventBeforeStoreType = {}
  let afterStore: EventAfterStoreType = {}
  let api: EmblaCarouselType

  function init(emblaApi: EmblaCarouselType): void {
    api = emblaApi
  }

  function updateEventStore<EventType extends keyof EmblaEventListType>(
    type: EventType,
    update: (
      listeners: EmblaEventCallbackType<EventType>[]
    ) => EmblaEventCallbackType<EventType>[],
    options?: EmblaEventOptionsType
  ): EventHandlerType {
    const eventOptions = options || {}

    if (eventOptions.phase === 'before') {
      const listeners = getBeforeListeners(type)
      beforeStore = { ...beforeStore, [type]: update(listeners) }
    } else {
      const listeners = getAfterListeners(type)
      afterStore = { ...afterStore, [type]: update(listeners) }
    }
    return self
  }

  function createEventModel<EventType extends keyof EmblaEventListType>(
    type: EventType,
    detail: EmblaEventListType[EventType]
  ): EmblaEventModel<EventType> {
    return { api, type, detail }
  }

  function createEvent<EventType extends keyof EmblaEventListType>(
    type: EventType,
    detail: EmblaEventListType[EventType]
  ): EmblaCreatedEventType {
    const event: EmblaCreatedEventType = {
      api,
      emitBefore: () => emitBefore(type, detail),
      emitAfter: () => emitAfter(type, detail)
    }
    return event
  }

  function getBeforeListeners<EventType extends keyof EmblaEventListType>(
    type: EventType
  ): EmblaEventBeforeCallbackType<EventType>[] {
    return beforeStore[type] || []
  }

  function emitBefore<EventType extends keyof EmblaEventListType>(
    type: EventType,
    detail: EmblaEventListType[EventType]
  ): boolean {
    const eventModel = createEventModel(type, detail)
    const listeners = getBeforeListeners(type)
    return listeners.every((listener) => listener(eventModel))
  }

  function getAfterListeners<EventType extends keyof EmblaEventListType>(
    type: EventType
  ): EmblaEventAfterCallbackType<EventType>[] {
    return afterStore[type] || []
  }

  function emitAfter<EventType extends keyof EmblaEventListType>(
    type: EventType,
    detail: EmblaEventListType[EventType]
  ): void {
    const eventModel = createEventModel(type, detail)
    const listeners = getAfterListeners(type)
    return listeners.forEach((listener) => listener(eventModel))
  }

  function on<EventType extends keyof EmblaEventListType>(
    type: EventType,
    callback: EmblaEventCallbackType<EventType>,
    options?: EmblaEventOptionsType
  ): EventHandlerType {
    return updateEventStore(
      type,
      (currentListeners) => [...currentListeners, callback],
      options
    )
  }

  function off<EventType extends keyof EmblaEventListType>(
    type: EventType,
    callback: EmblaEventCallbackType<EventType>,
    options?: EmblaEventOptionsType
  ): EventHandlerType {
    return updateEventStore(
      type,
      (currentListeners) => currentListeners.filter((cb) => cb !== callback),
      options
    )
  }

  function clear(): void {
    beforeStore = {}
    afterStore = {}
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
