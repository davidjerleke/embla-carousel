import EmblaCarousel from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { updateSelectedSnapDisplay } from '../../EmblaCarouselSelectedSnapDisplay'
import { addSlideSizeFormHandler } from './EmblaCarouselSlideSizeForm'
import { addGapSizeFormHandler } from './EmblaCarouselGapSizeForm'
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
const slideSizeInputNode = slideSizeFormNode.querySelector('input[type="text"]')

const slideGapSizeFormNode = emblaNode.querySelector(
  '.embla__text-form--slide-gap'
)
const slideGapSizeInputNode = slideGapSizeFormNode.querySelector(
  'input[type="number"]'
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
