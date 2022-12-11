import EmblaCarousel from 'embla-carousel';
import { setupTweenScale } from './tween-scale';
import '../css/base.css';
import '../css/sandbox.css';
import '../css/embla.css';

const OPTIONS = {};

const emblaNode = document.querySelector('.embla');
const viewportNode = emblaNode.querySelector('.embla__viewport');

const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
const { applyTweenScale, removeTweenScale } = setupTweenScale(emblaApi);

emblaApi
    .on('init', applyTweenScale)
    .on('scroll', applyTweenScale)
    .on('reInit', applyTweenScale)
    .on('destroy', removeTweenScale);
