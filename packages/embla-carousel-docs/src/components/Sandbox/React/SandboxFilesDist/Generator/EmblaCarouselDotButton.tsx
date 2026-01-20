import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'

type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  /*__NAV_AUTOPLAY_REPLACE_START__*/
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
  /*__NAV_AUTOPLAY_REPLACE_END__*/
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.goTo(index)
      /*__NAV_AUTOPLAY_REPLACE_START__*/
      if (onButtonClick) onButtonClick(emblaApi)
      /*__NAV_AUTOPLAY_REPLACE_END__*/
    },
    [
      emblaApi,
      /*__NAV_AUTOPLAY_REPLACE_START__*/ onButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
    ]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.snapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reinit', onInit).on('reinit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const DotButton = (props: PropType) => {
  const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}
