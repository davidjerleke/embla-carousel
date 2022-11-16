import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './CarouselDefault'
import Header from './Header'
import Footer from './Footer'
 
const SLIDE_COUNT = 5
const slides = Array.from(Array(SLIDE_COUNT).keys())
 
const App = () => (
  <main>
    <Header />
    <EmblaCarousel slides={slides} />
    <Footer />
  </main>
)
 
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
