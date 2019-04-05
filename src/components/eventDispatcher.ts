export type Callback = () => void
export type Event =
  | 'init'
  | 'select'
  | 'dragStart'
  | 'dragEnd'
  | 'destroy'

type Subscribers = {
  destroy: Callback[]
  dragEnd: Callback[]
  dragStart: Callback[]
  init: Callback[]
  select: Callback[]
}

export type EventDispatcher = {
  dispatch: (evt: Event) => EventDispatcher
  on: (evt: Event, cb: Callback) => EventDispatcher
  off: (evt: Event, cb: Callback) => EventDispatcher
}

export function EventDispatcher(): EventDispatcher {
  const self = {} as EventDispatcher
  const subscribers: Subscribers = {
    destroy: [],
    dragEnd: [],
    dragStart: [],
    init: [],
    select: [],
  }

  function dispatch(evt: Event): EventDispatcher {
    const eventListeners = subscribers[evt]
    eventListeners.forEach(e => e())
    return self
  }

  function on(evt: Event, cb: Callback): EventDispatcher {
    const eventListeners = subscribers[evt]
    subscribers[evt] = eventListeners.concat([cb])
    return self
  }

  function off(evt: Event, cb: Callback): EventDispatcher {
    const eventListeners = subscribers[evt]
    subscribers[evt] = eventListeners.filter(e => e !== cb)
    return self
  }

  return Object.assign(self, {
    dispatch,
    off,
    on,
  })
}
