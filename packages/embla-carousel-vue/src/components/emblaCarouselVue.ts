import { Ref, isRef, watch, onMounted, onBeforeUnmount, shallowRef } from 'vue'
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

export type EmblaCarouselVueType = [
  Ref<HTMLElement | undefined>,
  Ref<EmblaCarouselType | undefined>
]

function emblaCarouselVue(
  options: EmblaOptionsType | Ref<EmblaOptionsType> = {},
  plugins: EmblaPluginType[] | Ref<EmblaPluginType[]> = []
): EmblaCarouselVueType {
  const isRefOptions = isRef(options)
  const isRefPlugins = isRef(plugins)

  let storedOptions = isRefOptions ? options.value : options
  let storedPlugins = isRefPlugins ? plugins.value : plugins

  const emblaNode = shallowRef<HTMLElement>()
  const emblaApi = shallowRef<EmblaCarouselType>()

  function reInit() {
    if (!emblaApi.value) return
    emblaApi.value.reInit(storedOptions, storedPlugins)
  }

  onMounted(() => {
    if (!canUseDOM() || !emblaNode.value) return
    EmblaCarousel.globalOptions = emblaCarouselVue.globalOptions
    emblaApi.value = EmblaCarousel(
      emblaNode.value,
      storedOptions,
      storedPlugins
    )
  })

  onBeforeUnmount(() => {
    if (emblaApi.value) emblaApi.value.destroy()
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

  return [emblaNode, emblaApi]
}

declare namespace emblaCarouselVue {
  let globalOptions: EmblaOptionsType | undefined
}

emblaCarouselVue.globalOptions = undefined

export default emblaCarouselVue
