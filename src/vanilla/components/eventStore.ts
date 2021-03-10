type EventRemoverType = () => void
type EventHandlerType = EventListener | EventListenerObject | null
type EventOptionsType = boolean | AddEventListenerOptions | undefined

export type EventStoreType = {
  add: (
    node: EventTarget,
    type: keyof WindowEventMap,
    handler: EventHandlerType,
    options?: EventOptionsType,
  ) => EventStoreType
  removeAll: () => EventStoreType
}

export function EventStore(): EventStoreType {
  let listeners: EventRemoverType[] = []

  function add(
    node: EventTarget,
    type: string,
    handler: EventHandlerType,
    options: EventOptionsType = false,
  ): EventStoreType {
    node.addEventListener(type, handler, options)
    listeners.push(() => {
      return node.removeEventListener(type, handler, options)
    })
    return self
  }

  function removeAll(): EventStoreType {
    listeners = listeners.filter(remove => remove())
    return self
  }

  const self: EventStoreType = {
    add,
    removeAll,
  }
  return self
}
