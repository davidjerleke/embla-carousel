import { useRef, useEffect, useState, useMemo } from 'react'
import EmblaCarousel, { EmblaCarouselType } from '../vanilla'
import { EmblaOptionsType } from '../vanilla/options'
import { areEqualShallow, canUseDOM } from './utils'

type ViewportRefType = <ViewportElement extends HTMLElement>(
  instance: ViewportElement | null,
) => void

export type UseEmblaCarouselType = [
  ViewportRefType,
  EmblaCarouselType | undefined,
]

function useEmblaCarousel(
  options: EmblaOptionsType = {},
): UseEmblaCarouselType {
  const [embla, setEmbla] = useState<EmblaCarouselType>()
  const [viewport, setViewport] = useState<HTMLElement>()
  const storedOptions = useRef<EmblaOptionsType>(options)
  const activeOptions = useMemo<EmblaOptionsType>(() => {
    if (!areEqualShallow(storedOptions.current, options)) {
      storedOptions.current = options
    }
    return storedOptions.current
  }, [storedOptions, options])

  useEffect(() => {
    if (canUseDOM() && viewport) {
      const newEmbla = EmblaCarousel(viewport, activeOptions)
      setEmbla(newEmbla)
      return () => newEmbla.destroy()
    } else {
      setEmbla(undefined)
    }
  }, [viewport, activeOptions, setEmbla])

  return [setViewport as ViewportRefType, embla]
}

export { useEmblaCarousel }
