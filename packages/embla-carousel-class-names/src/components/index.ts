import { defaultOptions, ClassNamesOptionsType, OptionsType } from './Options'
import { addClass, removeClass } from './utils'
import { CreatePluginType } from 'embla-carousel/components/Plugins'
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaEventType,
} from 'embla-carousel'

export type ClassNamesType = CreatePluginType<{}, OptionsType>

function ClassNames(userOptions?: ClassNamesOptionsType): ClassNamesType {
  const optionsHandler = EmblaCarousel.optionsHandler()
  const optionsBase = optionsHandler.merge(
    defaultOptions,
    ClassNames.globalOptions,
  )
  let options: ClassNamesType['options']
  let carousel: EmblaCarouselType

  let root: HTMLElement
  let slides: HTMLElement[]
  const selectedEvents: EmblaEventType[] = ['select', 'pointerUp']
  const draggingEvents: EmblaEventType[] = ['pointerDown', 'pointerUp']

  function init(embla: EmblaCarouselType): void {
    carousel = embla
    options = optionsHandler.atMedia(self.options)
    root = carousel.rootNode()
    slides = carousel.slideNodes()
    const isDraggable = carousel.internalEngine().options.draggable

    if (isDraggable) {
      addClass(root, options.draggable)
    }
    if (options.dragging) {
      draggingEvents.forEach((evt) => carousel.on(evt, toggleDraggingClass))
    }
    if (options.selected) {
      selectedEvents.forEach((evt) => carousel.on(evt, toggleSelectedClass))
      toggleSelectedClass()
    }
  }

  function destroy(): void {
    removeClass(root, options.draggable)
    draggingEvents.forEach((evt) => carousel.off(evt, toggleDraggingClass))
    selectedEvents.forEach((evt) => carousel.off(evt, toggleSelectedClass))
    slides.forEach((slide) => removeClass(slide, options.selected))
  }

  function toggleDraggingClass(evt: EmblaEventType): void {
    if (evt === 'pointerDown') addClass(root, options.dragging)
    else removeClass(root, options.dragging)
  }

  function toggleSelectedClass(): void {
    const inView = carousel.slidesInView(true)
    const notInView = carousel.slidesNotInView(true)
    notInView.forEach((index) => removeClass(slides[index], options.selected))
    inView.forEach((index) => addClass(slides[index], options.selected))
  }

  const self: ClassNamesType = {
    name: 'classNames',
    options: optionsHandler.merge(optionsBase, userOptions),
    init,
    destroy,
  }
  return self
}

ClassNames.globalOptions = <ClassNamesOptionsType | undefined>undefined

export default ClassNames
