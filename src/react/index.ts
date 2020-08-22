import EmblaCarousel, {
  EmblaCarousel as EmblaCarouselType,
} from '../vanilla'
import { EmblaOptions } from '../vanilla/components/options'
import {
  createElement,
  createRef,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' && window.document?.createElement
  )
}

type PropType = {
  htmlTagName?: string
  children?: ReactNode
  className?: string
}

function useEmblaCarousel(
  options?: EmblaOptions,
): [FC<PropType>, EmblaCarouselType?] {
  const [embla, setEmbla] = useState<EmblaCarouselType>()
  const container = createRef<HTMLElement>()

  useEffect(() => {
    if (canUseDOM() && container?.current) {
      setEmbla(EmblaCarousel(container.current, options))
    }
  }, [container, options])

  useEffect(() => {
    return () => embla?.destroy()
  }, [])

  const Carousel: FC<PropType> = useCallback(
    ({ htmlTagName = 'div', className, children }) => {
      return createElement(
        htmlTagName,
        {
          className,
          ref: container,
          style: { overflow: 'hidden' },
        },
        children,
      )
    },
    [],
  )

  return [Carousel, embla]
}

export { useEmblaCarousel }
