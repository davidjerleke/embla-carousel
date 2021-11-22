import { defaultOptions, ClassNamesOptionsType, OptionsType } from './Options'
import { addClass, removeClass } from './utils'
import {
  EmblaCarouselType,
  EmblaPluginType,
  EmblaEventType,
} from 'embla-carousel'

export type ClassNamesType = EmblaPluginType<OptionsType>

function ClassNames(userOptions?: ClassNamesOptionsType): ClassNamesType {
  const options = Object.assign({}, defaultOptions, userOptions)
  const { selected, draggable, dragging } = options
  const selectedEvents: EmblaEventType[] = ['init', 'select', 'pointerUp']
  const draggingEvents: EmblaEventType[] = ['pointerDown', 'pointerUp']
  let carousel: EmblaCarouselType
  let root: HTMLElement
  let slides: HTMLElement[]

  function init(embla: EmblaCarouselType): void {
    carousel = embla
    root = carousel.rootNode()
    slides = carousel.slideNodes()
    const carouselIsDraggable = carousel.internalEngine().options.draggable

    if (carouselIsDraggable) {
      addClass(root, draggable)
    }
    if (dragging) {
      draggingEvents.forEach((evt) => carousel.on(evt, toggleDraggingClass))
    }
    if (selected) {
      selectedEvents.forEach((evt) => carousel.on(evt, toggleSelectedClass))
    }
  }

  function destroy(): void {
    removeClass(root, draggable)
    draggingEvents.forEach((evt) => carousel.off(evt, toggleDraggingClass))
    selectedEvents.forEach((evt) => carousel.off(evt, toggleSelectedClass))
    slides.forEach((slide) => removeClass(slide, selected))
  }

  function toggleDraggingClass(evt: EmblaEventType): void {
    if (evt === 'pointerDown') addClass(root, dragging)
    else removeClass(root, dragging)
  }

  function toggleSelectedClass(): void {
    const inView = carousel.slidesInView(true)
    const notInView = carousel.slidesNotInView(true)
    notInView.forEach((index) => removeClass(slides[index], selected))
    inView.forEach((index) => addClass(slides[index], selected))
  }

  const self: ClassNamesType = {
    name: 'ClassNames',
    options,
    init,
    destroy,
  }
  return self
}

export default ClassNames
