import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import { addPrevNextButtonClickHandlers } from '../../EmblaCarouselArrowButtons'
import { updateSelectedSnapDisplay } from '../../EmblaCarouselSelectedSnapDisplay'
import { addRadioFormHandler } from '../../EmblaCarouselRadioForm'
import { addGroupIndicatorHandler } from '../../EmblaCarouselGroupIndicator'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = {}
let dynamicOptions: EmblaOptionsType = { ...OPTIONS }

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')
const snapDisplayNode = <HTMLElement>(
  emblaNode.querySelector('.embla__selected-snap-display')
)

const showSlideGroupsFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__radio-form--showSlideGroups')
)
const showSlideGroupsRadioNodes = <HTMLInputElement[]>(
  Array.from(showSlideGroupsFormNode.querySelectorAll('input[type="radio"]'))
)

const slidesToScrollFormNode = <HTMLFormElement>(
  emblaNode.querySelector('.embla__radio-form--slidesToScroll')
)
const slidesToScrollRadioNodes = <HTMLInputElement[]>(
  Array.from(slidesToScrollFormNode.querySelectorAll('input[type="radio"]'))
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
      slidesToScroll:
        value === 'auto'
          ? 'auto'
          : <EmblaOptionsType['slidesToScroll']>Number(value)
    }
    emblaApi.reInit(dynamicOptions)
  }
)
