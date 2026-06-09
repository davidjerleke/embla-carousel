const getClampedSlideSize = (size, min, max) => {
  return Math.min(Math.max(size, min), max)
}

export const addSlideSizeFormHandler = (
  emblaApi,
  formNode,
  inputNode,
  initialValue,
  property
) => {
  if (!emblaApi || !formNode || !inputNode) return

  let slideSize = initialValue

  const onSubmit = (event) => {
    event.preventDefault()

    const emblaNode = emblaApi.rootNode().parentElement
    if (!emblaNode) return

    emblaNode.style.setProperty(property, `calc(${slideSize})`)
    emblaApi?.reInit()
  }

  const onChange = (event) => {
    const input = event.target
    slideSize = input.value
    emblaApi?.reInit()
  }

  const onBlur = (event) => {
    const input = event.target
    slideSize = input.value
    emblaApi?.reInit()
  }

  formNode.addEventListener('submit', onSubmit)
  inputNode.addEventListener('change', onChange)
  inputNode.addEventListener('blur', onBlur)
}
