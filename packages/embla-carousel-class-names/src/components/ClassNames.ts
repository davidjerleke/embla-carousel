import { defaultOptions, OptionsType, ClassNamesListType } from './Options'
import { addClass, normalizeClassNames, removeClass } from './utils'
import {
  CreatePluginType,
  OptionsHandlerType,
  EmblaCarouselType,
  EmblaEventModelType
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
  let isSsr = false
  let destroyed = false

  let root: HTMLElement
  let slides: HTMLElement[]
  let snappedIndexes: number[] = []
  let inViewIndexes: number[] = []

  const classNames: ClassNamesListType = {
    snapped: [],
    inView: [],
    draggable: [],
    pointerDown: [],
    loop: []
  }

  function pluginIsActive(): boolean {
    if (isSsr) return false
    if (destroyed) return false
    return options.active
  }

  function init(
    emblaApiInstance: EmblaCarouselType,
    optionsHandler: OptionsHandlerType
  ): void {
    emblaApi = emblaApiInstance

    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, ClassNames.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)

    destroyed = false
    options = optionsAtMedia(allOptions)
    isSsr = emblaApi.internalEngine().isSsr

    if (!pluginIsActive()) return

    root = emblaApi.rootNode()
    slides = emblaApi.slideNodes()

    const coreOptions = emblaApi.internalEngine().options

    if (options.loop && coreOptions.loop) {
      classNames.loop = normalizeClassNames(options.loop)
      addClass(root, classNames.loop)
    }

    if (options.draggable && coreOptions.draggable) {
      classNames.draggable = normalizeClassNames(options.draggable)
      addClass(root, classNames.draggable)
    }

    if (options.pointerDown) {
      classNames.pointerDown = normalizeClassNames(options.pointerDown)
      emblaApi
        .on('pointerdown', togglePointerDownClass)
        .on('pointerup', togglePointerDownClass)
    }

    if (options.snapped) {
      classNames.snapped = normalizeClassNames(options.snapped)
      emblaApi.on('select', toggleSnappedClasses)
      toggleSnappedClasses()
    }

    if (options.inView) {
      classNames.inView = normalizeClassNames(options.inView)
      emblaApi.on('slidesinview', toggleInViewClasses)
      toggleInViewClasses()
    }
  }

  function destroy(): void {
    if (!pluginIsActive()) return

    emblaApi
      .off('pointerdown', togglePointerDownClass)
      .off('pointerup', togglePointerDownClass)
      .off('select', toggleSnappedClasses)
      .off('slidesinview', toggleInViewClasses)

    removeClass(root, classNames.loop)
    removeClass(root, classNames.draggable)
    removeClass(root, classNames.pointerDown)
    toggleSlideClasses([], snappedIndexes, classNames.snapped)
    toggleSlideClasses([], inViewIndexes, classNames.inView)

    Object.keys(classNames).forEach((classNameKey) => {
      const key = <keyof ClassNamesListType>classNameKey
      classNames[key] = []
    })

    destroyed = true
  }

  function togglePointerDownClass(
    event: EmblaEventModelType<'pointerdown'> | EmblaEventModelType<'pointerup'>
  ): void {
    const toggleClass = event.type === 'pointerdown' ? addClass : removeClass
    toggleClass(root, classNames.pointerDown)
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
    const { slideGroupBySnap } = emblaApi.internalEngine().scrollSnapList
    const newSnappedIndexes = slideGroupBySnap[emblaApi.selectedSnap()]

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
