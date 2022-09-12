import { Ref, ref, isRef, watch, onMounted, onUnmounted } from 'vue'
import { canUseDOM, arePluginsEqual } from './utils'
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from 'embla-carousel'

export type EmblaCarouselVueType = [
  Ref<HTMLElement | undefined>,
  Ref<EmblaCarouselType | undefined>,
]

function emblaCarouselVue(
  options: EmblaOptionsType | Ref<EmblaOptionsType> = {},
  plugins: EmblaPluginType[] | Ref<EmblaPluginType[]> = [],
): EmblaCarouselVueType {
  const areOptionsEqual = EmblaCarousel.optionsHandler().areEqual
  const storedOptions = ref(isRef(options) ? options.value : options)
  const storedPlugins = ref(isRef(plugins) ? plugins.value : plugins)
  const emblaNode = ref<HTMLElement>()
  const embla = ref<EmblaCarouselType>()

  function reInit() {
    if (!embla.value) return
    embla.value.reInit(storedOptions.value, storedPlugins.value)
  }

  onMounted(() => {
    if (!canUseDOM() || !emblaNode.value) return
    EmblaCarousel.globalOptions = emblaCarouselVue.globalOptions
    embla.value = EmblaCarousel(
      emblaNode.value,
      storedOptions.value,
      storedPlugins.value,
    )
  })

  onUnmounted(() => {
    if (embla.value) embla.value.destroy()
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

  return [emblaNode, embla]
}

emblaCarouselVue.globalOptions = <EmblaOptionsType | undefined>undefined

export default emblaCarouselVue
