import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { updateSelectedSnapDisplay } from '../../EmblaCarouselSelectedSnapDisplay'
import { addSlideSizeFormHandler } from './EmblaCarouselSlideSizeForm'
import { addGapSizeFormHandler } from './EmblaCarouselGapSizeForm'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const snapDisplayNode = <HTMLElement>(
  emblaNode.querySelector('.embla__selected-snap-display')
)

const slideSizeFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__text-form--slide-size')
)
const slideSizeInputNode = <HTMLInputElement>(
  slideSizeFormNode.querySelector('input[type="text"]')
)

const slideGapSizeFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__text-form--slide-gap')
)
const slideGapSizeInputNode = <HTMLInputElement>(
  slideGapSizeFormNode.querySelector('input[type="number"]')
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
updateSelectedSnapDisplay(emblaApi, snapDisplayNode)
addSlideSizeFormHandler(
  emblaApi,
  slideSizeFormNode,
  slideSizeInputNode,
  '100%',
  '--slide-size'
)
addGapSizeFormHandler(
  emblaApi,
  slideGapSizeFormNode,
  slideGapSizeInputNode,
  0,
  50,
  0,
  '--slide-gap',
  'px'
)
