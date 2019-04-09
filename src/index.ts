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
  const self = {} as EmblaCarousel
  const slider = {} as Engine
  const elements = {} as Elements
  const state = { active: false }
  const options = Object.assign({}, defaultOptions, userOptions)
  const eventDispatcher = EventDispatcher()
  const eventStore = EventStore()

  activate(options)

  function storeElements(): void {
    const root = sliderRoot
    if (!root) {
      throw new Error('No root element provided 😢')
    }
    const selector = options.container
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
    const dispatchInit = !state.active
    storeElements()

    if (elements.slides.length > 0) {
      const { root, container, slides } = elements
      const newOpt = Object.assign(options, userOpt)
      const engine = Engine(
        root,
        container,
        slides,
        newOpt,
        eventDispatcher,
      )

      Object.assign(slider, engine)
      slides.forEach((s, i) =>
        eventStore.add(s, 'focus', slideFocus(i), true),
      )
      slider.translate.to(slider.mover.location)

      if (options.draggable) {
        slider.pointer.activate()
      }
      if (options.loop) {
        slider.shifter.shiftAccordingTo(slider.mover.location)
      }
      if (dispatchInit) {
        setTimeout(() => eventDispatcher.dispatch('init'), 0)
      }
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
    const { container, slides } = elements
    slider.pointer.removeAllEvents()
    slider.animation.stop()
    eventStore.removeAll()
    container.style.transform = ''
    slides.forEach(s => (s.style.left = ''))
  }

  function destroy(): void {
    state.active = false
    deActivate()
    eventDispatcher.dispatch('destroy')
  }

  function slideFocus(index: number): () => void {
    return (): void => {
      sliderRoot.scrollLeft = 0
      goTo(index)
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

  function getSelectedIndex(): number {
    return slider.index.get()
  }

  function getContainer(): HTMLElement {
    return elements.container
  }

  function getSlides(): HTMLElement[] {
    return elements.slides
  }

  return Object.assign(self, {
    destroy,
    getContainer,
    getSelectedIndex,
    getSlides,
    goTo,
    next,
    off: eventDispatcher.off,
    on: eventDispatcher.on,
    previous,
    resize: reActivate,
  })
}

export default EmblaCarousel

// @ts-ignore
module.exports = EmblaCarousel
