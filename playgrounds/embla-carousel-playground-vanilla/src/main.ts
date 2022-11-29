import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { createCarouselArrowsDotsStyles } from 'components/Examples/createCarouselStyles'
import { SANDBOX_CSS } from 'components/CodeSandbox/sandboxStyles'
import { themeStyles } from 'consts/themes'
import { resetStyles } from 'components/Layout/GlobalStyles/reset'
import { baseStyles } from 'components/Layout/GlobalStyles/base'
import { fontStyles } from 'components/Layout/GlobalStyles/font'
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

injectBaseStyles()

const SLIDE_COUNT = 5
const OPTIONS: EmblaOptionsType = {}

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
