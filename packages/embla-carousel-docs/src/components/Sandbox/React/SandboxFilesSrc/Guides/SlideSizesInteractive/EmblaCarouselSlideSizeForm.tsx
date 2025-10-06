import React, { useCallback, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

const SLIDE_SIZE_MIN = 30
const SLIDE_SIZE_MAX = 100
const SIZE_PROPERTY = '--slide-size'
const SIZE_UNIT = '%'

const getClampedSlideSize = (size: number): number => {
  return Math.min(Math.max(size, SLIDE_SIZE_MIN), SLIDE_SIZE_MAX)
}

type PropType = {
  emblaApi: EmblaCarouselType | undefined
}

const SlideSizeForm: React.FC<PropType> = (props) => {
  const { emblaApi } = props
  const [slideSize, setSlideSize] = useState(70)

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSlideSize(Number(event.target.value))
  }, [])

  const onBlur = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSlideSize(getClampedSlideSize(Number(event.target.value)))
  }, [])

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (!emblaApi) return
      event.preventDefault()

      const emblaNode = emblaApi.rootNode().parentElement
      if (!emblaNode) return

      const clampedSize = getClampedSlideSize(slideSize)
      setSlideSize(clampedSize)
      emblaNode.style.setProperty(SIZE_PROPERTY, `${clampedSize}${SIZE_UNIT}`)
    },
    [emblaApi, slideSize]
  )

  return (
    <form className="embla__form" onSubmit={onSubmit}>
      <label className="embla__label">
        <span>{SIZE_PROPERTY}:</span>
        <input
          className="embla__input"
          type="number"
          name="slide-size"
          min={SLIDE_SIZE_MIN}
          max={SLIDE_SIZE_MAX}
          value={slideSize}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span>{SIZE_UNIT}</span>
      </label>

      <button className="embla__submit" type="submit">
        Apply
      </button>
    </form>
  )
}

export default SlideSizeForm
