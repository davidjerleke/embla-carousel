type EventHandler = (evt: Event) => void
type EventOptions = AddEventListenerOptions | boolean

type State = {
  listeners: Array<() => void>
}

export type EventStore = {
  add: (
    node: EventTarget,
    type: string,
    handler: EventHandler,
    options?: EventOptions,
  ) => EventStore
  removeAll: () => EventStore
}

export function EventStore(): EventStore {
  const self = {} as EventStore
  const state: State = { listeners: [] }

  function add(
    node: EventTarget,
    type: string,
    handler: EventHandler,
    options: EventOptions = false,
  ): EventStore {
    node.addEventListener(type, handler, options)
    state.listeners.push(() =>
      node.removeEventListener(type, handler, options),
    )
    return self
  }

  function removeAll(): EventStore {
    state.listeners.forEach(remove => remove())
    state.listeners = []
    return self
  }

  return Object.assign(self, {
    add,
    removeAll,
  })
}
