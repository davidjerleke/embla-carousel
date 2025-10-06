import EmblaCarousel from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { addSizeFormHandler } from './EmblaCarouselSizeForm'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')

const slideSizeFormNode = emblaNode.querySelector('.embla__form--slide-size')
const slideSizeInputNode = slideSizeFormNode.querySelector('.embla__input')

const slideGapSizeFormNode = emblaNode.querySelector(
  '.embla__form--slide-spacing'
)
const slideGapSizeInputNode =
  slideGapSizeFormNode.querySelector('.embla__input')

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
addSizeFormHandler(
  emblaApi,
  slideSizeFormNode,
  slideSizeInputNode,
  30,
  100,
  70,
  '--slide-size',
  '%'
)
addSizeFormHandler(
  emblaApi,
  slideGapSizeFormNode,
  slideGapSizeInputNode,
  0,
  50,
  10,
  '--slide-spacing',
  'px'
)
