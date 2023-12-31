import { Ref, ref, isRef, watch, onMounted, onBeforeUnmount } from 'vue'
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
  const storedOptions = ref(isRef(options) ? options.value : options)
  const storedPlugins = ref(isRef(plugins) ? plugins.value : plugins)
  const emblaNode = ref<HTMLElement>()
  const emblaApi = ref<EmblaCarouselType>()

  function reInit() {
    if (!emblaApi.value) return
    emblaApi.value.reInit(storedOptions.value, storedPlugins.value)
  }

  onMounted(() => {
    if (!canUseDOM() || !emblaNode.value) return
    EmblaCarousel.globalOptions = emblaCarouselVue.globalOptions
    emblaApi.value = EmblaCarousel(
      emblaNode.value,
      storedOptions.value,
      storedPlugins.value
    )
  })

  onBeforeUnmount(() => {
    if (emblaApi.value) emblaApi.value.destroy()
  })

  if (isRef(options)) {
    watch(options, (newOptions) => {
      if (areOptionsEqual(storedOptions.value, newOptions)) return
      storedOptions.value = newOptions
      reInit()
    })
  }

  if (isRef(plugins)) {
    watch(plugins, (newPlugins) => {
      if (arePluginsEqual(storedPlugins.value, newPlugins)) return
      storedPlugins.value = newPlugins
      reInit()
    })
  }

  return [emblaNode, emblaApi]
}

emblaCarouselVue.globalOptions = <EmblaOptionsType | undefined>undefined

export default emblaCarouselVue
