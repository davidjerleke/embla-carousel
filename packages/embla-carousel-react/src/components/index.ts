import { useRef, useEffect, useState, useMemo } from 'react'
import { areObjectsEqualShallow, arePluginsEqual, canUseDOM } from './utils'
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
    if (!areObjectsEqualShallow(storedOptions.current, options)) {
      storedOptions.current = options
    }
    return storedOptions.current
  }, [storedOptions, options])

  const activePlugins = useMemo<EmblaPluginType[]>(() => {
    if (!arePluginsEqual(storedPlugins.current, plugins)) {
      storedPlugins.current = plugins
    }
    return storedPlugins.current
  }, [storedPlugins, plugins])

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
