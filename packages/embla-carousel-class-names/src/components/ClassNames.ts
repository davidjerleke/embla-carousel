import { defaultOptions, OptionsType, ClassNamesListType } from './Options'
import { addClass, normalizeClassNames, removeClass } from './utils'
import {
  CreatePluginType,
  OptionsHandlerType,
  EmblaCarouselType,
  EmblaEventType
} from 'embla-carousel'

declare module 'embla-carousel' {
  interface EmblaPluginsType {
    classNames: ClassNamesType
  }
}

export type ClassNamesType = CreatePluginType<{}, OptionsType>

export type ClassNamesOptionsType = ClassNamesType['options']

function ClassNames(userOptions: ClassNamesOptionsType = {}): ClassNamesType {
  let options: OptionsType
  let emblaApi: EmblaCarouselType
  let root: HTMLElement
  let slides: HTMLElement[]
  let snappedIndexes: number[] = []
  let inViewIndexes: number[] = []

  const selectedEvents: EmblaEventType[] = ['select']
  const draggingEvents: EmblaEventType[] = ['pointerDown', 'pointerUp']
  const inViewEvents: EmblaEventType[] = ['slidesInView']
  const classNames: ClassNamesListType = {
    snapped: [],
    inView: [],
    draggable: [],
    dragging: [],
    loop: []
  }

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

    const { watchDrag, loop } = emblaApi.internalEngine().options
    const isDraggable = !!watchDrag

    if (options.loop && loop) {
      classNames.loop = normalizeClassNames(options.loop)
      addClass(root, classNames.loop)
    }

    if (options.draggable && isDraggable) {
      classNames.draggable = normalizeClassNames(options.draggable)
      addClass(root, classNames.draggable)
    }

    if (options.dragging) {
      classNames.dragging = normalizeClassNames(options.dragging)
      draggingEvents.forEach((evt) => emblaApi.on(evt, toggleDraggingClass))
    }

    if (options.snapped) {
      classNames.snapped = normalizeClassNames(options.snapped)
      selectedEvents.forEach((evt) => emblaApi.on(evt, toggleSnappedClasses))
      toggleSnappedClasses()
    }

    if (options.inView) {
      classNames.inView = normalizeClassNames(options.inView)
      inViewEvents.forEach((evt) => emblaApi.on(evt, toggleInViewClasses))
      toggleInViewClasses()
    }
  }

  function destroy(): void {
    draggingEvents.forEach((evt) => emblaApi.off(evt, toggleDraggingClass))
    selectedEvents.forEach((evt) => emblaApi.off(evt, toggleSnappedClasses))
    inViewEvents.forEach((evt) => emblaApi.off(evt, toggleInViewClasses))

    removeClass(root, classNames.loop)
    removeClass(root, classNames.draggable)
    removeClass(root, classNames.dragging)
    toggleSlideClasses([], snappedIndexes, classNames.snapped)
    toggleSlideClasses([], inViewIndexes, classNames.inView)

    Object.keys(classNames).forEach((classNameKey) => {
      const key = <keyof ClassNamesListType>classNameKey
      classNames[key] = []
    })
  }

  function toggleDraggingClass(
    _: EmblaCarouselType,
    evt: EmblaEventType
  ): void {
    const toggleClass = evt === 'pointerDown' ? addClass : removeClass
    toggleClass(root, classNames.dragging)
  }

  function toggleSlideClasses(
    addClassIndexes: number[] = [],
    removeClassIndexes: number[] = [],
    classNames: string[]
  ): number[] {
    const removeClassSlides = removeClassIndexes.map((index) => slides[index])
    const addClassSlides = addClassIndexes.map((index) => slides[index])

    removeClassSlides.forEach((slide) => removeClass(slide, classNames))
    addClassSlides.forEach((slide) => addClass(slide, classNames))

    return addClassIndexes
  }

  function toggleSnappedClasses(): void {
    const { slideRegistry } = emblaApi.internalEngine()
    const newSnappedIndexes = slideRegistry[emblaApi.selectedScrollSnap()]

    snappedIndexes = toggleSlideClasses(
      newSnappedIndexes,
      snappedIndexes,
      classNames.snapped
    )
  }

  function toggleInViewClasses(): void {
    const newInViewIndexes = emblaApi.slidesInView()

    inViewIndexes = toggleSlideClasses(
      newInViewIndexes,
      inViewIndexes,
      classNames.inView
    )
  }

  const self: ClassNamesType = {
    name: 'classNames',
    options: userOptions,
    init,
    destroy
  }
  return self
}

declare namespace ClassNames {
  let globalOptions: ClassNamesOptionsType | undefined
}

ClassNames.globalOptions = undefined

export default ClassNames
