import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { createCarouselArrowsDotsStyles } from 'components/Examples/createCarouselStyles'
import { SANDBOX_CSS } from 'components/CodeSandbox/sandboxStyles'
import { THEME_STYLES } from 'consts/themes'
import { RESET_STYLES } from 'components/Layout/GlobalStyles/reset'
import { BASE_STYLES } from 'components/Layout/GlobalStyles/base'
import { FONT_STYLES } from 'components/Layout/GlobalStyles/font'
import { createSlides } from './Carousel/setupSlides'
import {
  addPrevNextBtnsClickHandlers,
  togglePrevNextBtnsActive,
} from './Carousel/setupButtons'
import {
  addDotBtnsClickHandlers,
  createDotBtns,
  toggleDotBtnsActive,
} from './Carousel/setupDots'
import './main.css'

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')

  styleElement.innerHTML =
    SANDBOX_CSS +
    createCarouselArrowsDotsStyles('50%') +
    styledComponentsStylesToString(
      THEME_STYLES,
      RESET_STYLES,
      BASE_STYLES,
      FONT_STYLES,
    )

  styleElement.id = 'baseStyles'
  document.head.appendChild(styleElement)
}

injectBaseStyles()

const SLIDE_COUNT = 16
const OPTIONS: EmblaOptionsType = {
  loop: false,
  dragFree: true,
  containScroll: 'trimSnaps',
}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewPortNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const containerNode = <HTMLElement>document.querySelector('.embla__container')
const prevBtnNode = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtnNode = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const dotsNode = <HTMLElement>document.querySelector('.embla__dots')

createSlides(containerNode, SLIDE_COUNT)

const emblaApi = EmblaCarousel(viewPortNode, OPTIONS)
const dotNodes = createDotBtns(emblaApi, dotsNode)
const toggleDotButtonsActive = toggleDotBtnsActive(emblaApi, dotNodes)
const togglePrevNextButtonsActive = togglePrevNextBtnsActive(
  emblaApi,
  prevBtnNode,
  nextBtnNode,
)
addPrevNextBtnsClickHandlers(emblaApi, prevBtnNode, nextBtnNode)
addDotBtnsClickHandlers(emblaApi, dotNodes)

emblaApi.on('select', toggleDotButtonsActive)
emblaApi.on('select', togglePrevNextButtonsActive)
emblaApi.on('init', toggleDotButtonsActive)
emblaApi.reInit()

let startTime = performance.now()

emblaApi.on('select', () => {
  startTime = performance.now()
})

emblaApi.on('settle', () => {
  const endTime = performance.now()
  console.log('settled', endTime - startTime)
})
