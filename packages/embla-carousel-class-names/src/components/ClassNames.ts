import { defaultOptions, OptionsType } from './Options'
import { addClass, removeClass } from './utils'
import { CreatePluginType } from 'embla-carousel/components/Plugins'
import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import { OptionsHandlerType } from 'embla-carousel/components/OptionsHandler'

declare module 'embla-carousel/components/Plugins' {
  interface EmblaPluginsType {
    classNames?: ClassNamesType
  }
}

export type ClassNamesType = CreatePluginType<{}, OptionsType>

export type ClassNamesOptionsType = ClassNamesType['options']

function ClassNames(userOptions: ClassNamesOptionsType = {}): ClassNamesType {
  let options: OptionsType
  let emblaApi: EmblaCarouselType
  let root: HTMLElement
  let slides: HTMLElement[]
  const selectedEvents: EmblaEventType[] = ['select', 'pointerUp']
  const draggingEvents: EmblaEventType[] = ['pointerDown', 'pointerUp']

  function init(
    emblaApiInstance: EmblaCarouselType,
    optionsHandler: OptionsHandlerType,
  ): void {
    emblaApi = emblaApiInstance

    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, ClassNames.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)
    options = optionsAtMedia(allOptions)

    root = emblaApi.rootNode()
    slides = emblaApi.slideNodes()
    const isDraggable = !!emblaApi.internalEngine().options.watchDrag

    if (isDraggable) {
      addClass(root, options.draggable)
    }
    if (options.dragging) {
      draggingEvents.forEach((evt) => emblaApi.on(evt, toggleDraggingClass))
    }
    if (options.selected) {
      selectedEvents.forEach((evt) => emblaApi.on(evt, toggleSelectedClass))
      toggleSelectedClass()
    }
  }

  function destroy(): void {
    removeClass(root, options.draggable)
    draggingEvents.forEach((evt) => emblaApi.off(evt, toggleDraggingClass))
    selectedEvents.forEach((evt) => emblaApi.off(evt, toggleSelectedClass))
    slides.forEach((slide) => removeClass(slide, options.selected))
  }

  function toggleDraggingClass(
    _: EmblaCarouselType,
    evt: EmblaEventType,
  ): void {
    if (evt === 'pointerDown') addClass(root, options.dragging)
    else removeClass(root, options.dragging)
  }

  function toggleSelectedClass(): void {
    const inView = emblaApi.slidesInView(true)
    const notInView = emblaApi.slidesNotInView(true)
    notInView.forEach((index) => removeClass(slides[index], options.selected))
    inView.forEach((index) => addClass(slides[index], options.selected))
  }

  const self: ClassNamesType = {
    name: 'classNames',
    options: userOptions,
    init,
    destroy,
  }
  return self
}

ClassNames.globalOptions = <ClassNamesOptionsType | undefined>undefined

export default ClassNames
