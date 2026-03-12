import EmblaCarousel, {
  EmblaOptionsType
} from '@vendor/embla-carousel-v8/embla-carousel'
import AutoScroll from '@vendor/embla-carousel-v8/embla-carousel-auto-scroll'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import {
  addPlayButtonListeners,
  addNavButtonListeners
} from './EmblaCarouselAutoScroll'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const playBtn = <HTMLElement>document.querySelector('.embla__play')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
  AutoScroll({ playOnInit: false })
])

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
addPlayButtonListeners(emblaApi, playBtn)
addNavButtonListeners(emblaApi, prevBtn, nextBtn)
