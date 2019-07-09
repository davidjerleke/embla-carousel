import { Engine } from './components/engine'
import {
  Callback as EmblaCallback,
  Event as EmblaEvent,
  EventDispatcher,
} from './components/eventDispatcher'
import { EventStore } from './components/eventStore'
import { defaultOptions, UserOptions } from './components/options'
import { arrayFromCollection, debounce } from './components/utils'

type Elements = {
  root: HTMLElement
  container: HTMLElement
  slides: HTMLElement[]
}

type ScrollSnap = {
  slideNodes: HTMLElement[]
  slideIndexes: number[]
}

export type EmblaCarousel = {
  scrollSnapList: () => ScrollSnap[]
  scrollNext: () => void
  scrollPrev: () => void
  scrollTo: (index: number) => void
  destroy: () => void
  containerNode: () => HTMLElement
  slideNodes: () => HTMLElement[]
  selectedScrollSnap: () => number
  previousScrollSnap: () => number
  canScrollNext: () => boolean
  canScrollPrev: () => boolean
  on: (evt: EmblaEvent, cb: EmblaCallback) => void
  off: (evt: EmblaEvent, cb: EmblaCallback) => void
  changeOptions: (options: UserOptions) => void
}

export function EmblaCarousel(
  sliderRoot: HTMLElement,
  userOptions: UserOptions = {},
): EmblaCarousel {
  const state = { active: false, windowWidth: 0 }
  const options = Object.assign({}, defaultOptions, userOptions)
  const events = EventDispatcher()
  const eventStore = EventStore()
  const debouncedResize = debounce(resize, 500)
  const changeOptions = reActivate
  const slider = {} as Engine
  const elements = {} as Elements
  const { on, off } = events

  activate(options)

  function storeElements(): void {
    if (!sliderRoot) {
      throw new Error('No root element provided 😢')
    }
    const selector = options.containerSelector
    const container = sliderRoot.querySelector(selector)
    if (!container) {
      throw new Error('No valid container element found 😢')
    }
    elements.root = sliderRoot
    elements.container = container as HTMLElement
    elements.slides = arrayFromCollection(container.children)
    state.active = true
  }

  function activate(userOpt: UserOptions = {}): void {
    const isFirstInit = !state.active
    state.windowWidth = window.innerWidth
    storeElements()

    if (elements.slides.length > 0) {
      const { root, container, slides } = elements
      const newOpt = Object.assign(options, userOpt)
      const engine = Engine(root, container, slides, newOpt, events)
      const newSlider = Object.assign(slider, engine)
      eventStore.add(window, 'resize', debouncedResize)
      slides.forEach(slideFocusEvent)
      slider.translate.to(slider.mover.location)

      if (options.loop && slides.length === 1) {
        return activate({ loop: false })
      }
      if (options.draggable) activateDragFeature()
      if (options.loop) slider.shifter.shiftInfinite(slides)
      if (isFirstInit) {
        events.on('select', toggleSelectedClass)
        events.on('init', toggleSelectedClass)
        setTimeout(() => events.dispatch('init'), 0)
      }
    }
  }

  function activateDragFeature(): void {
    const root = elements.root.classList
    const { draggingClass, draggableClass } = options
    slider.pointer.addActivationEvents()
    events.on('dragStart', () => root.add(draggingClass))
    events.on('dragEnd', () => root.remove(draggingClass))
    root.add(draggableClass)
  }

  function toggleSelectedClass(): void {
    const { slides } = elements
    const { index, indexPrevious, indexGroups } = slider
    const selected = options.selectedClass
    const previousGroup = indexGroups[indexPrevious.get()]
    const currentGroup = indexGroups[index.get()]
    previousGroup.forEach(i => slides[i].classList.remove(selected))
    currentGroup.forEach(i => slides[i].classList.add(selected))
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

  function reActivate(userOpt: UserOptions = {}): void {
    if (state.active) {
      const startIndex = slider.index.get()
      const indexOpt = { startIndex }
      const newOpt = Object.assign(indexOpt, userOpt)
      deActivate()
      activate(newOpt)
    }
  }

  function deActivate(): void {
    const { root, container, slides } = elements
    slider.pointer.removeAllEvents()
    slider.animation.stop()
    eventStore.removeAll()
    root.classList.remove(options.draggableClass)
    container.style.transform = ''
    slides.forEach(s => (s.style.left = ''))
  }

  function destroy(): void {
    state.active = false
    deActivate()
    events.dispatch('destroy')
  }

  function resize(): void {
    const newWindowWidth = window.innerWidth
    if (newWindowWidth !== state.windowWidth) {
      state.windowWidth = newWindowWidth
      reActivate()
      events.dispatch('resize')
    }
  }

  function scrollSnapList(): ScrollSnap[] {
    return slider.indexGroups.map(g => ({
      slideIndexes: g,
      slideNodes: g.map(i => elements.slides[i]),
    }))
  }

  function canScrollPrev(): boolean {
    const { index } = slider
    return !options.loop && index.get() !== index.min
  }

  function canScrollNext(): boolean {
    const { index } = slider
    return !options.loop && index.get() !== index.max
  }

  function scrollNext(): void {
    slider.mover.useDefaultMass().useDefaultSpeed()
    slider.scroll.toNext()
  }

  function scrollPrev(): void {
    slider.mover.useDefaultMass().useDefaultSpeed()
    slider.scroll.toPrevious()
  }

  function scrollTo(index: number): void {
    slider.mover.useDefaultMass().useDefaultSpeed()
    slider.scroll.toIndex(index)
  }

  function selectedScrollSnap(): number {
    return slider.index.get()
  }

  function previousScrollSnap(): number {
    return slider.indexPrevious.get()
  }

  function containerNode(): HTMLElement {
    return elements.container
  }

  function slideNodes(): HTMLElement[] {
    return elements.slides
  }

  const self: EmblaCarousel = {
    canScrollNext,
    canScrollPrev,
    changeOptions,
    containerNode,
    destroy,
    off,
    on,
    previousScrollSnap,
    scrollNext,
    scrollPrev,
    scrollSnapList,
    scrollTo,
    selectedScrollSnap,
    slideNodes,
  }
  return Object.freeze(self)
}

export default EmblaCarousel
export { UserOptions }

// @ts-ignore
module.exports = EmblaCarousel
