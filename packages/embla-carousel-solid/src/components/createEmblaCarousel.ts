import EmblaCarousel, {
  EmblaCarouselType,
  type EmblaOptionsType,
  type EmblaPluginType
} from 'embla-carousel'
import {
  areOptionsEqual,
  arePluginsEqual,
  canUseDOM
} from 'embla-carousel-reactive-utils'
import {
  Accessor,
  Setter,
  createEffect,
  createSignal,
  on,
  onCleanup
} from 'solid-js'

export type CreateEmblaCarouselType = [
  Setter<HTMLElement | undefined>,
  Accessor<EmblaCarouselType | undefined>
]

function createEmblaCarousel(
  options?: Accessor<EmblaOptionsType>,
  plugins?: Accessor<EmblaPluginType[]>
): CreateEmblaCarouselType {
  let storedOptions = options ? options() : {}
  let storedPlugins = plugins ? plugins() : []
  const [emblaApi, setEmblaApi] = createSignal<EmblaCarouselType>()
  const [viewport, setViewport] = createSignal<HTMLElement>()

  function reInit(): void {
    const api = emblaApi()
    if (api) api.reInit(storedOptions, storedPlugins)
  }

  createEffect(
    on(viewport, (viewport) => {
      if (canUseDOM() && viewport) {
        EmblaCarousel.globalOptions = createEmblaCarousel.globalOptions
        const newEmblaApi = EmblaCarousel(
          viewport,
          storedOptions,
          storedPlugins
        )
        setEmblaApi(newEmblaApi)
        onCleanup(() => newEmblaApi.destroy())
      } else {
        setEmblaApi(undefined)
      }
    })
  )

  createEffect(() => {
    if (!canUseDOM()) return
    const newOptions = options ? options() : {}
    if (areOptionsEqual(storedOptions, newOptions)) return
    storedOptions = newOptions
    reInit()
  })

  createEffect(() => {
    if (!canUseDOM()) return
    const newPlugins = plugins ? plugins() : []
    if (arePluginsEqual(storedPlugins, newPlugins)) return
    storedPlugins = newPlugins
    reInit()
  })

  return [setViewport, emblaApi]
}

createEmblaCarousel.globalOptions = <EmblaOptionsType | undefined>undefined

export default createEmblaCarousel
