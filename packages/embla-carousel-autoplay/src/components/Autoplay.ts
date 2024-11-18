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
    autoplayPlay: 'autoplay:play'
    autoplayStop: 'autoplay:stop'
    autoplaySelect: 'autoplay:select'
    autoplayTimerSet: 'autoplay:timerset'
    autoplayTimerStopped: 'autoplay:timerstopped'
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
  let destroyed: boolean
  let delay: ReturnType<EmblaCarouselType['scrollSnapList']>
  let timerStartTime: null | number = null
  let timerId = 0
  let autoplayActive = false
  let mouseIsOver = false
  let playOnDocumentVisible = false
  let jump = false

  function init(
    emblaApiInstance: EmblaCarouselType,
    optionsHandler: OptionsHandlerType
  ): void {
    emblaApi = emblaApiInstance

    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, Autoplay.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)
    options = optionsAtMedia(allOptions)

    if (emblaApi.scrollSnapList().length <= 1) return

    jump = options.jump
    destroyed = false
    delay = normalizeDelay(emblaApi, options.delay)

    const { eventStore, ownerDocument } = emblaApi.internalEngine()
    const isDraggable = !!emblaApi.internalEngine().options.watchDrag
    const root = getAutoplayRootNode(emblaApi, options.rootNode)

    eventStore.add(ownerDocument, 'visibilitychange', visibilityChange)

    if (isDraggable) {
      emblaApi.on('pointerDown', pointerDown)
    }

    if (isDraggable && !options.stopOnInteraction) {
      emblaApi.on('pointerUp', pointerUp)
    }

    if (options.stopOnMouseEnter) {
      eventStore.add(root, 'mouseenter', mouseEnter)
    }

    if (options.stopOnMouseEnter && !options.stopOnInteraction) {
      eventStore.add(root, 'mouseleave', mouseLeave)
    }

    if (options.stopOnFocusIn) {
      emblaApi.on('slideFocusStart', stopAutoplay)
    }

    if (options.stopOnFocusIn && !options.stopOnInteraction) {
      eventStore.add(emblaApi.containerNode(), 'focusout', startAutoplay)
    }

    if (options.playOnInit && !documentIsHidden()) startAutoplay()
  }

  function destroy(): void {
    emblaApi
      .off('pointerDown', pointerDown)
      .off('pointerUp', pointerUp)
      .off('slideFocusStart', stopAutoplay)

    stopAutoplay()
    destroyed = true
    autoplayActive = false
  }

  function setTimer(): void {
    const { ownerWindow } = emblaApi.internalEngine()
    ownerWindow.clearTimeout(timerId)
    timerId = ownerWindow.setTimeout(next, delay[emblaApi.selectedScrollSnap()])
    timerStartTime = new Date().getTime()
    emblaApi.emit('autoplay:timerset')
  }

  function clearTimer(): void {
    const { ownerWindow } = emblaApi.internalEngine()
    ownerWindow.clearTimeout(timerId)
    timerId = 0
    timerStartTime = null
    emblaApi.emit('autoplay:timerstopped')
  }

  function startAutoplay(): void {
    if (destroyed) return
    if (!autoplayActive) emblaApi.emit('autoplay:play')

    setTimer()
    autoplayActive = true
  }

  function stopAutoplay(): void {
    if (destroyed) return
    if (autoplayActive) emblaApi.emit('autoplay:stop')

    clearTimer()
    autoplayActive = false
  }

  function visibilityChange(): void {
    if (documentIsHidden()) {
      playOnDocumentVisible = autoplayActive
      return stopAutoplay()
    }

    if (playOnDocumentVisible) startAutoplay()
  }

  function documentIsHidden(): boolean {
    const { ownerDocument } = emblaApi.internalEngine()
    return ownerDocument.visibilityState === 'hidden'
  }

  function pointerDown(): void {
    if (!mouseIsOver) stopAutoplay()
  }

  function pointerUp(): void {
    if (!mouseIsOver) startAutoplay()
  }

  function mouseEnter(): void {
    mouseIsOver = true
    stopAutoplay()
  }

  function mouseLeave(): void {
    mouseIsOver = false
    startAutoplay()
  }

  function play(jumpOverride?: boolean): void {
    if (typeof jumpOverride !== 'undefined') jump = jumpOverride
    startAutoplay()
  }

  function stop(): void {
    if (autoplayActive) stopAutoplay()
  }

  function reset(): void {
    if (autoplayActive) startAutoplay()
  }

  function isPlaying(): boolean {
    return autoplayActive
  }

  function next(): void {
    const { index } = emblaApi.internalEngine()
    const nextIndex = index.clone().add(1).get()
    const lastIndex = emblaApi.scrollSnapList().length - 1
    const kill = options.stopOnLastSnap && nextIndex === lastIndex

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext(jump)
    } else {
      emblaApi.scrollTo(0, jump)
    }

    emblaApi.emit('autoplay:select')

    if (kill) return stopAutoplay()
    startAutoplay()
  }

  function timeUntilNext(): number | null {
    if (!timerStartTime) return null
    const currentDelay = delay[emblaApi.selectedScrollSnap()]
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
