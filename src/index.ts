import { Engine } from './components/engine'
import {
  Callback as EmblaCallback,
  Event as EmblaEvent,
  EventDispatcher,
} from './components/eventDispatcher'
import { EventStore } from './components/eventStore'
import { defaultOptions, UserOptions } from './components/options'
import { arrayFromCollection } from './components/utils'

type Elements = {
  root: HTMLElement
  container: HTMLElement
  slides: HTMLElement[]
}

type EmblaCarousel = {
  next: () => void
  previous: () => void
  goTo: (index: number) => void
  destroy: () => void
  getContainer: () => HTMLElement
  getSlides: () => HTMLElement[]
  getSelectedIndex: () => number
  on: (evt: EmblaEvent, cb: EmblaCallback) => void
  off: (evt: EmblaEvent, cb: EmblaCallback) => void
  resize: () => void
}

export function EmblaCarousel(
  sliderRoot: HTMLElement,
  userOptions: UserOptions = {},
): EmblaCarousel {
  const slider = {} as Engine
  const elements = {} as Elements
  const state = { active: false }
  const options = Object.assign({}, defaultOptions, userOptions)
  const events = EventDispatcher()
  const eventStore = EventStore()

  activate(options)

  function storeElements(): void {
    const root = sliderRoot
    if (!root) {
      throw new Error('No root element provided 😢')
    }
    const selector = options.containerSelector
    const container = root.querySelector(selector) as HTMLElement
    if (!container) {
      throw new Error('No valid container element found 😢')
    }
    elements.root = root
    elements.container = container
    elements.slides = arrayFromCollection(container.children)
    state.active = true
  }

  function activate(userOpt: UserOptions = {}): void {
    const firstInit = !state.active
    storeElements()

    if (elements.slides.length > 0) {
      const { root, container, slides } = elements
      const newOpt = Object.assign(options, userOpt)
      const engine = Engine(root, container, slides, newOpt, events)

      Object.assign(slider, engine)
      slides.forEach((s, i) =>
        eventStore.add(s, 'focus', slideFocus(i), true),
      )
      slider.translate.to(slider.mover.location)

      if (options.draggable) {
        const draggable = options.draggableClass
        const dragging = options.draggingClass
        const className = root.classList
        slider.pointer.activate()
        className.add(draggable)
        events.on('dragStart', () => className.add(dragging))
        events.on('dragEnd', () => className.remove(dragging))
      }
      if (options.loop) {
        slider.shifter.shiftAccordingTo(slider.mover.location)
      }
      if (firstInit) {
        events.on('select', addClassToSelected(slides))
        setTimeout(() => events.dispatch('init'), 0)
      }
    }
  }

  function addClassToSelected(nodes: HTMLElement[]): () => void {
    const className = options.selectedClass
    nodes[slider.index.get()].classList.add(className)

    return (): void => {
      const selectedIndex = slider.index.get()
      nodes
        .filter(n => n.classList.contains(className))
        .forEach(n => n.classList.remove(className))
      nodes[selectedIndex].classList.add(className)
    }
  }

  function slideFocus(index: number): () => void {
    return (): void => {
      sliderRoot.scrollLeft = 0
      goTo(index)
    }
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

  function getSelectedIndex(): number {
    return slider.index.get()
  }

  function getContainer(): HTMLElement {
    return elements.container
  }

  function getSlides(): HTMLElement[] {
    return elements.slides
  }

  const self: EmblaCarousel = {
    destroy,
    getContainer,
    getSelectedIndex,
    getSlides,
    goTo,
    next,
    off: events.off,
    on: events.on,
    previous,
    resize: reActivate,
  }
  return Object.freeze(self)
}

export default EmblaCarousel

// @ts-ignore
module.exports = EmblaCarousel
