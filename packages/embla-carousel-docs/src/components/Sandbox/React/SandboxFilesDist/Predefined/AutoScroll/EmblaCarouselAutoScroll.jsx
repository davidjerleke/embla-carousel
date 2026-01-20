import { useCallback, useEffect, useState } from 'react'

export const useAutoScroll = (emblaApi) => {
  const [autoScrollIsPlaying, setAutoScrollIsPlaying] = useState(false)

  const onAutoScrollButtonClick = useCallback(
    (callback) => {
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
      .on('autoscroll:play', () => setAutoScrollIsPlaying(true))
      .on('autoscroll:stop', () => setAutoScrollIsPlaying(false))
      .on('reinit', () => setAutoScrollIsPlaying(autoScroll.isPlaying()))
  }, [emblaApi])

  return {
    autoScrollIsPlaying,
    toggleAutoScroll,
    onAutoScrollButtonClick
  }
}
