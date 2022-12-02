import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { setupTweenOpacity } from './carouselOpacityTween'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)
const { applyTweenOpacity, removeTweenOpacity } = setupTweenOpacity(emblaApi)

emblaApi
  .on('init', applyTweenOpacity)
  .on('scroll', applyTweenOpacity)
  .on('reInit', applyTweenOpacity)
  .on('destroy', removeTweenOpacity)
