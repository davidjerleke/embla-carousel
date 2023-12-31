import { Component } from 'solid-js'
import { render } from 'solid-js/web'
import { EmblaOptionsType } from 'embla-carousel'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { createCarouselArrowsDotsStyles } from 'components/Examples/createCarouselStyles'
import { RESET_STYLES } from 'components/Layout/GlobalStyles/reset'
import { BASE_STYLES } from 'components/Layout/GlobalStyles/base'
import { FONT_STYLES } from 'components/Layout/GlobalStyles/font'
import { SANDBOX_CSS } from 'components/Sandbox/sandboxStyles'
import { THEME_STYLES } from 'consts/themes'
import Carousel from './Carousel/Carousel'
import './main.css'

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')
  const carouselStyles = createCarouselArrowsDotsStyles()

  styleElement.innerHTML =
    styledComponentsStylesToString(
      THEME_STYLES,
      RESET_STYLES,
      BASE_STYLES,
      FONT_STYLES
    ) +
    carouselStyles +
    SANDBOX_CSS

  document.head.appendChild(styleElement)
}

const OPTIONS: EmblaOptionsType = {}
const SLIDES = arrayFromNumber(5)

injectBaseStyles()

const App: Component = () => {
  return (
    <main class="playground">
      <h1 class="playground__h1">Playground - Solid</h1>
      <div class="sandbox__carousel">
        <Carousel options={OPTIONS} slides={SLIDES} />
      </div>
    </main>
  )
}

render(() => <App />, document.getElementById('root') as HTMLElement)
