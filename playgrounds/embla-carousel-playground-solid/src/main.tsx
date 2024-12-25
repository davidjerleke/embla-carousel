import { Component } from 'solid-js'
import { render } from 'solid-js/web'
import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { RESET_STYLES } from 'components/Layout/GlobalStyles/reset'
import { BASE_STYLES } from 'components/Layout/GlobalStyles/base'
import { FONT_STYLES } from 'components/Layout/GlobalStyles/font'
import { SANDBOX_CSS } from 'components/Sandbox/sandboxStyles'
import { THEME_STYLES } from 'consts/themes'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselDefaultStyles
} from 'components/Examples/examplesCarouselStyles'
import Carousel from './Carousel/Carousel'
import './main.css'

const SSR_ACTIVE = true
const SLIDE_SIZE = 50
const SLIDES = arrayFromNumber(4)

const OPTIONS: EmblaOptionsType = {
  loop: true,
  direction: 'ltr',
  startSnap: 3,
  axis: 'x',
  ssr: SLIDES.map(() => SLIDE_SIZE)
}

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')
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
    styledComponentsStylesToString(
      THEME_STYLES,
      RESET_STYLES,
      BASE_STYLES,
      FONT_STYLES
    ) +
    carouselStyles

  document.head.appendChild(styleElement)
}

injectBaseStyles()

const App: Component = () => {
  return (
    <main class="playground">
      <h1 class="playground__h1">Playground - Solid</h1>
      <Carousel options={OPTIONS} slides={SLIDES} isSsr={SSR_ACTIVE} />
    </main>
  )
}

render(() => <App />, document.getElementById('root') as HTMLElement)
