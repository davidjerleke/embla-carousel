import EmblaCarousel from 'embla-carousel';
import AutoHeight from 'embla-carousel-auto-height';
import { addDotBtnsAndClickHandlers } from '../EmblaCarouselDotButton';
import { addPrevNextBtnsClickHandlers } from '../EmblaCarouselArrowButtons';
import '../css/base.css';
import '../css/sandbox.css';
import '../css/embla.css';

const OPTIONS = {};

const emblaNode = document.querySelector('.embla');
const viewportNode = emblaNode.querySelector('.embla__viewport');
const prevBtn = emblaNode.querySelector('.embla__button--prev');
const nextBtn = emblaNode.querySelector('.embla__button--next');
const dotsNode = document.querySelector('.embla__dots');

const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [AutoHeight()]);

const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(emblaApi, prevBtn, nextBtn);
const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode);

emblaApi
    .on('destroy', removePrevNextBtnsClickHandlers)
    .on('destroy', removeDotBtnsAndClickHandlers);
