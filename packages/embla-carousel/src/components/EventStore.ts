type EventNameType = keyof DocumentEventMap | keyof WindowEventMap
type EventHandlerType = (evt: any) => void
type EventOptionsType = boolean | AddEventListenerOptions | undefined
type EventRemoverType = () => void

export type EventStoreType = {
  add: (
    node: EventTarget,
    type: EventNameType,
    handler: EventHandlerType,
    options?: EventOptionsType
  ) => EventStoreType
  clear: () => void
}

export function EventStore(): EventStoreType {
  let listeners: EventRemoverType[] = []

  function add(
    node: EventTarget,
    type: EventNameType,
    handler: EventHandlerType,
    options: EventOptionsType = { passive: true }
  ): EventStoreType {
    let removeListener: EventRemoverType

    if ('addEventListener' in node) {
      node.addEventListener(type, handler, options)
      removeListener = () => node.removeEventListener(type, handler, options)
    } else {
      const legacyMediaQueryList = <MediaQueryList>node
      legacyMediaQueryList.addListener(handler)
      removeListener = () => legacyMediaQueryList.removeListener(handler)
    }

    listeners.push(removeListener)
    return self
  }

  function clear(): void {
    listeners = listeners.filter((remove) => remove())
  }

  const self: EventStoreType = {
    add,
    clear
  }
  return self
}
