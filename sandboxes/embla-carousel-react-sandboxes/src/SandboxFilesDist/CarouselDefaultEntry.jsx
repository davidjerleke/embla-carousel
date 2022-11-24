import React from 'react';
import ReactDOM from 'react-dom/client';
import EmblaCarousel from './CarouselDefault';
import Header from './Header';
import Footer from './Footer';

const SLIDE_COUNT = 5;
const OPTIONS = {};
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const App = () => (<main className="sandbox">
    <Header />
    <section className="sandbox__carousel">
      <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
    </section>
    <Footer />
  </main>);

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <App />
  </React.StrictMode>);
