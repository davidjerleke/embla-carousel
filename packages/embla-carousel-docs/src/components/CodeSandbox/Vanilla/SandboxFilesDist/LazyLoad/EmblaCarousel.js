import EmblaCarousel from 'embla-carousel'
import { setupLazyLoadImage } from './lazy-load'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)
const loadImagesInView = setupLazyLoadImage(emblaApi)

emblaApi
  .on('init', loadImagesInView)
  .on('reInit', loadImagesInView)
  .on('select', loadImagesInView)
