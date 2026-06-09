const getClampedSlideSize = (size, min, max) => {
  return Math.min(Math.max(size, min), max)
}

export const addSizeFormHandler = (
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
  }

  const onChange = (event) => {
    const input = event.target
    slideSize = Number(input.value)
  }

  const onBlur = (event) => {
    const input = event.target
    slideSize = getClampedSlideSize(Number(input.value), min, max)
  }

  formNode.addEventListener('submit', onSubmit)
  inputNode.addEventListener('change', onChange)
  inputNode.addEventListener('blur', onBlur)
}
