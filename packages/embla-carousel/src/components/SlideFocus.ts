import { EventStoreType } from './EventStore.js'
import { ScrollBodyType } from './ScrollBody.js'
import { ScrollToType } from './ScrollTo.js'
import { SlideRegistryType } from './SlideRegistry.js'
import { isNumber } from './utils.js'

export type SlideFocusType = {
  init: () => void
}

export function SlideFocus(
  root: HTMLElement,
  slides: HTMLElement[],
  slideRegistry: SlideRegistryType['slideRegistry'],
  scrollTo: ScrollToType,
  scrollBody: ScrollBodyType,
  eventStore: EventStoreType
): SlideFocusType {
  let lastTabPressTime = 0

  function init(): void {
    eventStore.add(document, 'keydown', registerTabPress, false)
    slides.forEach(addSlideFocusEvent)
  }

  function registerTabPress(event: KeyboardEvent): void {
    if (event.code === 'Tab') lastTabPressTime = new Date().getTime()
  }

  function addSlideFocusEvent(slide: HTMLElement): void {
    const focus = (): void => {
      const nowTime = new Date().getTime()
      const diffTime = nowTime - lastTabPressTime

      if (diffTime > 10) return

      root.scrollLeft = 0
      const index = slides.indexOf(slide)
      const group = slideRegistry.findIndex((group) => group.includes(index))

      if (!isNumber(group)) return

      scrollBody.useDuration(0)
      scrollTo.index(group, 0)
    }

    eventStore.add(slide, 'focus', focus, {
      passive: true,
      capture: true
    })
  }

  const self: SlideFocusType = {
    init
  }
  return self
}
