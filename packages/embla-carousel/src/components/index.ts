import { Engine, EngineType } from './Engine'
import { EventStore } from './EventStore'
import { EventHandler, EventHandlerType } from './EventHandler'
import { defaultOptions, EmblaOptionsType } from './Options'
import { OptionsHandler } from './OptionsHandler'
import { PluginsHandler } from './PluginsHandler'
import { EmblaPluginType } from './Plugins'

export type EmblaNodesType = {
  root: HTMLElement
  container?: HTMLElement
  slides?: HTMLElement[]
}

export type EmblaCarouselType = {
  canScrollNext: () => boolean
  canScrollPrev: () => boolean
  clickAllowed: () => boolean
  containerNode: () => HTMLElement
  internalEngine: () => EngineType
  destroy: () => void
  off: EventHandlerType['off']
  on: EventHandlerType['on']
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
  nodes: HTMLElement | EmblaNodesType,
  userOptions?: EmblaOptionsType,
  userPlugins?: EmblaPluginType[],
): EmblaCarouselType {
  const resizeHandlers = EventStore()
  const optionsHandler = OptionsHandler()
  const pluginsHandler = PluginsHandler()
  const eventHandler = EventHandler()
  const { on, off } = eventHandler
  const reInit = reActivate

  let destroyed = false
  let engine: EngineType
  let optionsBase = optionsHandler.merge(
    defaultOptions,
    EmblaCarousel.globalOptions,
  )
  let options = optionsHandler.merge(optionsBase)
  let pluginsBase: EmblaPluginType[] = []
  let plugins: EmblaPluginType[] = []
  let rootSize = 0
  let root: HTMLElement
  let container: HTMLElement
  let slides: HTMLElement[]

  function storeElements(): void {
    const providedContainer = 'container' in nodes && nodes.container
    const providedSlides = 'slides' in nodes && nodes.slides

    root = 'root' in nodes ? nodes.root : nodes
    container = providedContainer || <HTMLElement>root.children[0]
    slides = providedSlides || [].slice.call(container.children)
  }

  function activate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[],
  ): void {
    if (destroyed) return
    storeElements()

    optionsBase = optionsHandler.merge(optionsBase, withOptions)
    options = optionsHandler.atMedia(optionsBase)
    engine = Engine(
      root,
      container,
      slides,
      options,
      optionsHandler,
      pluginsHandler,
      eventHandler,
    )
    rootSize = engine.axis.measureSize(root.getBoundingClientRect())

    if (!options.active) return deActivate()

    engine.translate.to(engine.location)
    pluginsBase = Object.assign([], withPlugins)
    plugins = pluginsHandler.filterActive(pluginsBase)
    plugins.forEach((plugin) => plugin.init(self))

    if (options.loop) {
      if (!engine.slideLooper.canLoop()) {
        deActivate()
        return activate({ loop: false }, withPlugins)
      }
      engine.slideLooper.loop()
    }
    if (options.draggable && container.offsetParent && slides.length) {
      engine.dragHandler.addActivationEvents()
    }
  }

  function reActivate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[],
  ): void {
    const startIndex = selectedScrollSnap()
    const newOptions = Object.assign({ startIndex }, withOptions)
    deActivate()
    activate(newOptions, withPlugins || plugins)
    eventHandler.emit('reInit')
  }

  function deActivate(): void {
    engine.dragHandler.removeAllEvents()
    engine.animation.stop()
    engine.eventStore.removeAll()
    engine.translate.clear()
    engine.slideLooper.clear()
    plugins.forEach((plugin) => plugin.destroy())
  }

  function destroy(): void {
    if (destroyed) return
    destroyed = true
    resizeHandlers.removeAll()
    deActivate()
    eventHandler.emit('destroy')
  }

  function resize(): void {
    const newOptions = optionsHandler.atMedia(optionsBase)
    const optionsChanged = !optionsHandler.areEqual(newOptions, options)
    const newRootSize = engine.axis.measureSize(root.getBoundingClientRect())
    const rootSizeChanged = rootSize !== newRootSize
    const newPlugins = pluginsHandler.filterActive(pluginsBase)
    const pluginsChanged = !pluginsHandler.areEqual(newPlugins, plugins)

    if (rootSizeChanged || optionsChanged || pluginsChanged) reActivate()
    eventHandler.emit('resize')
  }

  function slidesInView(target?: boolean): number[] {
    const location = engine[target ? 'target' : 'location'].get()
    const type = options.loop ? 'removeOffset' : 'constrain'
    return engine.slidesInView.check(engine.limit[type](location))
  }

  function slidesNotInView(target?: boolean): number[] {
    const inView = slidesInView(target)
    return engine.slideIndexes.filter((index) => inView.indexOf(index) === -1)
  }

  function scrollTo(index: number, jump?: boolean, direction?: number): void {
    if (!options.active || destroyed) return
    engine.scrollBody.useBaseMass().useSpeed(jump ? 100 : options.speed)
    engine.scrollTo.index(index, direction || 0)
  }

  function scrollNext(jump?: boolean): void {
    const next = engine.index.clone().add(1)
    scrollTo(next.get(), jump === true, -1)
  }

  function scrollPrev(jump?: boolean): void {
    const prev = engine.index.clone().add(-1)
    scrollTo(prev.get(), jump === true, 1)
  }

  function canScrollNext(): boolean {
    const next = engine.index.clone().add(1)
    return next.get() !== selectedScrollSnap()
  }

  function canScrollPrev(): boolean {
    const prev = engine.index.clone().add(-1)
    return prev.get() !== selectedScrollSnap()
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

  function clickAllowed(): boolean {
    return engine.dragHandler.clickAllowed()
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
    clickAllowed,
    containerNode,
    internalEngine,
    destroy,
    off,
    on,
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
    slidesNotInView,
  }

  activate(userOptions, userPlugins)
  resizeHandlers.add(window, 'resize', resize)
  setTimeout(() => eventHandler.emit('init'), 0)
  return self
}

EmblaCarousel.globalOptions = <EmblaOptionsType | undefined>undefined

export default EmblaCarousel
