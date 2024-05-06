import React from 'react';
import ReactDOM from 'react-dom/client';
import EmblaCarousel from './Autoplay/EmblaCarousel';
import Header from './Header';
import Footer from './Footer';
import '../css/base.css';
import '../css/sandbox.css';
import '../css/embla.css';

const OPTIONS = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const App = () => (<>
    <Header />
    <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
    <Footer />
  </>);

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <App />
  </React.StrictMode>);
