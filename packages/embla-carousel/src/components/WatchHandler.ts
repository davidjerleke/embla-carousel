import { EmblaCarouselType } from './EmblaCarousel'
import {
  EmblaEventListType,
  EmblaEventType,
  EmblaEventDetailType
} from './EventHandler'

export type EmblaWatchType = EmblaWatchListType[keyof EmblaWatchListType]

export type EmblaWatchCallbackType<EventType extends keyof EmblaEventListType> =
  (
    emblaApi: EmblaCarouselType,
    eventName: EventType,
    detail: EmblaEventDetailType[EventType]
  ) => boolean

type WatchStoreType = Partial<{
  [EventType in EmblaEventType]: EmblaWatchCallbackType<EventType>
}>

export interface EmblaWatchListType
  extends Pick<
    EmblaEventListType,
    'pointerdown' | 'slideschanged' | 'resize' | 'slidefocus'
  > {}

type IntenalCallbackType<EventType extends keyof EmblaWatchListType> = (
  detail: EmblaEventDetailType[EventType],
  emblaApi: EmblaCarouselType
) => void

export type WatchHandlerType = {
  init: (emblaApi: EmblaCarouselType) => void
  clear: () => void
  emit: <EventType extends keyof EmblaWatchListType>(
    eventName: EventType,
    detail: EmblaEventDetailType[EventType],
    callback: IntenalCallbackType<EventType>
  ) => void
  on: <EventType extends keyof EmblaWatchListType>(
    eventName: EventType,
    watcher: WatchStoreType[EventType]
  ) => WatchHandlerType
  off: <EventType extends keyof EmblaWatchListType>(
    eventName: EventType
  ) => WatchHandlerType
}

export function WatchHandler(): WatchHandlerType {
  let store: WatchStoreType = {}
  let api: EmblaCarouselType

  function init(emblaApi: EmblaCarouselType): void {
    api = emblaApi
  }

  function emit<EventType extends keyof EmblaWatchListType>(
    eventName: EventType,
    detail: EmblaEventDetailType[EventType],
    callback: IntenalCallbackType<EventType>
  ): void {
    const watcher = store[eventName]
    const allowCallback = !watcher || watcher(api, eventName, detail)
    if (allowCallback) callback(detail, api)
  }

  function on<EventType extends keyof EmblaWatchListType>(
    eventName: EventType,
    watcher: WatchStoreType[EventType]
  ): WatchHandlerType {
    store[eventName] = watcher
    return self
  }

  function off<EventType extends keyof EmblaWatchListType>(
    eventName: EventType
  ): WatchHandlerType {
    store[eventName] = undefined
    return self
  }

  function clear(): void {
    store = {}
  }

  const self: WatchHandlerType = {
    init,
    clear,
    emit,
    on,
    off
  }
  return self
}
