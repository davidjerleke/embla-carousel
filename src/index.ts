import { Engine } from './components/engine'
import {
  Callback as EmblaCallback,
  Event as EmblaEvent,
  EventDispatcher,
} from './components/eventDispatcher'
import { EventStore } from './components/eventStore'
import { defaultOptions, UserOptions } from './components/options'
import { arrayFromCollection, debounce } from './components/utils'

export type EmblaCarousel = {
  canScrollNext: () => boolean
  canScrollPrev: () => boolean
  clickAllowed: () => boolean
  containerNode: () => HTMLElement
  dangerouslyGetEngine: () => Engine
  destroy: () => void
  off: (evt: EmblaEvent, cb: EmblaCallback) => void
  on: (evt: EmblaEvent, cb: EmblaCallback) => void
  previousScrollSnap: () => number
  reInit: (options: UserOptions) => void
  scrollNext: () => void
  scrollPrev: () => void
  scrollProgress: () => number
  scrollSnapList: () => number[]
  scrollTo: (index: number) => void
  selectedScrollSnap: () => number
  slideNodes: () => HTMLElement[]
  slidesInView: (target?: boolean) => number[]
}

export function EmblaCarousel(
  sliderRoot: HTMLElement,
  userOptions: UserOptions = {},
): EmblaCarousel {
  const events = EventDispatcher()
  const eventStore = EventStore()
  const debouncedResize = debounce(resize, 500)
  const reInit = reActivate
  const { on, off } = events

  let engine: Engine
  let activated = false
  let options = Object.assign({}, defaultOptions, userOptions)
  let containerSize = 0
  let container: HTMLElement
  let slides: HTMLElement[]

  activate(options)

  function storeElements(): void {
    if (!sliderRoot) throw new Error('Missing root node 😢')

    const selector = options.containerSelector
    const sliderContainer = sliderRoot.querySelector(selector)

    if (!sliderContainer) throw new Error('Missing container node 😢')

    container = sliderContainer as HTMLElement
    slides = arrayFromCollection(container.children)
    activated = true
  }

  function activate(partialOptions: UserOptions = {}): void {
    const isFirstInit = !activated
    storeElements()
    if (slides.length === 0) return

    options = Object.assign(options, partialOptions)
    engine = Engine(sliderRoot, container, slides, options, events)
    containerSize = engine.axis.measure(container)
    eventStore.add(window, 'resize', debouncedResize)
    engine.translate.to(engine.scrollBody.location)
    slides.forEach(slideFocusEvent)

    if (options.loop && slides.length === 1) {
      return activate({ loop: false })
    }
    if (options.draggable) activateDragFeature()
    if (options.loop) engine.slideLooper.loop(slides)
    if (isFirstInit) {
      events.on('select', toggleSelectedClass)
      events.on('dragEnd', toggleSelectedClass)
      events.on('init', toggleSelectedClass)
      setTimeout(() => events.dispatch('init'), 0)
    }
  }

  function activateDragFeature(): void {
    const cl = sliderRoot.classList
    const { draggingClass, draggableClass } = options
    engine.dragHandler.addActivationEvents()
    events.on('dragStart', () => cl.add(draggingClass))
    events.on('dragEnd', () => cl.remove(draggingClass))
    cl.add(draggableClass)
  }

  function toggleSelectedClass(): void {
    const indexes = engine.snapIndexes
    const selected = options.selectedClass
    const inView = slidesInView(true)
    const notInView = indexes.filter(i => inView.indexOf(i) === -1)
    notInView.forEach(i => slides[i].classList.remove(selected))
    inView.forEach(i => slides[i].classList.add(selected))
  }

  function slideFocusEvent(slide: HTMLElement, index: number): void {
    const focus = (): void => {
      const groupIndex = Math.floor(index / options.slidesToScroll)
      const selectedGroup = index ? groupIndex : index
      sliderRoot.scrollLeft = 0
      scrollTo(selectedGroup)
    }
    eventStore.add(slide, 'focus', focus, true)
  }

  function reActivate(partialOptions: UserOptions = {}): void {
    if (!activated) return

    const startIndex = engine.index.get()
    const newOptions = Object.assign({ startIndex }, partialOptions)
    deActivate()
    activate(newOptions)
    events.dispatch('reInit')
  }

  function deActivate(): void {
    engine.dragHandler.removeAllEvents()
    engine.animation.stop()
    eventStore.removeAll()
    sliderRoot.classList.remove(options.draggableClass)
    engine.translate.clear()
    engine.slideLooper.clear(slides)
  }

  function destroy(): void {
    deActivate()
    activated = false
    engine = {} as Engine
    events.dispatch('destroy')
  }

  function resize(): void {
    const newContainerSize = engine.axis.measure(container)
    if (containerSize === newContainerSize) return
    reActivate()
  }

  function slidesInView(target: boolean = false): number[] {
    const location = engine[target ? 'target' : 'location'].get()
    const type = options.loop ? 'removeOffset' : 'constrain'
    return engine.slidesInView.check(engine.limit[type](location))
  }

  function scrollSnapList(): number[] {
    const getScrollProgress = engine.scrollProgress.get
    return engine.scrollSnaps.map(getScrollProgress)
  }

  function scrollTo(index: number): void {
    engine.scrollBody.useDefaultMass().useDefaultSpeed()
    engine.scrollTo.index(index, 0)
  }

  function scrollNext(): void {
    const next = engine.index.clone().add(1)
    engine.scrollBody.useDefaultMass().useDefaultSpeed()
    engine.scrollTo.index(next.get(), -1)
  }

  function scrollPrev(): void {
    const prev = engine.index.clone().add(-1)
    engine.scrollBody.useDefaultMass().useDefaultSpeed()
    engine.scrollTo.index(prev.get(), 1)
  }

  function canScrollPrev(): boolean {
    const { index } = engine
    return options.loop || index.get() !== index.min
  }

  function canScrollNext(): boolean {
    const { index } = engine
    return options.loop || index.get() !== index.max
  }

  function scrollProgress(): number {
    const location = engine.location.get()
    return engine.scrollProgress.get(location)
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

  function dangerouslyGetEngine(): Engine {
    return engine
  }

  function containerNode(): HTMLElement {
    return container
  }

  function slideNodes(): HTMLElement[] {
    return slides
  }

  const self: EmblaCarousel = {
    canScrollNext,
    canScrollPrev,
    clickAllowed,
    containerNode,
    dangerouslyGetEngine,
    destroy,
    off,
    on,
    previousScrollSnap,
    reInit,
    scrollNext,
    scrollPrev,
    scrollProgress,
    scrollSnapList,
    scrollTo,
    selectedScrollSnap,
    slideNodes,
    slidesInView,
  }
  return Object.freeze(self)
}

export default EmblaCarousel
export { UserOptions }

// @ts-ignore
module.exports = EmblaCarousel
