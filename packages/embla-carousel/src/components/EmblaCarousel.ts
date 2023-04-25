import { Engine, EngineType } from './Engine'
import { EventStore } from './EventStore'
import { EventHandler, EventHandlerType } from './EventHandler'
import { defaultOptions, EmblaOptionsType } from './Options'
import { OptionsHandler } from './OptionsHandler'
import { PluginsHandler } from './PluginsHandler'
import { EmblaPluginsType, EmblaPluginType } from './Plugins'
import { isString } from './utils'

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
  userPlugins?: EmblaPluginType[],
): EmblaCarouselType {
  const mediaHandlers = EventStore()
  const pluginsHandler = PluginsHandler()
  const eventHandler = EventHandler()
  const { mergeOptions, optionsAtMedia, optionsMediaQueries } = OptionsHandler()
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

  function activate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[],
  ): void {
    if (destroyed) return

    optionsBase = mergeOptions(optionsBase, withOptions)
    options = optionsAtMedia(optionsBase)

    storeElements()
    engine = Engine(root, container, slides, options, eventHandler)

    if (!options.active) return deActivate()

    engine.translate.to(engine.location)
    pluginList = withPlugins || pluginList
    pluginApis = pluginsHandler.init(pluginList, self)

    optionsMediaQueries([
      optionsBase,
      ...pluginList.map(({ options }) => options),
    ]).forEach((query) => mediaHandlers.add(query, 'change', reActivate))

    engine.animation.init()
    eventHandler.init(self)
    engine.resizeHandler.init(self, options.watchResize)
    engine.slidesHandler.init(self, options.watchSlides)

    if (options.loop) {
      if (!engine.slideLooper.canLoop()) {
        deActivate()
        activate({ loop: false }, withPlugins)
        optionsBase = mergeOptions(optionsBase, { loop: true })
        return
      }
      engine.slideLooper.loop()
    }
    if (container.offsetParent && slides.length) {
      engine.dragHandler.init(self, options.watchDrag)
    }
  }

  function reActivate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[],
  ): void {
    const startIndex = selectedScrollSnap()
    deActivate()
    activate(mergeOptions({ startIndex }, withOptions), withPlugins)
    eventHandler.emit('reInit')
  }

  function deActivate(): void {
    engine.dragHandler.destroy()
    engine.animation.destroy()
    engine.eventStore.clear()
    engine.translate.clear()
    engine.slideLooper.clear()
    engine.resizeHandler.destroy()
    engine.slidesHandler.destroy()
    pluginsHandler.destroy()
    mediaHandlers.clear()
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
    return engine.slidesInView.check(engine.limit[type](location))
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
    slidesNotInView,
  }

  activate(userOptions, userPlugins)
  setTimeout(() => eventHandler.emit('init'), 0)
  return self
}

EmblaCarousel.globalOptions = <EmblaOptionsType | undefined>undefined

export default EmblaCarousel
