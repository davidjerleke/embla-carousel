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

function useEmblaCarousel<EmblaPluginsType extends EmblaPluginType>(
  options: EmblaOptionsType = {},
  plugins: EmblaPluginsType[] = [],
): UseEmblaCarouselType {
  const [embla, setEmbla] = useState<EmblaCarouselType>()
  const [viewport, setViewport] = useState<HTMLElement>()
  const storedOptions = useRef<EmblaOptionsType>(options)
  const storedPlugins = useRef<EmblaPluginsType[]>(plugins)

  const activeOptions = useMemo<EmblaOptionsType>(() => {
    if (!areObjectsEqualShallow(storedOptions.current, options)) {
      storedOptions.current = options
    }
    return storedOptions.current
  }, [storedOptions, options])

  const activePlugins = useMemo<EmblaPluginsType[]>(() => {
    if (!arePluginsEqual(storedPlugins.current, plugins)) {
      storedPlugins.current = plugins
    }
    return storedPlugins.current
  }, [storedPlugins, plugins])

  useEffect(() => {
    if (canUseDOM() && viewport) {
      const newEmbla = EmblaCarousel(viewport, activeOptions, activePlugins)
      setEmbla(newEmbla)
      return () => newEmbla.destroy()
    } else {
      setEmbla(undefined)
    }
  }, [viewport, activeOptions, activePlugins, setEmbla])

  return [<EmblaViewportRefType>setViewport, embla]
}

export default useEmblaCarousel
