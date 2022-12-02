import EmblaCarousel from 'embla-carousel';
import { addThumbBtnsClickHandlers, addToggleThumbBtnsActive, } from './carouselThumbsButtons';
import '../css/base.css';
import '../css/sandbox.css';
import '../css/embla.css';

const OPTIONS = {};
const OPTIONS_THUMBS = {
    containScroll: 'keepSnaps',
    dragFree: true,
};

const viewportNodeMainCarousel = (document.querySelector('.embla__viewport'));
const viewportNodeThumbCarousel = (document.querySelector('.embla-thumbs__viewport'));
const emblaApiMain = EmblaCarousel(viewportNodeMainCarousel, OPTIONS);
const emblaApiThumb = EmblaCarousel(viewportNodeThumbCarousel, OPTIONS_THUMBS);

const removeThumbBtnsClickHandlers = addThumbBtnsClickHandlers(emblaApiMain, emblaApiThumb);
const removeToggleThumbBtnsActive = addToggleThumbBtnsActive(emblaApiMain, emblaApiThumb);

emblaApiMain
    .on('destroy', removeThumbBtnsClickHandlers)
    .on('destroy', removeToggleThumbBtnsActive);

emblaApiThumb
    .on('destroy', removeThumbBtnsClickHandlers)
    .on('destroy', removeToggleThumbBtnsActive);
