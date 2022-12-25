import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { setupTweenScale } from './tween-scale'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)
const { applyTweenScale, removeTweenScale } = setupTweenScale(emblaApi)

emblaApi
  .on('init', applyTweenScale)
  .on('scroll', applyTweenScale)
  .on('reInit', applyTweenScale)
  .on('destroy', removeTweenScale)
