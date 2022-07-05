import { useRef, useEffect, useState, useCallback } from 'react'
import { arePluginsEqual, canUseDOM } from './utils'
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from 'embla-carousel'

type EmblaViewportRefType = <ViewportElement extends HTMLElement>(
  instance: ViewportElement | null,
) => void

export type UseEmblaCarouselType = [
  EmblaViewportRefType,
  EmblaCarouselType | undefined,
]

function useEmblaCarousel(
  options: EmblaOptionsType = {},
  plugins: EmblaPluginType[] = [],
): UseEmblaCarouselType {
  const optionsHandler = useRef(EmblaCarousel.optionsHandler())
  const storedOptions = useRef(options)
  const storedPlugins = useRef(plugins)
  const [embla, setEmbla] = useState<EmblaCarouselType>()
  const [viewport, setViewport] = useState<HTMLElement>()

  const reInit = useCallback(() => {
    if (embla) embla.reInit(storedOptions.current, storedPlugins.current)
  }, [embla])

  useEffect(() => {
    if (canUseDOM() && viewport) {
      EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions
      const newEmbla = EmblaCarousel(
        viewport,
        storedOptions.current,
        storedPlugins.current,
      )
      setEmbla(newEmbla)
      return () => newEmbla.destroy()
    } else {
      setEmbla(undefined)
    }
  }, [viewport, setEmbla])

  useEffect(() => {
    if (optionsHandler.current.areEqual(storedOptions.current, options)) return

    storedOptions.current = options
    reInit()
  }, [options, reInit])

  useEffect(() => {
    if (arePluginsEqual(storedPlugins.current, plugins)) return

    storedPlugins.current = plugins
    reInit()
  }, [plugins, reInit])

  return [<EmblaViewportRefType>setViewport, embla]
}

useEmblaCarousel.globalOptions = <EmblaOptionsType | undefined>undefined

export default useEmblaCarousel
