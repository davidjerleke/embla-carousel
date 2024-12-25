import { OptionsType, defaultOptions } from './Options'
import { getAutoplayRootNode, normalizeDelay } from './utils'
import {
  CreatePluginType,
  OptionsHandlerType,
  EmblaCarouselType
} from 'embla-carousel'

declare module 'embla-carousel' {
  interface EmblaPluginsType {
    autoplay: AutoplayType
  }

  interface EmblaEventListType {
    'autoplay:play': 'autoplay:play'
    'autoplay:stop': 'autoplay:stop'
    'autoplay:select': 'autoplay:select'
    'autoplay:timerset': 'autoplay:timerset'
    'autoplay:timerstopped': 'autoplay:timerstopped'
  }

  interface EmblaEventDetailType {
    'autoplay:play': null
    'autoplay:stop': null
    'autoplay:select': null
    'autoplay:timerset': null
    'autoplay:timerstopped': null
  }
}

export type AutoplayType = CreatePluginType<
  {
    play: (jump?: boolean) => void
    stop: () => void
    reset: () => void
    isPlaying: () => boolean
    timeUntilNext: () => number | null
  },
  OptionsType
>

export type AutoplayOptionsType = AutoplayType['options']

function Autoplay(userOptions: AutoplayOptionsType = {}): AutoplayType {
  let options: OptionsType
  let emblaApi: EmblaCarouselType
  let isSsr = false
  let destroyed = false

  let delay: ReturnType<EmblaCarouselType['snapList']>
  let timerStartTime: null | number = null
  let timerId = 0
  let autoplayRunning = false
  let mouseIsOver = false
  let playOnDocumentVisible = false
  let jump = false

  function pluginIsActive(): boolean {
    if (isSsr) return false
    if (destroyed) return false
    return options.active
  }

  function init(
    emblaApiInstance: EmblaCarouselType,
    optionsHandler: OptionsHandlerType
  ): void {
    emblaApi = emblaApiInstance

    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, Autoplay.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)

    destroyed = false
    options = optionsAtMedia(allOptions)
    isSsr = emblaApi.internalEngine().isSsr

    if (!pluginIsActive()) return
    if (emblaApi.snapList().length <= 1) return

    jump = options.jump
    delay = normalizeDelay(emblaApi, options.delay)

    const { eventStore, nodeHandler } = emblaApi.internalEngine()
    const { ownerDocument } = nodeHandler
    const isDraggable = emblaApi.internalEngine().options.draggable
    const root = getAutoplayRootNode(emblaApi, options.rootNode)

    if (ownerDocument) {
      eventStore.add(ownerDocument, 'visibilitychange', onVisibilityChange)
    }

    if (isDraggable) {
      emblaApi.on('pointerdown', onPointerDown)
    }

    if (isDraggable && !options.stopOnInteraction) {
      emblaApi.on('pointerup', onPointerUp)
    }

    if (options.stopOnMouseEnter) {
      eventStore.add(root, 'mouseenter', onMouseEnter)
    }

    if (options.stopOnMouseEnter && !options.stopOnInteraction) {
      eventStore.add(root, 'mouseleave', onMouseLeave)
    }

    if (options.stopOnFocusIn) {
      emblaApi.on('slidefocusstart', stopAutoplay)
    }

    if (options.stopOnFocusIn && !options.stopOnInteraction) {
      eventStore.add(emblaApi.containerNode(), 'focusout', startAutoplay)
    }

    if (options.playOnInit) startAutoplay()
  }

  function destroy(): void {
    if (!pluginIsActive()) return

    emblaApi
      .off('pointerdown', onPointerDown)
      .off('pointerup', onPointerUp)
      .off('slidefocusstart', stopAutoplay)

    stopAutoplay()
    destroyed = true
    autoplayRunning = false
  }

  function setTimer(): void {
    const { ownerWindow } = emblaApi.internalEngine().nodeHandler
    if (!ownerWindow) return

    ownerWindow.clearTimeout(timerId)
    timerId = ownerWindow.setTimeout(next, delay[emblaApi.selectedSnap()])
    timerStartTime = new Date().getTime()
    emblaApi.emit('autoplay:timerset', null)
  }

  function clearTimer(): void {
    const { ownerWindow } = emblaApi.internalEngine().nodeHandler
    if (!ownerWindow) return

    ownerWindow.clearTimeout(timerId)
    timerId = 0
    timerStartTime = null
    emblaApi.emit('autoplay:timerstopped', null)
  }

  function startAutoplay(): void {
    if (!pluginIsActive()) return
    if (documentIsHidden()) {
      playOnDocumentVisible = true
      return
    }
    if (!autoplayRunning) emblaApi.emit('autoplay:play', null)

    setTimer()
    autoplayRunning = true
  }

  function stopAutoplay(): void {
    if (!pluginIsActive()) return
    if (autoplayRunning) emblaApi.emit('autoplay:stop', null)

    clearTimer()
    autoplayRunning = false
  }

  function onVisibilityChange(): void {
    if (documentIsHidden()) {
      playOnDocumentVisible = autoplayRunning
      return stopAutoplay()
    }

    if (playOnDocumentVisible) startAutoplay()
  }

  function documentIsHidden(): boolean {
    const { ownerDocument } = emblaApi.internalEngine().nodeHandler
    if (!ownerDocument) return false
    return ownerDocument.visibilityState === 'hidden'
  }

  function onPointerDown(): void {
    if (!mouseIsOver) stopAutoplay()
  }

  function onPointerUp(): void {
    if (!mouseIsOver) startAutoplay()
  }

  function onMouseEnter(): void {
    mouseIsOver = true
    stopAutoplay()
  }

  function onMouseLeave(): void {
    mouseIsOver = false
    startAutoplay()
  }

  function play(jumpOverride?: boolean): void {
    if (typeof jumpOverride !== 'undefined') jump = jumpOverride
    startAutoplay()
  }

  function stop(): void {
    if (autoplayRunning) stopAutoplay()
  }

  function reset(): void {
    if (autoplayRunning) startAutoplay()
  }

  function isPlaying(): boolean {
    return autoplayRunning
  }

  function next(): void {
    const { index } = emblaApi.internalEngine()
    const nextIndex = index.clone().add(1).get()
    const lastIndex = emblaApi.snapList().length - 1
    const kill = options.stopOnLastSnap && nextIndex === lastIndex

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext(jump)
    } else {
      emblaApi.scrollToSnap(0, jump)
    }

    emblaApi.emit('autoplay:select', null)

    if (kill) return stopAutoplay()
    startAutoplay()
  }

  function timeUntilNext(): number | null {
    if (!pluginIsActive()) return null
    if (!timerStartTime) return null
    const currentDelay = delay[emblaApi.selectedSnap()]
    const timePastSinceStart = new Date().getTime() - timerStartTime
    return currentDelay - timePastSinceStart
  }

  const self: AutoplayType = {
    name: 'autoplay',
    options: userOptions,
    init,
    destroy,
    play,
    stop,
    reset,
    isPlaying,
    timeUntilNext
  }
  return self
}

declare namespace Autoplay {
  let globalOptions: AutoplayOptionsType | undefined
}

Autoplay.globalOptions = undefined

export default Autoplay
