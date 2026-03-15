import { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from '@vendor/embla-carousel-v8/embla-carousel'

type UseAutoScrollType = {
  autoScrollIsPlaying: boolean
  toggleAutoScroll: () => void
  onAutoScrollButtonClick: (callback: () => void) => void
}

export const useAutoScroll = (
  emblaApi: EmblaCarouselType | undefined
): UseAutoScrollType => {
  const [autoScrollIsPlaying, setAutoScrollIsPlaying] = useState(false)

  const onAutoScrollButtonClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll
      if (!autoScroll) return

      autoScroll.stop()
      callback()
    },
    [emblaApi]
  )

  const toggleAutoScroll = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play
    playOrStop()
  }, [emblaApi])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    setAutoScrollIsPlaying(autoScroll.isPlaying())
    emblaApi
      .on('autoScroll:play', () => setAutoScrollIsPlaying(true))
      .on('autoScroll:stop', () => setAutoScrollIsPlaying(false))
      .on('reInit', () => setAutoScrollIsPlaying(autoScroll.isPlaying()))
  }, [emblaApi])

  return {
    autoScrollIsPlaying,
    toggleAutoScroll,
    onAutoScrollButtonClick
  }
}
