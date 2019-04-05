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
  container: HTMLElement
  slides: HTMLElement[]
}

type EmblaCarousel = {
  container: HTMLElement
  slides: HTMLElement[]
  next: () => void
  previous: () => void
  goTo: (index: number) => void
  destroy: () => void
  reActivate: (userOpt: UserOptions) => void
  addEvent: () => EventStore
  selectedIndex: () => number
  on: (evt: EmblaEvent, cb: EmblaCallback) => void
  off: (evt: EmblaEvent, cb: EmblaCallback) => void
}

export function EmblaCarousel(
  sliderRoot: HTMLElement,
  userOptions: UserOptions = {},
): EmblaCarousel {
  const self = {} as EmblaCarousel
  const slider = {} as Engine
  const elements = {} as Elements
  const state = { active: false, lastWindowWidth: 0 }
  const options = Object.assign({}, defaultOptions, userOptions)
  const eventDispatcher = EventDispatcher()
  const internalEvents = EventStore()
  const resize = debounce(onResize, 500)

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
    elements.container = container
    elements.slides = arrayFromCollection(container.children)
    state.lastWindowWidth = window.innerWidth
    state.active = true
  }

  function activate(userOpt: UserOptions = {}): void {
    const dispatchInit = !state.active
    storeElements()

    if (elements.slides.length > 0) {
      const { container, slides } = elements
      const newOpt = Object.assign(options, userOpt)
      const engine = Engine(
        sliderRoot,
        container,
        slides,
        newOpt,
        eventDispatcher,
      )

      Object.assign(slider, engine)
      internalEvents.add(window, 'resize', resize)
      slides.forEach((s, i) =>
        internalEvents.add(s, 'focus', slideFocus(i), true),
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
    internalEvents.removeAll()
    container.style.transform = ''
    slides.forEach(s => (s.style.left = ''))
  }

  function destroy(): void {
    state.active = false
    deActivate()
    eventDispatcher.dispatch('destroy')
  }

  function onResize(): void {
    const windowWidth = window.innerWidth
    if (windowWidth !== state.lastWindowWidth) {
      state.lastWindowWidth = windowWidth
      reActivate()
    }
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

  function selectedIndex(): number {
    return slider.index.get()
  }

  return Object.assign(self, {
    changeOptions: reActivate,
    destroy,
    goTo,
    next,
    off: eventDispatcher.off,
    on: eventDispatcher.on,
    previous,
    selectedIndex,
  })
}

export default EmblaCarousel

// @ts-ignore
module.exports = EmblaCarousel
