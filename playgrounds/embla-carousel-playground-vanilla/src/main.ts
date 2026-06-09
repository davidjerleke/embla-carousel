import EmblaCarousel, {
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'
import { styledComponentsStylesToString } from 'utils/styled-components'
import { arrayFromNumber } from 'utils/array'
import { SANDBOX_CSS } from 'content/v9/sandboxes/sandbox-styles'
import { RESET_STYLES } from 'utils/global-styles'
import { BASE_STYLES } from 'utils/global-styles'
import { FONT_STYLES } from 'utils/global-styles'
import { THEME_STYLES } from 'utils/theme'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from 'content/v9/examples/examples-carousel-styles'
import {
  addPrevNextBtnsClickHandlers,
  togglePrevNextBtnsState
} from './Carousel/setupButtons'
import { createSlides } from './Carousel/setupSlides'
import { createDotBtns } from './Carousel/setupDots'
import './main.css'
import Ssr from 'embla-carousel-ssr'

const SSR_ACTIVE = true
const SLIDE_SIZE = 50
const SLIDE_COUNT = 4

const OPTIONS: EmblaOptionsType = {
  loop: true,
  direction: 'ltr',
  startSnap: 3,
  axis: 'x'
}
const PLUGINS: EmblaPluginType[] = [
  Ssr({ slideSizes: arrayFromNumber(SLIDE_COUNT).map(() => SLIDE_SIZE) })
]

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')
  styleElement.id = 'embla-base-styles'
  const carouselStyles = examplesCarouselStyles(
    `${SLIDE_SIZE}%`,
    '1rem',
    OPTIONS,
    styledComponentsStylesToString(
      CONTROLS_STYLES,
      SLIDE_NUMBER_STYLES,
      ARROWS_STYLES,
      DOTS_STYLES
    )
  )

  styleElement.innerHTML =
    SANDBOX_CSS +
    carouselStyles +
    styledComponentsStylesToString(
      THEME_STYLES,
      RESET_STYLES,
      BASE_STYLES,
      FONT_STYLES
    )

  document.head.appendChild(styleElement)
}

injectBaseStyles()

const emblaNodes = <HTMLElement[]>(
  Array.from(document.querySelectorAll('.embla'))
)

emblaNodes.forEach((emblaNode) => {
  const viewPortNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
  const containerNode = <HTMLElement>(
    emblaNode.querySelector('.embla__container')
  )
  const prevButtonNode = <HTMLElement>(
    emblaNode.querySelector('.embla__button--prev')
  )
  const nextButtonNode = <HTMLElement>(
    emblaNode.querySelector('.embla__button--next')
  )

  const dotsNode = <HTMLElement>emblaNode.querySelector('.embla__dots')
  const ssrTextNode = <HTMLElement>document.getElementById('ssr-text')
  const ssrStyleNode = <HTMLElement>document.getElementById('embla-ssr-styles')
  const ssrApi = EmblaCarousel(null, OPTIONS, PLUGINS)

  ssrTextNode.innerHTML = `${SSR_ACTIVE}`
  createSlides(containerNode, SLIDE_COUNT)

  if (SSR_ACTIVE) {
    ssrStyleNode.innerHTML =
      ssrApi.plugins().ssr?.getStyles('.embla__container', '.embla__slide') ||
      ''

    togglePrevNextBtnsState(ssrApi, prevButtonNode, nextButtonNode)
  }

  setTimeout(
    () => {
      const emblaApi = EmblaCarousel(viewPortNode, OPTIONS, PLUGINS)

      if (SSR_ACTIVE) {
        ssrStyleNode.parentElement?.removeChild(ssrStyleNode)
        ssrTextNode.innerHTML = 'false'
      }

      createDotBtns(emblaApi, dotsNode)
      addPrevNextBtnsClickHandlers(emblaApi, prevButtonNode, nextButtonNode)

      //@ts-ignore
      window.embla = emblaApi
    },
    SSR_ACTIVE ? 2000 : 0
  )
})
