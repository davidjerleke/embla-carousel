import React, { useCallback, useState } from 'react'

const getClampedSlideGap = (size, min, max) => {
  return Math.min(Math.max(size, min), max)
}

const SizeForm = (props) => {
  const { emblaApi, property, min, max, unit, initalValue } = props
  const [slideSize, setSlideSize] = useState(initalValue)

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
      className={'embla__form'.concat(` embla__form${property}`)}
      onSubmit={onSubmit}
    >
      <label className="embla__label">
        <span>{property}:</span>
        <input
          className="embla__input"
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

      <button className="embla__submit" type="submit">
        Apply
      </button>
    </form>
  )
}

export default SizeForm
