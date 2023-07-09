import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { createCarouselArrowsDotsStyles } from 'components/Examples/createCarouselStyles'
import { SANDBOX_CSS } from 'components/Sandbox/sandboxStyles'
import { THEME_STYLES } from 'consts/themes'
import { RESET_STYLES } from 'components/Layout/GlobalStyles/reset'
import { BASE_STYLES } from 'components/Layout/GlobalStyles/base'
import { FONT_STYLES } from 'components/Layout/GlobalStyles/font'
import { createSlides } from './Carousel/setupSlides'
import { addPrevNextBtnsClickHandlers } from './Carousel/setupButtons'
import {
  addDotBtnsClickHandlers,
  createDotBtns,
  toggleDotBtnsActive
} from './Carousel/setupDots'
import './main.css'

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')

  styleElement.innerHTML =
    SANDBOX_CSS +
    createCarouselArrowsDotsStyles() +
    styledComponentsStylesToString(
      THEME_STYLES,
      RESET_STYLES,
      BASE_STYLES,
      FONT_STYLES
    )

  document.head.appendChild(styleElement)
}

injectBaseStyles()

const SLIDE_COUNT = 16
const OPTIONS: EmblaOptionsType = {
  // loop: true,
  dragFree: true,
  containScroll: 'trimSnaps'
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
  addPrevNextBtnsClickHandlers(emblaApi, prevBtnNode, nextBtnNode)
  addDotBtnsClickHandlers(emblaApi, dotNodes)

  emblaApi.on('select', toggleDotButtonsActive)
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
