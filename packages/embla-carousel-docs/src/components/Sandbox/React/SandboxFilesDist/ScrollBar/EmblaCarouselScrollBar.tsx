import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

type UseScrollBarType = {
  value: number
  onScrollBarChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const useScrollBar = (
  emblaApi: EmblaCarouselType | undefined
): UseScrollBarType => {
  const [value, setValue] = useState(0)

  const scrollToProgress = useCallback(
    (progress: number) => {
      if (!emblaApi) return
      const { animation, limit, target, scrollProgress, scrollBody, scrollTo } =
        emblaApi.internalEngine()

      animation.stop()

      const currentProgress = scrollProgress.get(target)
      const allowedProgress = Math.min(Math.max(progress, 0), 1)
      const progressToTarget = allowedProgress - currentProgress
      const distance = progressToTarget * limit.length * -1

      scrollBody.useDuration(0)
      scrollTo.distance(distance, false)
    },
    [emblaApi]
  )

  const onScrollBarChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!emblaApi) return

      const newProgress = parseFloat(event.target.value)
      setValue(newProgress)
      scrollToProgress(newProgress)
    },
    [emblaApi, scrollToProgress]
  )

  useEffect(() => {
    if (!emblaApi) return

    setValue(emblaApi.scrollProgress())

    emblaApi.on('scroll', (emblaApi) => {
      setValue(emblaApi.scrollProgress())
    })
  }, [emblaApi])

  return {
    value,
    onScrollBarChange
  }
}

type PropType = {
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const ScrollBar: React.FC<PropType> = (props) => {
  const { value, onChange } = props

  return (
    <input
      className="embla__scrollbar"
      onChange={onChange}
      type="range"
      id="slider"
      min="0"
      max="1"
      step="0.001"
      value={value}
    />
  )
}
