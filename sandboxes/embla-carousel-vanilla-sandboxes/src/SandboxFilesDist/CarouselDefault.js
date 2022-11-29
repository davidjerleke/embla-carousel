import EmblaCarousel from 'embla-carousel';
import '../css/base.css';
import '../css/sandbox.css';
import '../css/embla.css';

const OPTIONS = {};

const emblaNode = document.querySelector('.embla');
const viewPortNode = emblaNode.querySelector('.embla__viewport');

// @ts-ignore
const emblaApi = EmblaCarousel(viewPortNode, OPTIONS);
