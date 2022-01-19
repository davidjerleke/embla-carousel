type EventNameType = keyof DocumentEventMap | keyof WindowEventMap
type EventHandlerType = (evt: any) => void
type EventOptionsType = boolean | AddEventListenerOptions | undefined
type EventRemoverType = () => void

export type EventStoreType = {
  add: (
    node: EventTarget,
    type: EventNameType,
    handler: EventHandlerType,
    options?: EventOptionsType,
  ) => EventStoreType
  removeAll: () => EventStoreType
}

export function EventStore(): EventStoreType {
  let listeners: EventRemoverType[] = []

  function add(
    node: EventTarget,
    type: EventNameType,
    handler: EventHandlerType,
    options: EventOptionsType = false,
  ): EventStoreType {
    node.addEventListener(type, handler, options)
    listeners.push(() => node.removeEventListener(type, handler, options))
    return self
  }

  function removeAll(): EventStoreType {
    listeners = listeners.filter((remove) => remove())
    return self
  }

  const self: EventStoreType = {
    add,
    removeAll,
  }
  return self
}
