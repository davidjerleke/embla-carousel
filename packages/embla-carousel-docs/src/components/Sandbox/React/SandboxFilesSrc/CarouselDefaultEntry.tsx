import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './Autoplay/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import Header from './Header'
import Footer from './Footer'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const App: React.FC = () => (
  <>
    <Header />
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    <Footer />
  </>
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
