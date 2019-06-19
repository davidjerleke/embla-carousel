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

export type EmblaCarousel = {
  next: () => void
  previous: () => void
  goTo: (index: number) => void
  destroy: () => void
  containerNode: () => HTMLElement
  slideNodes: () => HTMLElement[]
  selectedIndex: () => number
  previousIndex: () => number
  groupedIndexes: () => number[][]
  hasNextIndex: () => boolean
  hasPreviousIndex: () => boolean
  isFirstIndex: () => boolean
  isLastIndex: () => boolean
  on: (evt: EmblaEvent, cb: EmblaCallback) => void
  off: (evt: EmblaEvent, cb: EmblaCallback) => void
  changeOptions: (options: UserOptions) => void
}

export function EmblaCarousel(
  sliderRoot: HTMLElement,
  userOptions: UserOptions = {},
): EmblaCarousel {
  const state = { active: false, lastWindowWidth: 0 }
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
    state.lastWindowWidth = window.innerWidth
    storeElements()

    if (elements.slides.length > 0) {
      const { root, container, slides } = elements
      const newOpt = Object.assign(options, userOpt)
      const engine = Engine(root, container, slides, newOpt, events)
      Object.assign(slider, engine)
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
      const groupIndex = Math.floor(index / options.groupSlides)
      const selectedGroup = index ? groupIndex : index
      sliderRoot.scrollLeft = 0
      goTo(selectedGroup)
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
    const windowWidth = window.innerWidth
    if (windowWidth !== state.lastWindowWidth) {
      state.lastWindowWidth = windowWidth
      reActivate()
    }
  }

  function next(): void {
    slider.mover.useDefaultSpeed()
    slider.travel.toNext()
  }

  function previous(): void {
    slider.mover.useDefaultSpeed()
    slider.travel.toPrevious()
  }

  function goTo(index: number): void {
    slider.mover.useDefaultSpeed()
    slider.travel.toIndex(index)
  }

  function containerNode(): HTMLElement {
    return elements.container
  }

  function slideNodes(): HTMLElement[] {
    return elements.slides
  }

  function selectedIndex(): number {
    return slider.index.get()
  }

  function previousIndex(): number {
    return slider.indexPrevious.get()
  }

  function groupedIndexes(): number[][] {
    return slider.indexGroups
  }

  function isFirstIndex(): boolean {
    return selectedIndex() === slider.index.min
  }

  function isLastIndex(): boolean {
    return selectedIndex() === slider.index.max
  }

  function hasPreviousIndex(): boolean {
    return !options.loop && !isFirstIndex()
  }

  function hasNextIndex(): boolean {
    return !options.loop && !isLastIndex()
  }

  const self: EmblaCarousel = {
    changeOptions,
    containerNode,
    destroy,
    goTo,
    groupedIndexes,
    hasNextIndex,
    hasPreviousIndex,
    isFirstIndex,
    isLastIndex,
    next,
    off,
    on,
    previous,
    previousIndex,
    selectedIndex,
    slideNodes,
  }
  return Object.freeze(self)
}

export default EmblaCarousel
export { UserOptions }

// @ts-ignore
module.exports = EmblaCarousel
