import { Engine, EngineType } from './Engine'
import { Animations, AnimationsType } from './Animations'
import { EventStore } from './EventStore'
import { EventHandler, EventHandlerType } from './EventHandler'
import { defaultOptions, EmblaOptionsType, OptionsType } from './Options'
import { OptionsHandler } from './OptionsHandler'
import { PluginsHandler } from './PluginsHandler'
import { EmblaPluginsType, EmblaPluginType } from './Plugins'
import { isString, WindowType } from './utils'

export type EmblaCarouselType = {
  canScrollNext: () => boolean
  canScrollPrev: () => boolean
  containerNode: () => HTMLElement
  internalEngine: () => EngineType
  destroy: () => void
  off: EventHandlerType['off']
  on: EventHandlerType['on']
  emit: EventHandlerType['emit']
  plugins: () => EmblaPluginsType
  previousScrollSnap: () => number
  reInit: (options?: EmblaOptionsType, plugins?: EmblaPluginType[]) => void
  rootNode: () => HTMLElement
  scrollNext: (jump?: boolean) => void
  scrollPrev: (jump?: boolean) => void
  scrollProgress: () => number
  scrollSnapList: () => number[]
  scrollTo: (index: number, jump?: boolean) => void
  selectedScrollSnap: () => number
  slideNodes: () => HTMLElement[]
  slidesInView: (target?: boolean) => number[]
  slidesNotInView: (target?: boolean) => number[]
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
  const documentVisibleHandler = EventStore()
  const eventHandler = EventHandler()
  const { animationRealms } = EmblaCarousel
  const { mergeOptions, optionsAtMedia, optionsMediaQueries } = optionsHandler
  const { on, off, emit } = eventHandler
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

  function createEngine(
    options: OptionsType,
    animations: AnimationsType
  ): EngineType {
    const engine = Engine(
      root,
      container,
      slides,
      ownerDocument,
      ownerWindow,
      options,
      eventHandler,
      animations
    )

    if (options.loop && !engine.slideLooper.canLoop()) {
      const optionsWithoutLoop = Object.assign({}, options, { loop: false })
      return createEngine(optionsWithoutLoop, animations)
    }
    return engine
  }

  function activate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[]
  ): void {
    if (destroyed) return

    const animationRealm = animationRealms.find((a) => a.window === ownerWindow)
    const animations = animationRealm || Animations(ownerWindow)
    if (!animationRealm) animationRealms.push(animations)

    optionsBase = mergeOptions(optionsBase, withOptions)
    options = optionsAtMedia(optionsBase)
    pluginList = withPlugins || pluginList

    storeElements()

    engine = createEngine(options, animations)

    optionsMediaQueries([
      optionsBase,
      ...pluginList.map(({ options }) => options)
    ]).forEach((query) => mediaHandlers.add(query, 'change', reActivate))

    if (!options.active) return

    engine.translate.to(engine.location.get())
    engine.eventHandler.init(self)
    engine.resizeHandler.init(self, options.watchResize)
    engine.slidesHandler.init(self, options.watchSlides)

    documentVisibleHandler.add(ownerDocument, 'visibilitychange', () => {
      if (ownerDocument.hidden) animations.reset()
    })

    if (engine.options.loop) engine.slideLooper.loop()

    if (container.offsetParent && slides.length) {
      engine.dragHandler.init(self, options.watchDrag)
    }

    pluginApis = pluginsHandler.init(pluginList, self)
  }

  function reActivate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[]
  ): void {
    const startIndex = selectedScrollSnap()
    deActivate()
    activate(mergeOptions({ startIndex }, withOptions), withPlugins)
    eventHandler.emit('reInit')
  }

  function deActivate(): void {
    engine.dragHandler.destroy()
    engine.animation.stop()
    engine.eventStore.clear()
    engine.translate.clear()
    engine.slideLooper.clear()
    engine.resizeHandler.destroy()
    engine.slidesHandler.destroy()
    pluginsHandler.destroy()
    mediaHandlers.clear()
    documentVisibleHandler.clear()
  }

  function destroy(): void {
    if (destroyed) return
    destroyed = true
    mediaHandlers.clear()
    deActivate()
    eventHandler.emit('destroy')
  }

  function slidesInView(target?: boolean): number[] {
    const location = engine[target ? 'target' : 'location'].get()
    const type = options.loop ? 'removeOffset' : 'constrain'
    return []
    // return engine.slidesInView.check(engine.limit[type](location))
  }

  function slidesNotInView(target?: boolean): number[] {
    const inView = slidesInView(target)
    return engine.slideIndexes.filter((index) => !inView.includes(index))
  }

  function scrollTo(index: number, jump?: boolean, direction?: number): void {
    if (!options.active || destroyed) return
    engine.scrollBody.useBaseFriction().useDuration(jump ? 0 : options.duration)
    engine.scrollTo.index(index, direction || 0)
  }

  function scrollNext(jump?: boolean): void {
    const next = engine.index.add(1).get()
    scrollTo(next, jump === true, -1)
  }

  function scrollPrev(jump?: boolean): void {
    const prev = engine.index.add(-1).get()
    scrollTo(prev, jump === true, 1)
  }

  function canScrollNext(): boolean {
    const next = engine.index.add(1).get()
    return next !== selectedScrollSnap()
  }

  function canScrollPrev(): boolean {
    const prev = engine.index.add(-1).get()
    return prev !== selectedScrollSnap()
  }

  function scrollSnapList(): number[] {
    return engine.scrollSnaps.map(engine.scrollProgress.get)
  }

  function scrollProgress(): number {
    return engine.scrollProgress.get(engine.location.get())
  }

  function selectedScrollSnap(): number {
    return engine.index.get()
  }

  function previousScrollSnap(): number {
    return engine.indexPrevious.get()
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
    on,
    emit,
    plugins,
    previousScrollSnap,
    reInit,
    rootNode,
    scrollNext,
    scrollPrev,
    scrollProgress,
    scrollSnapList,
    scrollTo,
    selectedScrollSnap,
    slideNodes,
    slidesInView,
    slidesNotInView
  }

  activate(userOptions, userPlugins)
  setTimeout(() => eventHandler.emit('init'), 0)
  return self
}

EmblaCarousel.animationRealms = <AnimationsType[]>[]
EmblaCarousel.globalOptions = <EmblaOptionsType | undefined>undefined

export default EmblaCarousel
