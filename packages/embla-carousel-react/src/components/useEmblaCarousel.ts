import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'
import {
  areOptionsEqual,
  arePluginsEqual,
  canUseDOM
} from 'embla-carousel-reactive-utils'
import { useCallback, useEffect, useRef, useState } from 'react'

type EmblaViewportRefType = <ViewportElement extends HTMLElement>(
  instance: ViewportElement | null
) => void

export type UseEmblaCarouselType = [
  EmblaViewportRefType,
  EmblaCarouselType | undefined
]

function useEmblaCarousel(
  options: EmblaOptionsType = {},
  plugins: EmblaPluginType[] = []
): UseEmblaCarouselType {
  const storedOptions = useRef(options)
  const storedPlugins = useRef(plugins)
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType>()
  const [viewport, setViewport] = useState<HTMLElement>()

  const reInit = useCallback(() => {
    if (emblaApi) emblaApi.reInit(storedOptions.current, storedPlugins.current)
  }, [emblaApi])

  useEffect(() => {
    if (canUseDOM() && viewport) {
      EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions
      const newEmblaApi = EmblaCarousel(
        viewport,
        storedOptions.current,
        storedPlugins.current
      )
      setEmblaApi(newEmblaApi)
      return () => newEmblaApi.destroy()
    } else {
      setEmblaApi(undefined)
    }
  }, [viewport, setEmblaApi])

  useEffect(() => {
    if (areOptionsEqual(storedOptions.current, options)) return
    storedOptions.current = options
    reInit()
  }, [options, reInit])

  useEffect(() => {
    if (arePluginsEqual(storedPlugins.current, plugins)) return
    storedPlugins.current = plugins
    reInit()
  }, [plugins, reInit])

  return [<EmblaViewportRefType>setViewport, emblaApi]
}

useEmblaCarousel.globalOptions = <EmblaOptionsType | undefined>undefined

export default useEmblaCarousel
