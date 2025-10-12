import { Ref, MaybeRef, isRef, watch, onBeforeUnmount, shallowRef } from 'vue'
import { areOptionsEqual, arePluginsEqual } from 'embla-carousel-reactive-utils'
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'

export type UseEmblaCarouselType = [
  Ref<HTMLElement | undefined>,
  Ref<EmblaCarouselType | undefined>,
  EmblaCarouselType
]

function useEmblaCarousel(
  options: MaybeRef<EmblaOptionsType> = {},
  plugins: MaybeRef<EmblaPluginType[]> = []
): UseEmblaCarouselType {
  EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions

  const isRefOptions = isRef(options)
  const isRefPlugins = isRef(plugins)

  let storedOptions = isRefOptions ? options.value : options
  let storedPlugins = isRefPlugins ? plugins.value : plugins

  const serverApi = EmblaCarousel(null, storedOptions, storedPlugins)
  const clientApi = shallowRef<EmblaCarouselType>()
  const rootNode = shallowRef<HTMLElement>()

  function reInit(): void {
    if (!clientApi.value) return
    clientApi.value.reInit(storedOptions, storedPlugins)
  }

  watch(
    () => rootNode.value,
    (node) => {
      if (clientApi.value) {
        clientApi.value.destroy()
        clientApi.value = undefined
      }

      if (node) {
        EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions
        clientApi.value = EmblaCarousel(node, storedOptions, storedPlugins)
      }
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    if (clientApi.value) clientApi.value.destroy()
  })

  if (isRefOptions) {
    watch(options, (newOptions) => {
      if (areOptionsEqual(storedOptions, newOptions)) return
      storedOptions = newOptions
      reInit()
    })
  }

  if (isRefPlugins) {
    watch(plugins, (newPlugins) => {
      if (arePluginsEqual(storedPlugins, newPlugins)) return
      storedPlugins = newPlugins
      reInit()
    })
  }

  return [rootNode, clientApi, serverApi]
}

declare namespace useEmblaCarousel {
  let globalOptions: EmblaOptionsType | undefined
}

useEmblaCarousel.globalOptions = undefined

export default useEmblaCarousel
