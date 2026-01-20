import { AxisType } from './Axis'
import { EventHandlerType } from './EventHandler'
import { EventStoreType } from './EventStore'
import { ScrollBodyType } from './ScrollBody'
import { ScrollToType } from './ScrollTo'
import { ScrollSnapListType } from './ScrollSnapList'
import { isNumber, WindowType } from './utils'

export type SlideFocusType = {
  init: (ownerWindow: WindowType) => void
}

export function SlideFocus(
  axis: AxisType,
  active: boolean,
  root: HTMLElement,
  slides: HTMLElement[],
  scrollSnapList: ScrollSnapListType,
  scrollTo: ScrollToType,
  scrollBody: ScrollBodyType,
  eventStore: EventStoreType,
  eventHandler: EventHandlerType
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
        (evt: FocusEvent) => onFocus(evt, slideIndex),
        focusListenerOptions
      )
    })
  }

  function onFocus(evt: FocusEvent, slideIndex: number): void {
    const nowTime = new Date().getTime()
    const diffTime = nowTime - lastTabPressTime

    if (diffTime > 10) return

    const event = eventHandler.createEvent('slidefocus', evt)
    const preventDefault = !event.emit()
    if (preventDefault) return

    root[axis.nativeScroll] = 0

    const snapIndex = scrollSnapList.snapBySlide[slideIndex]

    if (!isNumber(snapIndex)) return

    scrollBody.useDuration(0)
    scrollTo.index(snapIndex, 0)
  }

  function onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Tab') lastTabPressTime = new Date().getTime()
  }

  const self: SlideFocusType = {
    init
  }
  return self
}
