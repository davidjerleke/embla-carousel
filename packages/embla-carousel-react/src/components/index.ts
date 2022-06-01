import { useRef, useEffect, useState, useMemo } from 'react'
import { canUseDOM } from './utils'
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
  const [embla, setEmbla] = useState<EmblaCarouselType>()
  const [viewport, setViewport] = useState<HTMLElement>()
  const storedOptions = useRef<EmblaOptionsType>(options)
  const storedPlugins = useRef<EmblaPluginType[]>(plugins)

  const activeOptions = useMemo<EmblaOptionsType>(() => {
    if (
      !embla
        ?.internalEngine()
        .optionsHandler.areEqual(storedOptions.current, options)
    ) {
      storedOptions.current = options
    }
    return storedOptions.current
  }, [embla, options])

  const activePlugins = useMemo<EmblaPluginType[]>(() => {
    if (
      !embla
        ?.internalEngine()
        .pluginsHandler.areEqual(storedPlugins.current, plugins)
    ) {
      storedPlugins.current = plugins
    }
    return storedPlugins.current
  }, [embla, plugins])

  useEffect(() => {
    if (canUseDOM() && viewport) {
      EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions
      const newEmbla = EmblaCarousel(viewport, activeOptions, activePlugins)
      setEmbla(newEmbla)
      return () => newEmbla.destroy()
    } else {
      setEmbla(undefined)
    }
  }, [viewport, activeOptions, activePlugins, setEmbla])

  return [<EmblaViewportRefType>setViewport, embla]
}

useEmblaCarousel.globalOptions = <EmblaOptionsType | undefined>undefined

export default useEmblaCarousel
