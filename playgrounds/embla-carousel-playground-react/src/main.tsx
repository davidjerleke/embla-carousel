import React from 'react'
import ReactDOM from 'react-dom/client'
import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/array'
import { styledComponentsStylesToString } from 'utils/styled-components'
import { RESET_STYLES } from 'utils/global-styles'
import { BASE_STYLES } from 'utils/global-styles'
import { FONT_STYLES } from 'utils/global-styles'
import { SANDBOX_CSS } from 'content/v9/sandboxes/sandbox-styles'
import { THEME_STYLES } from 'utils/theme'
import {
  ARROWS_STYLES,
  CONTROLS_STYLES,
  DOTS_STYLES,
  SLIDE_NUMBER_STYLES,
  examplesCarouselStyles
} from 'content/v9/examples/examples-carousel-styles'
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

const App = () => {
  return (
    <main className="playground">
      <h1 className="playground__h1">Playground - React</h1>
      <Carousel options={OPTIONS} slides={SLIDES} isSsr={SSR_ACTIVE} />
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
