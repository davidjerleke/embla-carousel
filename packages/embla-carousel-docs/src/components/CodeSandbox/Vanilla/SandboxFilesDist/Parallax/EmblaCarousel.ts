import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { setupTweenParallax } from './tween-parallax'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'
 
const OPTIONS: EmblaOptionsType = {}
 
const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
 
const emblaApi = EmblaCarousel(viewportNode, OPTIONS)
const { applyTweenParallax, removeTweenParallax } = setupTweenParallax(emblaApi)
 
emblaApi
  .on('init', applyTweenParallax)
  .on('scroll', applyTweenParallax)
  .on('reInit', applyTweenParallax)
  .on('destroy', removeTweenParallax)
