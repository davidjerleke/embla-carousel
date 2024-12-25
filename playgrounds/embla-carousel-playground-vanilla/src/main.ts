import EmblaCarousel, {
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { SANDBOX_CSS } from 'components/Sandbox/sandboxStyles'
import { RESET_STYLES } from 'components/Layout/GlobalStyles/reset'
import { BASE_STYLES } from 'components/Layout/GlobalStyles/base'
import { FONT_STYLES } from 'components/Layout/GlobalStyles/font'
import { THEME_STYLES } from 'consts/themes'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselDefaultStyles
} from 'components/Examples/examplesCarouselStyles'
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
  startSnap: 3,
  axis: 'x',
  ssr: Array.from(Array(SLIDE_COUNT).keys()).map(() => SLIDE_SIZE)
}
const PLUGINS: EmblaPluginType[] = []

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')
  styleElement.id = 'embla-base-styles'
  const carouselStyles = examplesCarouselDefaultStyles(
    `${SLIDE_SIZE}%`,
    '1rem',
    'x',
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
