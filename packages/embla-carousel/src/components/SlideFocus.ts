import { EventHandlerType } from './EventHandler'
import { WatchHandlerType } from './WatchHandler'
import { EventStoreType } from './EventStore'
import { ScrollBodyType } from './ScrollBody'
import { ScrollToType } from './ScrollTo'
import { SlideRegistryType } from './SlideRegistry'
import { isNumber, WindowType } from './utils'

export type SlideFocusType = {
  init: (ownerWindow: WindowType) => void
}

export function SlideFocus(
  active: boolean,
  root: HTMLElement,
  slides: HTMLElement[],
  slideRegistry: SlideRegistryType['slideRegistry'],
  scrollTo: ScrollToType,
  scrollBody: ScrollBodyType,
  eventStore: EventStoreType,
  eventHandler: EventHandlerType,
  watchHandler: WatchHandlerType
): SlideFocusType {
  const focusListenerOptions = { passive: true, capture: true }
  let lastTabPressTime = 0

  function init(ownerWindow: WindowType): void {
    if (!active) return

    eventStore.add(ownerWindow.document, 'keydown', onKeyDown, false)

    slides.forEach((slide, slideIndex) => {
      eventStore.add(
        slide,
        'focus',
        (evt: FocusEvent) => {
          watchHandler.emit('slidefocus', evt, () => onFocus(evt, slideIndex))
        },
        focusListenerOptions
      )
    })
  }

  function onFocus(evt: FocusEvent, index: number): void {
    const nowTime = new Date().getTime()
    const diffTime = nowTime - lastTabPressTime

    if (diffTime > 10) return

    eventHandler.emit('slidefocusstart', evt)
    root.scrollLeft = 0

    const group = slideRegistry.findIndex((group) => group.includes(index))

    if (!isNumber(group)) return

    scrollBody.useDuration(0)
    scrollTo.index(group, 0)

    eventHandler.emit('slidefocus', evt)
  }

  function onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Tab') lastTabPressTime = new Date().getTime()
  }

  const self: SlideFocusType = {
    init
  }
  return self
}
