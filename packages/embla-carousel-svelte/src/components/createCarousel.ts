import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType
} from 'embla-carousel'
import { areOptionsEqual, arePluginsEqual } from 'embla-carousel-reactive-utils'
import { EmblaCarouselConfigParameterType } from './useEmblaCarousel'
import { getConfigOrFallback } from './utils'

type CarouselType = {
  api: EmblaCarouselType
  update: (config?: EmblaCarouselConfigParameterType, force?: boolean) => void
  destroy: () => void
}

export function createCarousel(
  node: HTMLElement,
  config: EmblaCarouselConfigParameterType | undefined,
  globalOptions: EmblaOptionsType | undefined
): CarouselType {
  let storedConfig = getConfigOrFallback(config)
  let destroyed = false
  EmblaCarousel.globalOptions = globalOptions
  const api = EmblaCarousel(node, storedConfig.options, storedConfig.plugins)

  return {
    api,
    update(config?: EmblaCarouselConfigParameterType, force = false) {
      if (destroyed) return
      const next = getConfigOrFallback(config)
      if (
        !force &&
        areOptionsEqual(storedConfig.options, next.options) &&
        arePluginsEqual(storedConfig.plugins, next.plugins)
      )
        return
      storedConfig = next
      api.reInit(next.options, next.plugins)
    },
    destroy() {
      if (destroyed) return
      destroyed = true
      api.destroy()
    }
  }
}
