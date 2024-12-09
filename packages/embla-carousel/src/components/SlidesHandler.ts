import { EmblaCarouselType } from './EmblaCarousel'
import { EventHandlerType } from './EventHandler'
import { WatchHandlerType } from './WatchHandler'

export type SlidesHandlerType = {
  init: () => void
  destroy: () => void
}

export function SlidesHandler(
  active: boolean,
  container: HTMLElement,
  eventHandler: EventHandlerType,
  watchHandler: WatchHandlerType
): SlidesHandlerType {
  let mutationObserver: MutationObserver
  let destroyed = false

  function init(): void {
    if (!active) return

    mutationObserver = new MutationObserver((mutations) => {
      watchHandler.emit('slidesChanged', mutations, onSlidesChange)
    })

    mutationObserver.observe(container, { childList: true })
  }

  function destroy(): void {
    if (mutationObserver) mutationObserver.disconnect()
    destroyed = true
  }

  function onSlidesChange(
    mutations: MutationRecord[],
    emblaApi: EmblaCarouselType
  ): void {
    for (const mutation of mutations) {
      if (destroyed) return

      if (mutation.type === 'childList') {
        emblaApi.reInit()
        eventHandler.emit('slidesChanged', mutations)
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
