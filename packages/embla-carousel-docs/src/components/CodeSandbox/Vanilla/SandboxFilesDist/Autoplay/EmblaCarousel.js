import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import '../css/base.css';
import '../css/sandbox.css';
import '../css/embla.css';

const OPTIONS = {};

const emblaNode = document.querySelector('.embla');
const viewportNode = emblaNode.querySelector('.embla__viewport');

// @ts-ignore
const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [Autoplay()]);
