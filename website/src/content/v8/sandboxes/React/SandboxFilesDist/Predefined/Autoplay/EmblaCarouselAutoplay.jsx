import { useCallback, useEffect, useState } from 'react'

export const useAutoplay = (emblaApi) => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false)

  const onAutoplayButtonClick = useCallback(
    (callback) => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      autoplay.stop()
      callback()
    },
    [emblaApi]
  )

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }, [emblaApi])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    setAutoplayIsPlaying(autoplay.isPlaying())
    emblaApi
      .on('autoplay:play', () => setAutoplayIsPlaying(true))
      .on('autoplay:stop', () => setAutoplayIsPlaying(false))
      .on('reinit', () => setAutoplayIsPlaying(autoplay.isPlaying()))
  }, [emblaApi])

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick
  }
}
