import EmblaCarousel from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import {
  addPlayButtonListeners,
  addNavButtonListeners
} from './EmblaCarouselAutoplay'
import { addAutoplayProgressListeners } from './EmblaCarouselAutoplayProgress'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')
const playBtn = document.querySelector('.embla__play')
const progressNode = document.querySelector('.embla__progress')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
  Autoplay({ delay: 3000 })
])

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
addPlayButtonListeners(emblaApi, playBtn)
addNavButtonListeners(emblaApi, prevBtn, nextBtn)
addAutoplayProgressListeners(emblaApi, progressNode)

emblaApi.plugins().autoplay?.play()
