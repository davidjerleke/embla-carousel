const getClampedSlideSize = (size, min, max) => {
  return Math.min(Math.max(size, min), max)
}

export const addGapSizeFormHandler = (
  emblaApi,
  formNode,
  inputNode,
  min,
  max,
  initialValue,
  property,
  unit
) => {
  if (!emblaApi || !formNode || !inputNode) return

  let slideSize = initialValue

  const onSubmit = (event) => {
    event.preventDefault()

    const emblaNode = emblaApi.rootNode().parentElement
    if (!emblaNode) return

    const clampedSize = getClampedSlideSize(slideSize, min, max)
    slideSize = clampedSize
    emblaNode.style.setProperty(property, `${clampedSize}${unit}`)
    emblaApi.reInit()
  }

  const onChange = (event) => {
    const input = event.target
    slideSize = Number(input.value)
    emblaApi.reInit()
  }

  const onBlur = (event) => {
    const input = event.target
    slideSize = getClampedSlideSize(Number(input.value), min, max)
    emblaApi.reInit()
  }

  formNode.addEventListener('submit', onSubmit)
  inputNode.addEventListener('change', onChange)
  inputNode.addEventListener('blur', onBlur)
}
