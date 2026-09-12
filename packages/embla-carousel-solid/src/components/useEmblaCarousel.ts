import { Accessor, Setter, createEffect, createSignal } from 'solid-js'
import EmblaCarousel, {
  EmblaCarouselType,
  type EmblaOptionsType,
  type EmblaPluginType
} from 'embla-carousel'
import { areOptionsEqual, arePluginsEqual } from 'embla-carousel-reactive-utils'
import { optionsOrFallback, pluginsOrFallback } from './utils'

export type UseEmblaCarouselType = [
  Setter<HTMLElement | undefined>,
  Accessor<EmblaCarouselType | undefined>,
  EmblaCarouselType
]

function useEmblaCarousel(
  options?: Accessor<EmblaOptionsType | undefined>,
  plugins?: Accessor<EmblaPluginType[] | undefined>
): UseEmblaCarouselType {
  EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions

  let storedOptions = optionsOrFallback(options)
  let storedPlugins = pluginsOrFallback(plugins)

  const serverApi = EmblaCarousel(null, storedOptions, storedPlugins)
  const [clientApi, setClientApi] = createSignal<EmblaCarouselType>()
  const [rootNode, setRootNode] = createSignal<HTMLElement>()

  function reInit(): void {
    const api = clientApi()
    if (api) api.reInit(storedOptions, storedPlugins)
  }

  createEffect(
    () => rootNode(),
    (node) => {
      if (!node) {
        setClientApi(undefined)
        return
      }

      EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions
      const newEmblaApi = EmblaCarousel(node, storedOptions, storedPlugins)
      setClientApi(newEmblaApi)
      return () => newEmblaApi.destroy()
    }
  )

  createEffect(
    () => optionsOrFallback(options),
    (newOptions) => {
      if (areOptionsEqual(storedOptions, newOptions)) return
      storedOptions = newOptions
      reInit()
    }
  )

  createEffect(
    () => pluginsOrFallback(plugins),
    (newPlugins) => {
      if (arePluginsEqual(storedPlugins, newPlugins)) return
      storedPlugins = newPlugins
      reInit()
    }
  )

  return [setRootNode, clientApi, serverApi]
}

declare namespace useEmblaCarousel {
  let globalOptions: EmblaOptionsType | undefined
}

useEmblaCarousel.globalOptions = undefined

export default useEmblaCarousel
