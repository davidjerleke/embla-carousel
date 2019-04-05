type Callback = () => void
type Event = 'init' | 'select' | 'dragStart' | 'dragEnd' | 'destroy'

interface Subscribers {
  destroy: Callback[]
  dragEnd: Callback[]
  dragStart: Callback[]
  init: Callback[]
  select: Callback[]
}

export interface EventDispatcher {
  dispatch(type: Event): EventDispatcher
  on(type: Event, cb: Callback): EventDispatcher
  off(type: Event, cb: Callback): EventDispatcher
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

  function dispatch(type: Event): EventDispatcher {
    const eventListeners = subscribers[type]
    eventListeners.forEach(e => e())
    return self
  }

  function on(type: Event, cb: Callback): EventDispatcher {
    const eventListeners = subscribers[type]
    subscribers[type] = eventListeners.concat([cb])
    return self
  }

  function off(type: Event, cb: Callback): EventDispatcher {
    const eventListeners = subscribers[type]
    subscribers[type] = eventListeners.filter(e => e !== cb)
    return self
  }

  return Object.assign(self, {
    dispatch,
    off,
    on,
  })
}
