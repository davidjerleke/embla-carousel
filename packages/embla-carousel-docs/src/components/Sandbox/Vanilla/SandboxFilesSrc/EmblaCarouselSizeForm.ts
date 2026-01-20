import { EmblaCarouselType } from 'embla-carousel/components/EmblaCarousel'

const getClampedSlideSize = (
  size: number,
  min: number,
  max: number
): number => {
  return Math.min(Math.max(size, min), max)
}

export const addSizeFormHandler = (
  emblaApi: EmblaCarouselType,
  formNode: HTMLFormElement,
  inputNode: HTMLInputElement,
  min: number,
  max: number,
  initialValue: number,
  property: string,
  unit: string
): void => {
  if (!emblaApi || !formNode || !inputNode) return

  let slideSize = initialValue

  const onSubmit = (event: Event): void => {
    event.preventDefault()

    const emblaNode = emblaApi.rootNode().parentElement
    if (!emblaNode) return

    const clampedSize = getClampedSlideSize(slideSize, min, max)
    slideSize = clampedSize
    emblaNode.style.setProperty(property, `${clampedSize}${unit}`)
  }

  const onChange = (event: Event): void => {
    const input = <HTMLInputElement>event.target
    slideSize = Number(input.value)
  }

  const onBlur = (event: Event): void => {
    const input = <HTMLInputElement>event.target
    slideSize = getClampedSlideSize(Number(input.value), min, max)
  }

  formNode.addEventListener('submit', onSubmit)
  inputNode.addEventListener('change', onChange)
  inputNode.addEventListener('blur', onBlur)
}
