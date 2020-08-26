import { useRef, useEffect, useState, useMemo } from 'react'
import Carousel, { EmblaCarousel } from '../vanilla'
import { EmblaOptions } from '../vanilla/components/options'
import { areEqualShallow, canUseDOM } from './utils'

type ViewportRef = <ViewportElement extends HTMLElement>(
  instance: ViewportElement | null,
) => void

export type UseEmblaCarousel = [
  ViewportRef,
  EmblaCarousel | undefined,
]

function useEmblaCarousel(
  options: EmblaOptions = {},
): UseEmblaCarousel {
  const [embla, setEmbla] = useState<EmblaCarousel>()
  const [viewport, setViewport] = useState<HTMLElement>()
  const storedOptions = useRef<EmblaOptions>(options)
  const activeOptions = useMemo<EmblaOptions>(() => {
    if (!areEqualShallow(storedOptions.current, options)) {
      storedOptions.current = options
    }
    return storedOptions.current
  }, [storedOptions, options])

  useEffect(() => {
    if (canUseDOM() && viewport) {
      const newEmbla = Carousel(viewport, activeOptions)
      setEmbla(newEmbla)
      return () => newEmbla.destroy()
    } else {
      setEmbla(undefined)
    }
  }, [viewport, activeOptions, setEmbla])

  return [setViewport as ViewportRef, embla]
}

export { useEmblaCarousel }
