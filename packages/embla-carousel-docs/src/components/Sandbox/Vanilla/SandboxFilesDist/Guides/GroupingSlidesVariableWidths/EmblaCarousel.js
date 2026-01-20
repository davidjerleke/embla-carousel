import EmblaCarousel from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { updateSelectedSnapDisplay } from '../../EmblaCarouselSelectedSnapDisplay'
import { addRadioFormHandler } from '../../EmblaCarouselRadioForm'
import { addGroupIndicatorHandler } from '../../EmblaCarouselGroupIndicator'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = {}
let dynamicOptions = { ...OPTIONS }

const emblaNode = document.querySelector('.embla')
const viewportNode = emblaNode.querySelector('.embla__viewport')
const prevBtn = emblaNode.querySelector('.embla__button--prev')
const nextBtn = emblaNode.querySelector('.embla__button--next')
const snapDisplayNode = emblaNode.querySelector('.embla__selected-snap-display')

const showSlideGroupsFormNode = emblaNode.querySelector(
  '.embla__radio-form--showSlideGroups'
)
const showSlideGroupsRadioNodes = Array.from(
  showSlideGroupsFormNode.querySelectorAll('input[type="radio"]')
)

const slidesToScrollFormNode = emblaNode.querySelector(
  '.embla__radio-form--slidesToScroll'
)
const slidesToScrollRadioNodes = Array.from(
  slidesToScrollFormNode.querySelectorAll('input[type="radio"]')
)

const emblaApi = EmblaCarousel(viewportNode, OPTIONS)
const updateGroupIndicator = addGroupIndicatorHandler(emblaApi)

addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn)
updateSelectedSnapDisplay(emblaApi, snapDisplayNode)
addRadioFormHandler(
  showSlideGroupsFormNode,
  showSlideGroupsRadioNodes,
  updateGroupIndicator
)
addRadioFormHandler(
  slidesToScrollFormNode,
  slidesToScrollRadioNodes,
  (value) => {
    dynamicOptions = {
      ...dynamicOptions,
      slidesToScroll: value === 'auto' ? 'auto' : Number(value)
    }
    emblaApi.reInit(dynamicOptions)
  }
)
