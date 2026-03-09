import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import Fade from 'embla-carousel-fade'
import { addDotButtonAndClickHandlers } from '../../EmblaCarouselDotButton'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const dotsNode = <HTMLElement>document.querySelector('.embla__dots')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [Fade()])

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
addDotButtonAndClickHandlers(emblaApi, dotsNode)
