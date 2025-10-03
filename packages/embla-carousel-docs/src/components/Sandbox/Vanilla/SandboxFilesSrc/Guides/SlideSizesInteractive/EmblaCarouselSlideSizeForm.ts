import { EmblaCarouselType } from 'embla-carousel/components/EmblaCarousel'

const SLIDE_SIZE_MIN = 30
const SLIDE_SIZE_MAX = 100

const getClampedSlideSize = (size: number): number => {
  return Math.min(Math.max(size, SLIDE_SIZE_MIN), SLIDE_SIZE_MAX)
}

export const addSlideSizeFormHandler = (
  emblaApi: EmblaCarouselType,
  formNode: HTMLFormElement,
  inputNode: HTMLInputElement
): void => {
  if (!emblaApi || !formNode || !inputNode) return

  let slideSize = 70

  const onSubmit = (event: Event): void => {
    event.preventDefault()

    const emblaNode = emblaApi.rootNode().parentElement
    if (!emblaNode) return

    const clampedSize = getClampedSlideSize(slideSize)
    slideSize = clampedSize
    emblaNode.style.setProperty('--slide-size', `${clampedSize}%`)
  }

  const onChange = (event: Event): void => {
    const input = <HTMLInputElement>event.target
    slideSize = Number(input.value)
  }

  const onBlur = (event: Event): void => {
    const input = <HTMLInputElement>event.target
    slideSize = getClampedSlideSize(Number(input.value))
  }

  formNode.addEventListener('submit', onSubmit)
  inputNode.addEventListener('change', onChange)
  inputNode.addEventListener('blur', onBlur)
}
