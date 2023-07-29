import { defaultOptions, OptionsType } from './Options'
import { nodeListToArray, addClass, removeClass } from './utils'
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
  const selectedEvents: EmblaEventType[] = ['select']
  const draggingEvents: EmblaEventType[] = ['pointerDown', 'pointerUp']
  const inViewEvents: EmblaEventType[] = ['slidesInView']

  function init(
    emblaApiInstance: EmblaCarouselType,
    optionsHandler: OptionsHandlerType
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
    if (options.snapped) {
      selectedEvents.forEach((evt) => emblaApi.on(evt, toggleSnappedClasses))
      toggleSnappedClasses()
    }
    if (options.inView) {
      inViewEvents.forEach((evt) => emblaApi.on(evt, toggleInViewClasses))
      toggleInViewClasses()
    }
  }

  function destroy(): void {
    removeClass(root, options.draggable)
    draggingEvents.forEach((evt) => emblaApi.off(evt, toggleDraggingClass))
    selectedEvents.forEach((evt) => emblaApi.off(evt, toggleSnappedClasses))
    inViewEvents.forEach((evt) => emblaApi.off(evt, toggleInViewClasses))
    slides.forEach((slide) => removeClass(slide, options.snapped))
  }

  function toggleDraggingClass(
    _: EmblaCarouselType,
    evt: EmblaEventType
  ): void {
    if (evt === 'pointerDown') addClass(root, options.dragging)
    else removeClass(root, options.dragging)
  }

  function toggleSlideClasses(slideIndexes: number[], className: string): void {
    const container = emblaApi.containerNode()
    const slideNodeList = container.querySelectorAll(`.${className}`)
    const removeClassSlides = nodeListToArray(slideNodeList)

    removeClassSlides.forEach((slide) => removeClass(slide, className))
    slideIndexes.forEach((index) => addClass(slides[index], className))
  }

  function toggleSnappedClasses(): void {
    const { slideRegistry } = emblaApi.internalEngine()
    const slideIndexes = slideRegistry[emblaApi.selectedScrollSnap()]
    toggleSlideClasses(slideIndexes, options.snapped)
  }

  function toggleInViewClasses(): void {
    const slideIndexes = emblaApi.slidesInView()
    toggleSlideClasses(slideIndexes, options.inView)
  }

  const self: ClassNamesType = {
    name: 'classNames',
    options: userOptions,
    init,
    destroy
  }
  return self
}

ClassNames.globalOptions = <ClassNamesOptionsType | undefined>undefined

export default ClassNames
