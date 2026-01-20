import { EventHandlerType } from './EventHandler'
import { WindowType } from './utils'

export type SlidesHandlerType = {
  init: (ownerWindow: WindowType) => void
  destroy: () => void
}

export function SlidesHandler(
  active: boolean,
  container: HTMLElement,
  eventHandler: EventHandlerType
): SlidesHandlerType {
  let mutationObserver: MutationObserver
  let destroyed = false

  function init(ownerWindow: WindowType): void {
    if (!active) return

    mutationObserver = new ownerWindow.MutationObserver(onSlidesChange)

    mutationObserver.observe(container, { childList: true })
  }

  function destroy(): void {
    if (mutationObserver) mutationObserver.disconnect()
    destroyed = true
  }

  function onSlidesChange(mutations: MutationRecord[]): void {
    const event = eventHandler.createEvent('slideschanged', mutations)
    const preventDefault = !event.emit()
    if (preventDefault) return

    for (const mutation of mutations) {
      if (destroyed) return

      if (mutation.type === 'childList') {
        event.api.reInit()
        break
      }
    }
  }

  const self: SlidesHandlerType = {
    init,
    destroy
  }
  return self
}
