type EventRemover = () => void
type EventHandler = EventListener | EventListenerObject | null
type EventOptions = boolean | AddEventListenerOptions | undefined

export type EventStore = {
  add: (
    node: EventTarget,
    type: keyof WindowEventMap,
    handler: EventHandler,
    options?: EventOptions,
  ) => EventStore
  removeAll: () => EventStore
}

export function EventStore(): EventStore {
  let listeners: EventRemover[] = []

  function add(
    node: EventTarget,
    type: string,
    handler: EventHandler,
    options: EventOptions = false,
  ): EventStore {
    node.addEventListener(type, handler, options)
    listeners.push(() => {
      return node.removeEventListener(type, handler, options)
    })
    return self
  }

  function removeAll(): EventStore {
    listeners = listeners.filter(remove => remove())
    return self
  }

  const self: EventStore = {
    add,
    removeAll,
  }
  return self
}
