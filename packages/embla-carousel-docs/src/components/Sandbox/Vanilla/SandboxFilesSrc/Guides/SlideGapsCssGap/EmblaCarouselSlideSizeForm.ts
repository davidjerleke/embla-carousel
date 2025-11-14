import { EmblaCarouselType } from 'embla-carousel/components/EmblaCarousel'

const getClampedSlideSize = (
  size: number,
  min: number,
  max: number
): number => {
  return Math.min(Math.max(size, min), max)
}

export const addSlideSizeFormHandler = (
  emblaApi: EmblaCarouselType,
  formNode: HTMLFormElement,
  inputNode: HTMLInputElement,
  initialValue: string,
  property: string
): void => {
  if (!emblaApi || !formNode || !inputNode) return

  let slideSize = initialValue

  const onSubmit = (event: Event): void => {
    event.preventDefault()

    const emblaNode = emblaApi.rootNode().parentElement
    if (!emblaNode) return

    emblaNode.style.setProperty(property, `calc(${slideSize})`)
    emblaApi?.reInit()
  }

  const onChange = (event: Event): void => {
    const input = <HTMLInputElement>event.target
    slideSize = input.value
    emblaApi?.reInit()
  }

  const onBlur = (event: Event): void => {
    const input = <HTMLInputElement>event.target
    slideSize = input.value
    emblaApi?.reInit()
  }

  formNode.addEventListener('submit', onSubmit)
  inputNode.addEventListener('change', onChange)
  inputNode.addEventListener('blur', onBlur)
}
