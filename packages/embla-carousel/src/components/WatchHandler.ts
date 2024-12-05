import { EmblaCarouselType } from './EmblaCarousel'
import { PointerEventType } from './DragTracker'

type CallbackType<T> = (context: T, emblaApi: EmblaCarouselType) => void
type StoreType = Partial<{ [K in EmblaWatchType]: WatchType<K, MapType[K]> }>

export type EmblaWatchType = EmblaWatchListType[keyof EmblaWatchListType]

export interface EmblaWatchListType {
  pointerDown: 'pointerDown'
  slidesChanged: 'slidesChanged'
  resize: 'resize'
  slideFocus: 'slideFocus'
}

export type EmblaWatchContextType<EventType extends keyof EmblaWatchListType> =
  MapType[EventType]

type WatchType<K, T> = (
  emblaApi: EmblaCarouselType,
  evt: K,
  context: T
) => boolean

type MapType = {
  pointerDown: PointerEventType
  slidesChanged: MutationRecord[]
  resize: ResizeObserverEntry[]
  slideFocus: FocusEvent
}

export type WatchHandlerType = {
  init: (emblaApi: EmblaCarouselType) => void
  clear: () => void
  emit: <EventType extends keyof EmblaWatchListType>(
    evt: EventType,
    context: MapType[EventType],
    callback: CallbackType<MapType[EventType]>
  ) => void
  on: <EventType extends keyof EmblaWatchListType>(
    evt: EventType,
    watcher: StoreType[EventType]
  ) => WatchHandlerType
  off: <EventType extends keyof EmblaWatchListType>(
    evt: EventType
  ) => WatchHandlerType
}

export function WatchHandler(): WatchHandlerType {
  let store: StoreType = {}
  let api: EmblaCarouselType

  function init(emblaApi: EmblaCarouselType): void {
    api = emblaApi
  }

  function emit<EventType extends keyof EmblaWatchListType>(
    evt: EventType,
    context: MapType[EventType],
    callback: CallbackType<MapType[EventType]>
  ): void {
    const watcher = store[evt]
    const allowCallback = !watcher || watcher(api, evt, context)
    if (allowCallback) callback(context, api)
  }

  function on<EventType extends keyof EmblaWatchListType>(
    evt: EventType,
    watcher: StoreType[EventType]
  ): WatchHandlerType {
    store[evt] = watcher
    return self
  }

  function off<EventType extends keyof EmblaWatchListType>(
    evt: EventType
  ): WatchHandlerType {
    store[evt] = undefined
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
