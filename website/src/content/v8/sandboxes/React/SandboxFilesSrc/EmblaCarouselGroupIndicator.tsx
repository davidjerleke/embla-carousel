import { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from '@vendor/embla-carousel-v8/embla-carousel'

type UseGroupIndicatorType = string[]

export const useGroupIndicator = (
  emblaApi: EmblaCarouselType | undefined
): UseGroupIndicatorType => {
  const [classNames, setClassNames] = useState<string[]>([])

  const getGroupIndicatorClassNames = useCallback(
    (emblaApi: EmblaCarouselType) => {
      const { slideRegistry } = emblaApi.internalEngine()

      const groupIndicatorClassNames = emblaApi
        .slideNodes()
        .map((_, slideIndex) => {
          const snapIndex = slideRegistry.findIndex((group) =>
            group.includes(slideIndex)
          )
          const slidesInGroup = slideRegistry[snapIndex]
          if (!slidesInGroup) return ''

          const firstIndex = slidesInGroup[0]
          const lastIndex = slidesInGroup[slidesInGroup.length - 1]
          const isSingleSlide = slidesInGroup.length === 1
          const isFirst = !isSingleSlide && firstIndex === slideIndex
          const isLast = !isSingleSlide && lastIndex === slideIndex

          let modifier = 'center'

          if (isSingleSlide) modifier = 'single'
          if (isFirst) modifier = 'start'
          if (isLast) modifier = 'end'

          return `embla__group__indicator--${modifier}`
        })

      setClassNames(groupIndicatorClassNames)
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return
    getGroupIndicatorClassNames(emblaApi)

    emblaApi.on('reInit', getGroupIndicatorClassNames)
  }, [emblaApi])

  return classNames
}
