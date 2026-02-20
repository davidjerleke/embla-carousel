import React, { useCallback, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'

type PropType = {
  emblaApi: EmblaCarouselType | undefined
  property: string
  initialValue: string
}

const SlideSizeForm = (props: PropType) => {
  const { emblaApi, property, initialValue } = props
  const [slideSize, setSlideSize] = useState(initialValue)

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSlideSize(event.target.value)
      emblaApi?.reInit()
    },
    [emblaApi]
  )

  const onBlur = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSlideSize(event.target.value)
      emblaApi?.reInit()
    },
    [emblaApi]
  )

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (!emblaApi) return
      event.preventDefault()

      const emblaNode = emblaApi.rootNode().parentElement
      if (!emblaNode) return

      setSlideSize(slideSize)
      emblaNode.style.setProperty(property, `calc(${slideSize})`)
      emblaApi.reInit()
    },
    [emblaApi, slideSize, property]
  )

  return (
    <form
      className={'embla__text-form'.concat(` embla__text-form${property}`)}
      onSubmit={onSubmit}
    >
      <label className="embla__text-form__label">
        <span>{property}:</span>
        <input
          className="embla__text-input"
          type="text"
          name="slide-gap"
          value={slideSize}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
        />
        <span></span>
      </label>

      <button className="embla__text-form__submit" type="submit">
        Go
      </button>
    </form>
  )
}

export default SlideSizeForm
