import { Engine, EngineType } from './Engine'
import { EventStore } from './EventStore'
import { EventHandler, EventHandlerType } from './EventHandler'
import { defaultOptions, EmblaOptionsType, OptionsType } from './Options'
import { NodeHandler, NodeHandlerType } from './NodeHandler'
import { OptionsHandler } from './OptionsHandler'
import { PluginsHandler } from './PluginsHandler'
import { SsrHandler, SsrHandlerType } from './SsrHandler'
import { EmblaPluginsType, EmblaPluginType } from './Plugins'
import { ScrollToDirectionType } from './ScrollTo'

export type EmblaCarouselType = {
  canGoToNext: () => boolean
  canGoToPrev: () => boolean
  goToNext: (instant?: boolean) => void
  goToPrev: (instant?: boolean) => void
  goTo: (
    index: number,
    instant?: boolean,
    direction?: ScrollToDirectionType
  ) => void
  previousSnap: () => number
  selectedSnap: () => number
  rootNode: () => HTMLElement
  containerNode: () => HTMLElement
  slideNodes: () => HTMLElement[]
  snapIndex: (offset: number) => number
  snapList: () => number[]
  createEvent: EventHandlerType['createEvent']
  destroy: () => void
  on: EventHandlerType['on']
  off: EventHandlerType['off']
  internalEngine: () => EngineType
  cloneEngine: (userOptions?: EmblaOptionsType) => EngineType
  plugins: () => EmblaPluginsType
  reInit: (options?: EmblaOptionsType, plugins?: EmblaPluginType[]) => void
  ssrStyles: (container: string, slides?: string) => string
  scrollProgress: () => number
  slidesInView: () => number[]
}

function EmblaCarousel(
  userRoot?: HTMLElement | null,
  userOptions?: EmblaOptionsType | null,
  userPlugins?: EmblaPluginType[] | null
): EmblaCarouselType {
  const isSsr = !userRoot
  const optionsHandler = OptionsHandler()
  const pluginsHandler = PluginsHandler(optionsHandler)
  const mediaHandlers = EventStore()
  const eventHandler = EventHandler()
  const { mergeOptions, optionsAtMedia, optionsMediaQueries } = optionsHandler
  const { on, off, createEvent } = eventHandler
  const reInit = reActivate

  let destroyed = false
  let engine: EngineType
  let nodeHandler: NodeHandlerType
  let ssrHandler: SsrHandlerType
  let optionsBase = mergeOptions(defaultOptions, EmblaCarousel.globalOptions)
  let options = mergeOptions(optionsBase)
  let pluginList: EmblaPluginType[] = []
  let pluginApis: EmblaPluginsType = {}
  let root: HTMLElement
  let container: HTMLElement
  let slides: HTMLElement[]

  function cloneEngine(userOptions?: EmblaOptionsType): EngineType {
    const engineOptions = mergeOptions(options, userOptions)
    return createEngine(engineOptions, container, slides, true)
  }

  function createEngine(
    options: OptionsType,
    container: HTMLElement,
    slides: HTMLElement[],
    useCachedRects?: boolean
  ): EngineType {
    const ssrOptions = isSsr ? { direction: 'ltr' } : {}
    const engineOptions = mergeOptions(options, ssrOptions)
    const rects = nodeHandler.getRects(container, slides, useCachedRects)
    const engine = Engine(
      root,
      container,
      slides,
      engineOptions,
      nodeHandler,
      eventHandler,
      rects,
      isSsr
    )

    if (options.loop && !engine.slideLooper.canLoop()) {
      const optionsWithNoLoop = mergeOptions(options, { loop: false })
      return createEngine(optionsWithNoLoop, container, slides, true)
    }

    return engine
  }

  function activate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[]
  ): void {
    if (destroyed) return

    nodeHandler = NodeHandler(<HTMLElement>userRoot)
    const { ownerWindow } = nodeHandler

    optionsHandler.init(ownerWindow)
    optionsBase = mergeOptions(optionsBase, withOptions)
    options = optionsAtMedia(optionsBase)
    pluginList = withPlugins || pluginList

    const nodes = nodeHandler.getNodes(options)
    root = nodes.root
    container = nodes.container
    slides = nodes.slides
    engine = createEngine(options, container, slides)

    ssrHandler = SsrHandler(
      container,
      engine.axis,
      nodeHandler,
      optionsBase,
      mergeOptions,
      createEngine
    )

    optionsMediaQueries([
      optionsBase,
      ...pluginList.map(({ options }) => options)
    ]).forEach((query) => mediaHandlers.add(query, 'change', reActivate))

    if (!options.active) return

    if (!isSsr && ownerWindow) {
      engine.translate.to(engine.location)
      engine.scrollOptimizer.optimize(true)
      if (engine.options.loop) engine.slideLooper.loop()

      engine.animation.init(ownerWindow)
      engine.resizeHandler.init(ownerWindow)
      engine.slidesInView.init(ownerWindow)
      engine.slidesHandler.init(ownerWindow)
      engine.slideFocus.init(ownerWindow)
      engine.eventHandler.init(self)

      if (container.offsetParent && slides.length) {
        engine.dragHandler.init(ownerWindow)
      }
    }

    pluginApis = pluginsHandler.init(self, pluginList)
  }

  function reActivate(
    withOptions?: EmblaOptionsType,
    withPlugins?: EmblaPluginType[]
  ): void {
    const event = eventHandler.createEvent('reinit', null)
    const startSnap = selectedSnap()
    deActivate()
    activate(mergeOptions({ startSnap }, withOptions), withPlugins)
    event.emit()
  }

  function deActivate(): void {
    engine.dragHandler.destroy()
    engine.resizeHandler.destroy()
    engine.slidesHandler.destroy()
    engine.slidesInView.destroy()
    engine.animation.destroy()
    pluginsHandler.destroy()
    engine.eventStore.clear()
    mediaHandlers.clear()
    engine.translate.clear()
    engine.slideTranslates.forEach((translate) => translate.clear())
  }

  function destroy(): void {
    if (destroyed) return
    if (isSsr) return

    const event = eventHandler.createEvent('destroy', null)

    destroyed = true
    mediaHandlers.clear()
    deActivate()
    event.emit()
    eventHandler.clear()
  }

  function goTo(
    index: number,
    instant?: boolean,
    direction?: ScrollToDirectionType
  ): void {
    if (destroyed) return
    if (isSsr) return
    if (!options.active) return

    engine.scrollBody
      .useBaseFriction()
      .useDuration(instant === true ? 0 : options.duration)
    engine.scrollTo.index(index, direction)
  }

  function goToNext(instant?: boolean): void {
    goTo(snapIndex(1), instant, -1)
  }

  function goToPrev(instant?: boolean): void {
    goTo(snapIndex(-1), instant, 1)
  }

  function canGoToNext(): boolean {
    return snapIndex(1) !== selectedSnap()
  }

  function canGoToPrev(): boolean {
    return snapIndex(-1) !== selectedSnap()
  }

  function ssrStyles(container: string, slides?: string): string {
    return isSsr ? ssrHandler.getStyles(container, slides) : ''
  }

  function scrollProgress(): number {
    return engine.scrollProgress.get(engine.offsetLocation)
  }

  function snapIndex(offset: number): number {
    return engine.indexCurrent.add(offset).get()
  }

  function snapList(): number[] {
    return engine.scrollSnapList.progressBySnap
  }

  function selectedSnap(): number {
    return snapIndex(0)
  }

  function previousSnap(): number {
    return engine.indexPrevious.get()
  }

  function slidesInView(): number[] {
    return engine.slidesInView.get()
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
    canGoToNext,
    canGoToPrev,
    cloneEngine,
    containerNode,
    createEvent,
    internalEngine,
    destroy,
    on,
    off,
    plugins,
    previousSnap,
    reInit,
    rootNode,
    goToNext,
    goToPrev,
    scrollProgress,
    goTo,
    selectedSnap,
    slideNodes,
    slidesInView,
    snapIndex,
    snapList,
    ssrStyles
  }

  activate(userOptions || {}, userPlugins || [])
  return self
}

declare namespace EmblaCarousel {
  let globalOptions: EmblaOptionsType | undefined
}

EmblaCarousel.globalOptions = undefined

export default EmblaCarousel
