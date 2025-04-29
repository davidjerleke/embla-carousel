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
import { isNumber } from './utils'

export type EmblaCarouselType = {
  canScrollNext: () => boolean
  canScrollPrev: () => boolean
  containerNode: () => HTMLElement
  createEvent: EventHandlerType['createEvent']
  internalEngine: () => EngineType
  destroy: () => void
  on: EventHandlerType['on']
  off: EventHandlerType['off']
  plugins: () => EmblaPluginsType
  previousSnap: () => number
  reInit: (options?: EmblaOptionsType, plugins?: EmblaPluginType[]) => void
  ssrStyles: (container: string, slides?: string) => string
  rootNode: () => HTMLElement
  scrollNext: (jump?: boolean) => void
  scrollPrev: (jump?: boolean) => void
  scrollProgress: () => number
  snapList: () => number[]
  selectedSnap: () => number
  slideNodes: () => HTMLElement[]
  slidesInView: () => number[]
  slidesNotInView: () => number[]
  scrollToSnap: (
    index: number,
    jump?: boolean,
    direction?: ScrollToDirectionType
  ) => void
  scrollToSlide: (
    subject: number | HTMLElement,
    jump?: boolean,
    direction?: ScrollToDirectionType
  ) => void
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

  function createEngine(
    options: OptionsType,
    container: HTMLElement,
    slides: HTMLElement[]
  ): EngineType {
    const ssrOptions = isSsr ? { direction: 'ltr' } : {}
    const engineOptions = mergeOptions(options, ssrOptions)
    const engine = Engine(
      root,
      container,
      slides,
      engineOptions,
      nodeHandler,
      eventHandler,
      isSsr
    )

    if (options.loop && !engine.slideLooper.canLoop()) {
      const optionsWithoutLoop = mergeOptions(options, { loop: false })
      return createEngine(optionsWithoutLoop, container, slides)
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
      engine.translate.to(engine.location.get())
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

  function scrollToSnap(
    index: number,
    jump?: boolean,
    direction?: ScrollToDirectionType
  ): void {
    if (destroyed) return
    if (isSsr) return
    if (!options.active) return

    engine.scrollBody
      .useBaseFriction()
      .useDuration(jump === true ? 0 : options.duration)
    engine.scrollTo.index(index, direction)
  }

  function scrollToSlide(
    subject: number | HTMLElement,
    jump?: boolean,
    direction?: ScrollToDirectionType
  ): void {
    const slideIndex = isNumber(subject) ? subject : slides.indexOf(subject)
    const snapIndex = engine.scrollSnapList.snapBySlideIndex[slideIndex]

    if (isNumber(snapIndex)) scrollToSnap(snapIndex, jump, direction)
  }

  // TODO: Rename to scrollToNext
  function scrollNext(jump?: boolean): void {
    const next = engine.indexCurrent.add(1).get()
    scrollToSnap(next, jump, -1)
  }

  // TODO: Rename to scrollToPrev
  function scrollPrev(jump?: boolean): void {
    const prev = engine.indexCurrent.add(-1).get()
    scrollToSnap(prev, jump, 1)
  }

  // TODO: Rename to canScrollToNext
  function canScrollNext(): boolean {
    const next = engine.indexCurrent.add(1).get()
    return next !== selectedSnap()
  }

  // TODO: Rename to canScrollToPrev
  function canScrollPrev(): boolean {
    const prev = engine.indexCurrent.add(-1).get()
    return prev !== selectedSnap()
  }

  function ssrStyles(container: string, slides?: string): string {
    return isSsr ? ssrHandler.getStyles(container, slides) : ''
  }

  function scrollProgress(): number {
    return engine.scrollProgress.get(engine.offsetLocation.get())
  }

  function snapList(): number[] {
    return engine.snapList
  }

  function selectedSnap(): number {
    return engine.indexCurrent.get()
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
    createEvent,
    internalEngine,
    destroy,
    on,
    off,
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
