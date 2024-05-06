import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { addPrevNextBtnsClickHandlers } from '../EmblaCarouselArrowButtons';
import { addPlayBtnListeners, addNavBtnListeners } from './EmblaCarouselAutoplay';
import '../css/base.css';
import '../css/sandbox.css';
import '../css/embla.css';

const OPTIONS = {};

const emblaNode = document.querySelector('.embla');
const viewportNode = emblaNode.querySelector('.embla__viewport');
const prevBtn = emblaNode.querySelector('.embla__button--prev');
const nextBtn = emblaNode.querySelector('.embla__button--next');
const playBtn = document.querySelector('.embla__play');

const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
    Autoplay({ playOnInit: false, delay: 3000 })
]);

const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(emblaApi, prevBtn, nextBtn);
const removePlayBtnListeners = addPlayBtnListeners(emblaApi, playBtn);
const removeNavBtnListeners = addNavBtnListeners(emblaApi, prevBtn, nextBtn);

emblaApi
    .on('destroy', removePrevNextBtnsClickHandlers)
    .on('destroy', removePlayBtnListeners)
    .on('destroy', removeNavBtnListeners);
