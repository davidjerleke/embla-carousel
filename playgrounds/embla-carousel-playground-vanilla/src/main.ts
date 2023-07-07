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

const SLIDE_COUNT = 2
const OPTIONS: EmblaOptionsType = {
  align: 'start',
  containScroll: 'trimSnaps',
  breakpoints: {
    '(max-width: 767px)': {
      dragFree: true,
      loop: false,
      slidesToScroll: 1,
    },
    '(min-width: 768px) and (max-width: 1023px)': {
      loop: true,
      dragFree: false,
      slidesToScroll: 2,
    },
    '(min-width: 1024px)': {
      loop: true,
      dragFree: false,
      slidesToScroll: 3,
    },
  },
}

const emblaNodes = <HTMLElement[]>(
  Array.from(document.querySelectorAll('.embla'))
)

emblaNodes.forEach((emblaNode) => {
  const viewPortNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
  const containerNode = <HTMLElement>(
    emblaNode.querySelector('.embla__container')
  )
  const prevBtnNode = <HTMLElement>(
    emblaNode.querySelector('.embla__button--prev')
  )
  const nextBtnNode = <HTMLElement>(
    emblaNode.querySelector('.embla__button--next')
  )
  const dotsNode = <HTMLElement>(
    emblaNode.parentElement.querySelector('.embla__dots')
  )

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
})

// let startTime = performance.now()

// emblaApi.on('select', () => {
//   startTime = performance.now()
// })

// emblaApi.on('settle', () => {
//   const endTime = performance.now()
//   console.log('settled', endTime - startTime)
// })

// emblaApi.slideNodes().forEach((n, i) => {
//   n.addEventListener('click', () => {
//     console.log('Clicked index: ' + (i + 1))
//   })
// })

// document.addEventListener('click', () => {
//   console.log('Clicked document')
// })
