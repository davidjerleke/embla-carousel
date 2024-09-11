import { ActionReturn } from 'svelte/action'
import {
  areOptionsEqual,
  arePluginsEqual,
  canUseDOM
} from 'embla-carousel-reactive-utils'
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'

type EmblaCarouselParameterType = {
  options: EmblaOptionsType
  plugins: EmblaPluginType[]
}

type EmblaCarouselAttributesType = {
  'on:emblaInit'?: (evt: CustomEvent<EmblaCarouselType>) => void
  onemblaInit?: (evt: CustomEvent<EmblaCarouselType>) => void
}

export type EmblaCarouselSvelteType = ActionReturn<
  EmblaCarouselParameterType,
  EmblaCarouselAttributesType
>

function emblaCarouselSvelte(
  emblaNode: HTMLElement,
  emblaConfig: EmblaCarouselParameterType = { options: {}, plugins: [] }
): EmblaCarouselSvelteType {
  let storedEmblaConfig = emblaConfig
  let emblaApi: EmblaCarouselType

  if (canUseDOM()) {
    EmblaCarousel.globalOptions = emblaCarouselSvelte.globalOptions
    emblaApi = EmblaCarousel(
      emblaNode,
      storedEmblaConfig.options,
      storedEmblaConfig.plugins
    )
    emblaApi.on('init', () =>
      emblaNode.dispatchEvent(
        new CustomEvent('emblaInit', { detail: emblaApi })
      )
    )
  }

  return {
    destroy: () => {
      if (emblaApi) emblaApi.destroy()
    },
    update: (newEmblaConfig) => {
      const optionsChanged = !areOptionsEqual(
        storedEmblaConfig.options,
        newEmblaConfig.options
      )
      const pluginsChanged = !arePluginsEqual(
        storedEmblaConfig.plugins,
        newEmblaConfig.plugins
      )

      if (!optionsChanged && !pluginsChanged) return
      storedEmblaConfig = newEmblaConfig

      if (emblaApi) {
        emblaApi.reInit(storedEmblaConfig.options, storedEmblaConfig.plugins)
      }
    }
  }
}

declare namespace emblaCarouselSvelte {
  let globalOptions: EmblaOptionsType | undefined
}

emblaCarouselSvelte.globalOptions = undefined

export default emblaCarouselSvelte
