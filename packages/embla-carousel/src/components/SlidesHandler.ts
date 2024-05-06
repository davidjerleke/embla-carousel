import { EmblaCarouselType } from './EmblaCarousel.js'
import { EventHandlerType } from './EventHandler.js'
import { isBoolean } from './utils.js'

type SlidesHandlerCallbackType = (
  emblaApi: EmblaCarouselType,
  mutations: MutationRecord[]
) => boolean | void

export type SlidesHandlerOptionType = boolean | SlidesHandlerCallbackType

export type SlidesHandlerType = {
  init: (emblaApi: EmblaCarouselType) => void
  destroy: () => void
}

export function SlidesHandler(
  container: HTMLElement,
  eventHandler: EventHandlerType,
  watchSlides: SlidesHandlerOptionType
): SlidesHandlerType {
  let mutationObserver: MutationObserver
  let destroyed = false

  function init(emblaApi: EmblaCarouselType): void {
    if (!watchSlides) return

    function defaultCallback(mutations: MutationRecord[]): void {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          emblaApi.reInit()
          eventHandler.emit('slidesChanged')
          break
        }
      }
    }

    mutationObserver = new MutationObserver((mutations) => {
      if (destroyed) return
      if (isBoolean(watchSlides) || watchSlides(emblaApi, mutations)) {
        defaultCallback(mutations)
      }
    })

    mutationObserver.observe(container, { childList: true })
  }

  function destroy(): void {
    if (mutationObserver) mutationObserver.disconnect()
    destroyed = true
  }

  const self: SlidesHandlerType = {
    init,
    destroy
  }
  return self
}
