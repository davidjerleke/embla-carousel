import React, { useCallback, useEffect, useState } from 'react'

export const useDotButton = (
  emblaApi,
  /*__NAV_AUTOPLAY_REPLACE_START__*/
  onButtonClick
  /*__NAV_AUTOPLAY_REPLACE_END__*/
) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
      /*__NAV_AUTOPLAY_REPLACE_START__*/
      if (onButtonClick) onButtonClick(emblaApi)
      /*__NAV_AUTOPLAY_REPLACE_END__*/
    },
    [
      emblaApi,
      /*__NAV_AUTOPLAY_REPLACE_START__*/ onButtonClick /*__NAV_AUTOPLAY_REPLACE_END__*/
    ]
  )

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  }
}

export const DotButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}
