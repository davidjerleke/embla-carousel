import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { EmblaOptionsType } from 'embla-carousel-react'
import { arrayFromNumber } from 'utils/arrayFromNumber'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { createCarouselArrowsDotsStyles } from 'components/Examples/createCarouselStyles'
import { resetStyles } from 'components/Layout/GlobalStyles/reset'
import { baseStyles } from 'components/Layout/GlobalStyles/base'
import { fontStyles } from 'components/Layout/GlobalStyles/font'
import { SANDBOX_CSS } from 'components/CodeSandbox/sandboxStyles'
import { themeStyles } from 'consts/themes'
import Carousel from './Carousel/Carousel'
import './main.css'

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')
  const carouselStyles = createCarouselArrowsDotsStyles()

  styleElement.innerHTML =
    SANDBOX_CSS +
    carouselStyles +
    styledComponentsStylesToString(
      themeStyles,
      resetStyles,
      baseStyles,
      fontStyles,
    )
  styleElement.id = 'baseStyles'
  document.head.appendChild(styleElement)
}

const OPTIONS: EmblaOptionsType = {}
const SLIDES = arrayFromNumber(5)

const App: React.FC = () => {
  useEffect(() => injectBaseStyles(), [])

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
  </React.StrictMode>,
)
