import EmblaCarousel, {
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'
import { styledComponentsStylesToString } from 'utils/styled-components'
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
import { createSlides } from './Carousel/setupSlides'
import {
  addPrevNextBtnsClickHandlers,
  togglePrevNextBtnsState
} from './Carousel/setupButtons'
import { createDotBtns } from './Carousel/setupDots'
import './main.css'

const SSR_ACTIVE = true
const SLIDE_SIZE = 50
const SLIDE_COUNT = 4

const OPTIONS: EmblaOptionsType = {
  loop: true,
  direction: 'ltr',
  startSnap: 0,
  axis: 'x',
  ssr: Array.from(Array(SLIDE_COUNT).keys()).map(() => SLIDE_SIZE)
}
const PLUGINS: EmblaPluginType[] = []

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
    ssrStyleNode.innerHTML = ssrApi.ssrStyles('.embla__container')
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
