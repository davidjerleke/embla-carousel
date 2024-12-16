import { Engine, EngineType } from './Engine'
import { EventStore } from './EventStore'
import { WatchHandler, WatchHandlerType } from './WatchHandler'
import { EventHandler, EventHandlerType } from './EventHandler'
import { defaultOptions, EmblaOptionsType, OptionsType } from './Options'
import { OptionsHandler } from './OptionsHandler'
import { PluginsHandler } from './PluginsHandler'
import { EmblaPluginsType, EmblaPluginType } from './Plugins'
import { isNumber, isString, WindowType } from './utils'

export type EmblaCarouselType = {
  canScrollNext: () => boolean
  canScrollPrev: () => boolean
  containerNode: () => HTMLElement
  internalEngine: () => EngineType
  destroy: () => void
  onWatch: WatchHandlerType['on']
  offWatch: WatchHandlerType['off']
  off: EventHandlerType['off']
  on: EventHandlerType['on']
  emit: EventHandlerType['emit']
  emitWatch: WatchHandlerType['emit']
  plugins: () => EmblaPluginsType
  previousSnap: () => number
  reInit: (options?: EmblaOptionsType, plugins?: EmblaPluginType[]) => void
  rootNode: () => HTMLElement
  scrollNext: (jump?: boolean) => void
  scrollPrev: (jump?: boolean) => void
  scrollProgress: () => number
  snapList: () => number[]
  scrollToSnap: (index: number, jump?: boolean) => void
  scrollToSlide: (subject: number | HTMLElement, jump?: boolean) => void
  selectedSnap: () => number
  slideNodes: () => HTMLElement[]
  slidesInView: () => number[]
  slidesNotInView: () => number[]
}

function EmblaCarousel(
  root: HTMLElement,
  userOptions?: EmblaOptionsType,
  userPlugins?: EmblaPluginType[]
): EmblaCarouselType {
  const ownerDocument = root.ownerDocument
  const ownerWindow = <WindowType>ownerDocument.defaultView
  const optionsHandler = OptionsHandler(ownerWindow)
  const pluginsHandler = PluginsHandler(optionsHandler)
  const mediaHandlers = EventStore()
  const watchHandler = WatchHandler()
  const eventHandler = EventHandler()
  const { mergeOptions, optionsAtMedia, optionsMediaQueries } = optionsHandler
  const { on, off, emit } = eventHandler
  const { on: onWatch, off: offWatch, emit: emitWatch } = watchHandler
  const reInit = reActivate

  let destroyed = false
  let engine: EngineType
  let optionsBase = mergeOptions(defaultOptions, EmblaCarousel.globalOptions)
  let options = mergeOptions(optionsBase)
  let pluginList: EmblaPluginType[] = []
  let pluginApis: EmblaPluginsType

  let container: HTMLElement
  let slides: HTMLElement[]

  function storeElements(): void {
    const { container: userContainer, slides: userSlides } = options

    const customContainer = isString(userContainer)
      ? root.querySelector(userContainer)
      : userContainer
    container = <HTMLElement>(customContainer || root.children[0])

    const customSlides = isString(userSlides)
      ? container.querySelectorAll(userSlides)
      : userSlides
    slides = <HTMLElement[]>[].slice.call(customSlides || container.children)
  }

  function createEngine(options: OptionsType): EngineType {
    const engine = Engine(
      root,
      container,
      slides,
      ownerDocument,
      ownerWindow,
      options,
      eventHandler,
      watchHandler
    )

    if (options.loop && !engine.slideLooper.canLoop()) {
      const optionsWithoutLoop = Object.assign({}, options, { loop: false })
      return createEngine(optionsWithoutLoop)
    }
    return engine
  }

  function activate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[]
  ): void {
    if (destroyed) return

    optionsBase = mergeOptions(optionsBase, withOptions)
    options = optionsAtMedia(optionsBase)
    pluginList = withPlugins || pluginList

    storeElements()

    engine = createEngine(options)

    optionsMediaQueries([
      optionsBase,
      ...pluginList.map(({ options }) => options)
    ]).forEach((query) => mediaHandlers.add(query, 'change', reActivate))

    if (!options.active) return

    engine.translate.to(engine.location.get())
    engine.animation.init()
    engine.slidesInView.init()
    engine.slideFocus.init()
    engine.resizeHandler.init()
    engine.slidesHandler.init()
    engine.eventHandler.init(self)
    engine.watchHandler.init(self)

    if (engine.options.loop) engine.slideLooper.loop()
    if (container.offsetParent && slides.length) engine.dragHandler.init()

    pluginApis = pluginsHandler.init(self, pluginList)
  }

  function reActivate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[]
  ): void {
    const startSnap = selectedSnap()
    deActivate()
    activate(mergeOptions({ startSnap }, withOptions), withPlugins)
    eventHandler.emit('reinit', null)
  }

  function deActivate(): void {
    engine.dragHandler.destroy()
    engine.eventStore.clear()
    engine.translate.clear()
    engine.slideLooper.clear()
    engine.resizeHandler.destroy()
    engine.slidesHandler.destroy()
    engine.slidesInView.destroy()
    engine.animation.destroy()
    pluginsHandler.destroy()
    mediaHandlers.clear()
  }

  function destroy(): void {
    if (destroyed) return
    destroyed = true
    mediaHandlers.clear()
    deActivate()
    eventHandler.emit('destroy', null)
    eventHandler.clear()
    watchHandler.clear()
  }

  function scrollToSnap(
    index: number,
    jump?: boolean,
    direction?: number
  ): void {
    if (!options.active || destroyed) return
    engine.scrollBody
      .useBaseFriction()
      .useDuration(jump === true ? 0 : options.duration)
    engine.scrollTo.index(index, direction || 0)
  }

  function scrollToSlide(
    subject: number | HTMLElement,
    jump?: boolean,
    direction?: number
  ): void {
    const index = isNumber(subject) ? subject : slides.indexOf(subject)
    const snapIndex = engine.slideRegistry.findIndex((g) => g.includes(index))

    if (isNumber(snapIndex)) scrollToSnap(snapIndex, jump, direction)
  }

  function scrollNext(jump?: boolean): void {
    const next = engine.index.add(1).get()
    scrollToSnap(next, jump, -1)
  }

  function scrollPrev(jump?: boolean): void {
    const prev = engine.index.add(-1).get()
    scrollToSnap(prev, jump, 1)
  }

  function canScrollNext(): boolean {
    const next = engine.index.add(1).get()
    return next !== selectedSnap()
  }

  function canScrollPrev(): boolean {
    const prev = engine.index.add(-1).get()
    return prev !== selectedSnap()
  }

  function snapList(): number[] {
    return engine.snapList
  }

  function scrollProgress(): number {
    return engine.scrollProgress.get(engine.location.get())
  }

  function selectedSnap(): number {
    return engine.index.get()
  }

  function previousSnap(): number {
    return engine.indexPrevious.get()
  }

  function slidesInView(): number[] {
    return engine.slidesInView.get()
  }

  function slidesNotInView(): number[] {
    return engine.slidesInView.get(false)
  }

  function plugins(): EmblaPluginsType {
    return pluginApis
  }

  function internalEngine(): EngineType {
    return engine
  }

  function rootNode(): HTMLElement {
    return root
  }

  function containerNode(): HTMLElement {
    return container
  }

  function slideNodes(): HTMLElement[] {
    return slides
  }

  const self: EmblaCarouselType = {
    canScrollNext,
    canScrollPrev,
    containerNode,
    internalEngine,
    destroy,
    off,
    offWatch,
    on,
    onWatch,
    emit,
    emitWatch,
    plugins,
    previousSnap,
    reInit,
    rootNode,
    scrollNext,
    scrollPrev,
    scrollProgress,
    scrollToSnap,
    scrollToSlide,
    selectedSnap,
    slideNodes,
    slidesInView,
    slidesNotInView,
    snapList
  }

  activate(userOptions, userPlugins)
  setTimeout(() => eventHandler.emit('init', null), 0)
  return self
}

declare namespace EmblaCarousel {
  let globalOptions: EmblaOptionsType | undefined
}

EmblaCarousel.globalOptions = undefined

export default EmblaCarousel
