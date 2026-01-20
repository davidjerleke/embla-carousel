import EmblaCarousel from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { updateSelectedSnapDisplay } from '../../EmblaCarouselSelectedSnapDisplay'
import { addSizeFormHandler } from '../../EmblaCarouselSizeForm'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')
const snapDisplayNode = emblaNode.querySelector('.embla__selected-snap-display')

const slideSizeFormNode = emblaNode.querySelector(
  '.embla__text-form--slide-size'
)
const slideSizeInputNode = slideSizeFormNode.querySelector(
  'input[type="number"]'
)

const slideGapSizeFormNode = emblaNode.querySelector(
  '.embla__text-form--slide-spacing'
)
const slideGapSizeInputNode = slideGapSizeFormNode.querySelector(
  'input[type="number"]'
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
updateSelectedSnapDisplay(emblaApi, snapDisplayNode)
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
