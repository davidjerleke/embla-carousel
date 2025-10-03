import React, { useCallback, useState } from 'react'

const SLIDE_SIZE_MIN = 30
const SLIDE_SIZE_MAX = 100

const getClampedSlideSize = (size) => {
  return Math.min(Math.max(size, SLIDE_SIZE_MIN), SLIDE_SIZE_MAX)
}

const SlideSizeForm = (props) => {
  const { emblaApi } = props
  const [slideSize, setSlideSize] = useState(70)

  const onChange = useCallback((event) => {
    setSlideSize(Number(event.target.value))
  }, [])

  const onBlur = useCallback((event) => {
    setSlideSize(getClampedSlideSize(Number(event.target.value)))
  }, [])

  const onSubmit = useCallback(
    (event) => {
      if (!emblaApi) return
      event.preventDefault()

      const emblaNode = emblaApi.rootNode().parentElement
      if (!emblaNode) return

      const clampedSize = getClampedSlideSize(slideSize)
      setSlideSize(clampedSize)
      emblaNode.style.setProperty('--slide-size', `${clampedSize}%`)
    },
    [emblaApi, slideSize]
  )

  return (
    <form className="embla__form" onSubmit={onSubmit}>
      <label className="embla__label">
        <span>--slide-size:</span>
        <input
          className="embla__input"
          type="number"
          min={SLIDE_SIZE_MIN}
          max={SLIDE_SIZE_MAX}
          value={slideSize}
          onChange={onChange}
          onBlur={onBlur}
        />
        <span>%</span>
      </label>

      <button className="embla__submit" type="submit">
        Apply
      </button>
    </form>
  )
}

export default SlideSizeForm
