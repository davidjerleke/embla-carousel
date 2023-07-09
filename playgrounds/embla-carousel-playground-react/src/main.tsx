import React from 'react'
import ReactDOM from 'react-dom/client'
import { EmblaOptionsType } from 'embla-carousel-react'
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

const App: React.FC = () => {
  return (
    <main className="playground">
      <h1 className="playground__h1">Playground - React</h1>
      <div className="sandbox__carousel">
        <Carousel options={OPTIONS} slides={SLIDES} />
      </div>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
