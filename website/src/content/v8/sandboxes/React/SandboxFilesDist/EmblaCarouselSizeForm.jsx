import React, { useCallback, useState } from 'react'

const getClampedSlideGap = (size, min, max) => {
  return Math.min(Math.max(size, min), max)
}

const SizeForm = (props) => {
  const { emblaApi, property, min, max, unit, initialValue } = props
  const [slideSize, setSlideSize] = useState(initialValue)

  const onChange = useCallback((event) => {
    setSlideSize(Number(event.target.value))
  }, [])

  const onBlur = useCallback((event) => {
    setSlideSize(getClampedSlideGap(Number(event.target.value), min, max))
  }, [])

  const onSubmit = useCallback(
    (event) => {
      if (!emblaApi) return
      event.preventDefault()

      const emblaNode = emblaApi.rootNode().parentElement
      if (!emblaNode) return

      const clampedSize = getClampedSlideGap(slideSize, min, max)
      setSlideSize(clampedSize)
      emblaNode.style.setProperty(property, `${clampedSize}${unit}`)
    },
    [emblaApi, slideSize, property, min, max, unit]
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
          type="number"
          name="slide-gap"
          min={min}
          max={max}
          value={slideSize}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span>{unit}</span>
      </label>

      <button className="embla__text-form__submit" type="submit">
        Go
      </button>
    </form>
  )
}

export default SizeForm
