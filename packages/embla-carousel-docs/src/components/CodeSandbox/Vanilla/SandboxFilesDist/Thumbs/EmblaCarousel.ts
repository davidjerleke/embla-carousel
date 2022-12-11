import EmblaCarousel, { EmblaOptionsType } from 'embla-carousel'
import {
  addThumbBtnsClickHandlers,
  addToggleThumbBtnsActive,
} from './thumb-buttons'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'
 
const OPTIONS: EmblaOptionsType = {}
const OPTIONS_THUMBS: EmblaOptionsType = {
  containScroll: 'keepSnaps',
  dragFree: true,
}
 
const viewportNodeMainCarousel = <HTMLElement>(
  document.querySelector('.embla__viewport')
)
const viewportNodeThumbCarousel = <HTMLElement>(
  document.querySelector('.embla-thumbs__viewport')
)
const emblaApiMain = EmblaCarousel(viewportNodeMainCarousel, OPTIONS)
const emblaApiThumb = EmblaCarousel(viewportNodeThumbCarousel, OPTIONS_THUMBS)
 
const removeThumbBtnsClickHandlers = addThumbBtnsClickHandlers(
  emblaApiMain,
  emblaApiThumb,
)
const removeToggleThumbBtnsActive = addToggleThumbBtnsActive(
  emblaApiMain,
  emblaApiThumb,
)
 
emblaApiMain
  .on('destroy', removeThumbBtnsClickHandlers)
  .on('destroy', removeToggleThumbBtnsActive)
 
emblaApiThumb
  .on('destroy', removeThumbBtnsClickHandlers)
  .on('destroy', removeToggleThumbBtnsActive)
