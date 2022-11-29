import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from 'embla-carousel'
import { styledComponentsStylesToString } from '../../../packages/embla-carousel-docs/src/utils/styledComponentStylesToString'
import { createCarouselArrowsDotsStyles } from '../../../packages/embla-carousel-docs/src/components/Examples/createCarouselStyles'
import image1 from '../../../packages/embla-carousel-docs/src/assets/images/slide-1.jpg'
import image2 from '../../../packages/embla-carousel-docs/src/assets/images/slide-2.jpg'
import image3 from '../../../packages/embla-carousel-docs/src/assets/images/slide-3.jpg'
import image4 from '../../../packages/embla-carousel-docs/src/assets/images/slide-4.jpg'
import { arrayFromNumber } from '../../../packages/embla-carousel-docs/src/utils/arrayFromNumber'
import { SANDBOX_CSS } from '../../../packages/embla-carousel-docs/src/components/CodeSandbox/sandboxStyles'
import { themeStyles } from '../../../packages/embla-carousel-docs/src/consts/themes'
import { resetStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/reset'
import { baseStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/base'
import { fontStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/font'
import './main.css'

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')

  styleElement.innerHTML =
    SANDBOX_CSS +
    createCarouselArrowsDotsStyles('100%') +
    styledComponentsStylesToString(
      themeStyles,
      resetStyles,
      baseStyles,
      fontStyles,
    )

  styleElement.id = 'baseStyles'
  document.head.appendChild(styleElement)
}

export const images: string[] = [image1, image2, image3, image4]

const imageByIndex = (index: number): string => images[index % images.length]

export const setupDotBtns = (
  dotsArray: HTMLElement[],
  emblaApi: EmblaCarouselType,
): void => {
  dotsArray.forEach((dotNode, i) => {
    dotNode.addEventListener('click', () => emblaApi.scrollTo(i), false)
  })
}

const generateDotBtns = (
  dotsNode: HTMLElement,
  emblaApi: EmblaCarouselType,
): HTMLElement[] => {
  const template = <HTMLElement>document.getElementById('embla-dot-template')

  dotsNode.innerHTML = emblaApi
    .scrollSnapList()
    .reduce((acc) => acc + template.innerHTML, '')

  return [].slice.call(dotsNode.querySelectorAll('.embla__dot'))
}

const selectDotBtn =
  (dotsArray: HTMLElement[], emblaApi: EmblaCarouselType) => (): void => {
    const previous = emblaApi.previousScrollSnap()
    const selected = emblaApi.selectedScrollSnap()
    dotsArray[previous].classList.remove('embla__dot--selected')
    dotsArray[selected].classList.add('embla__dot--selected')
  }

const setupPrevNextBtns = (
  prevBtn: HTMLButtonElement,
  nextBtn: HTMLButtonElement,
  emblaApi: EmblaCarouselType,
): void => {
  prevBtn.addEventListener('click', () => emblaApi.scrollPrev(), false)
  nextBtn.addEventListener('click', () => emblaApi.scrollNext(), false)
}

const togglePrevNextBtnsActive = (
  prevBtn: HTMLButtonElement,
  nextBtn: HTMLButtonElement,
  emblaApi: EmblaCarouselType,
) => {
  return () => {
    if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled')
    else prevBtn.setAttribute('disabled', 'disabled')

    if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled')
    else nextBtn.setAttribute('disabled', 'disabled')
  }
}

const generateSlides = (
  containerNode: HTMLElement,
  count: number = 5,
): HTMLElement => {
  const template = <HTMLElement>document.getElementById('embla-slide-template')

  containerNode.innerHTML = arrayFromNumber(count).reduce(
    (acc, index) =>
      acc +
      template.innerHTML
        .replace('__replace_image_src__', imageByIndex(index).toString())
        .replace('__replace_slide_index__', (index + 1).toString()),
    '',
  )

  return [].slice.call(dotsNode.querySelectorAll('.embla__slide'))
}

injectBaseStyles()

const SLIDE_COUNT = 5
const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewPortNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const containerNode = <HTMLElement>document.querySelector('.embla__container')
const prevBtn = <HTMLButtonElement>(
  emblaNode.querySelector('.embla__button--prev')
)
const nextBtn = <HTMLButtonElement>(
  emblaNode.querySelector('.embla__button--next')
)
const dotsNode = <HTMLElement>document.querySelector('.embla__dots')

generateSlides(containerNode, SLIDE_COUNT)

const emblaApi = EmblaCarousel(viewPortNode, OPTIONS)

const dotsArray = generateDotBtns(dotsNode, emblaApi)
const setSelectedDotBtn = selectDotBtn(dotsArray, emblaApi)
const disablePrevAndNextBtns = togglePrevNextBtnsActive(
  prevBtn,
  nextBtn,
  emblaApi,
)

setupPrevNextBtns(prevBtn, nextBtn, emblaApi)

emblaApi.on('select', setSelectedDotBtn)
emblaApi.on('select', disablePrevAndNextBtns)
emblaApi.on('init', setSelectedDotBtn)
