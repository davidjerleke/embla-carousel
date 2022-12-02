import EmblaCarousel from 'embla-carousel';
import { setupTweenParallax } from './carouselParallaxTween';
import '../css/base.css';
import '../css/sandbox.css';
import '../css/embla.css';

const OPTIONS = {};

const emblaNode = document.querySelector('.embla');
const viewportNode = emblaNode.querySelector('.embla__viewport');

const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
const { applyTweenParallax, removeTweenParallax } = setupTweenParallax(emblaApi);

emblaApi
    .on('init', applyTweenParallax)
    .on('scroll', applyTweenParallax)
    .on('reInit', applyTweenParallax)
    .on('destroy', removeTweenParallax);
