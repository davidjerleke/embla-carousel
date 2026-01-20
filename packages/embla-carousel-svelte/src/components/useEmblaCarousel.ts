import { ActionReturn } from 'svelte/action'
import { areOptionsEqual, arePluginsEqual } from 'embla-carousel-reactive-utils'
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'
import { getConfigOrFallback, isHtmlElement } from './utils'

export type EmblaCarouselConfigType = {
  options: EmblaOptionsType
  plugins: EmblaPluginType[]
}

export type EmblaCarouselConfigParameterType = Partial<EmblaCarouselConfigType>

type EmblaCarouselAttributesType = {
  'on:emblainit'?: (evt: CustomEvent<EmblaCarouselType>) => void
  onemblainit?: (evt: CustomEvent<EmblaCarouselType>) => void
}

export type UseEmblaCarouselType = ActionReturn<
  EmblaCarouselConfigParameterType,
  EmblaCarouselAttributesType
>

function useEmblaCarousel(
  emblaNode: HTMLElement,
  emblaConfig?: EmblaCarouselConfigParameterType
): UseEmblaCarouselType

function useEmblaCarousel(
  emblaConfig?: EmblaCarouselConfigParameterType
): EmblaCarouselType

function useEmblaCarousel(
  parameter1?: HTMLElement | EmblaCarouselConfigParameterType,
  parameter2?: EmblaCarouselConfigParameterType
): UseEmblaCarouselType {
  if (!isHtmlElement(parameter1)) {
    EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions

    const emblaConfig = parameter1
    const { options, plugins } = getConfigOrFallback(emblaConfig)
    const serverApi = EmblaCarousel(null, options, plugins)
    return serverApi
  }

  const emblaNode = parameter1
  const emblaConfig = parameter2
  let storedConfig = getConfigOrFallback(emblaConfig)

  EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions
  const clientApi = EmblaCarousel(
    emblaNode,
    storedConfig.options,
    storedConfig.plugins
  )

  emblaNode.dispatchEvent(new CustomEvent('emblainit', { detail: clientApi }))

  return {
    destroy: () => {
      if (clientApi) clientApi.destroy()
    },
    update: (newEmblaConfig) => {
      const newConfig = getConfigOrFallback(newEmblaConfig)

      const optionsChanged = !areOptionsEqual(
        storedConfig.options,
        newConfig.options
      )
      const pluginsChanged = !arePluginsEqual(
        storedConfig.plugins,
        newConfig.plugins
      )

      if (!optionsChanged && !pluginsChanged) return
      storedConfig = newConfig

      if (clientApi) {
        clientApi.reInit(storedConfig.options, storedConfig.plugins)
      }
    }
  }
}

declare namespace useEmblaCarousel {
  let globalOptions: EmblaOptionsType | undefined
}

useEmblaCarousel.globalOptions = undefined

export default useEmblaCarousel
