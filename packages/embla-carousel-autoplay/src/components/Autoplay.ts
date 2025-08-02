import { OptionsType, defaultOptions } from './Options'
import { getAutoplayRootNode, normalizeDelay } from './utils'
import {
  CreatePluginType,
  OptionsHandlerType,
  EmblaCarouselType,
  EmblaEventModelType
} from 'embla-carousel'

type AutoplayInteractionType = {
  interaction:
    | 'pointerdown'
    | 'pointerup'
    | 'mouseenter'
    | 'mouseleave'
    | 'slidefocus'
    | 'slidefocusout'
  originalEvent:
    | EmblaEventModelType<'pointerdown'>
    | EmblaEventModelType<'pointerup'>
    | EmblaEventModelType<'slidefocus'>
    | MouseEvent
    | FocusEvent
  isMouseOver: boolean
  isPointerDown: boolean
}

declare module 'embla-carousel' {
  interface EmblaPluginsType {
    autoplay: AutoplayType
  }

  interface EmblaEventListType {
    'autoplay:play': null
    'autoplay:stop': null
    'autoplay:interaction': AutoplayInteractionType
    'autoplay:select': EmblaEventListType['select']
    'autoplay:timerset': { startTime: number }
    'autoplay:timerstopped': { stopTime: number }
  }
}

export type AutoplayType = CreatePluginType<
  {
    play: (jump?: boolean) => void
    stop: () => void
    reset: () => void
    pause: () => void
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
  let pauseDelay: null | number = null
  let timerStartTime: null | number = null
  let timerId = 0
  let autoplayRunning = false
  let playOnDocumentVisible = false
  let instant = false
  let isMouseOver = false
  let isPointerDown = false
  let onInteraction = onDefaultInteraction

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

    instant = options.instant
    delay = normalizeDelay(emblaApi, options.delay)
    onInteraction = options.defaultInteraction
      ? onDefaultInteraction
      : onCustomInteraction

    const { eventStore, nodeHandler } = emblaApi.internalEngine()
    const { ownerDocument } = nodeHandler
    const root = getAutoplayRootNode(emblaApi, options.rootNode)

    if (ownerDocument) {
      eventStore.add(ownerDocument, 'visibilitychange', onVisibilityChange)
    }

    emblaApi.on('pointerdown', onInteraction)
    emblaApi.on('pointerup', onInteraction)
    emblaApi.on('slidefocus', onInteraction)

    eventStore.add(root, 'mouseenter', (event) =>
      onInteraction(emblaApi, event, event.type)
    )
    eventStore.add(root, 'mouseleave', (event) =>
      onInteraction(emblaApi, event, event.type)
    )
    eventStore.add(emblaApi.containerNode(), 'focusout', (event) =>
      onInteraction(emblaApi, event, 'slidefocusout')
    )
  }

  function destroy(): void {
    if (!pluginIsActive()) return

    emblaApi
      .off('pointerdown', onInteraction)
      .off('pointerup', onInteraction)
      .off('slidefocus', onInteraction)

    stopAutoplay()
    destroyed = true
    autoplayRunning = false
  }

  function setTimer(): void {
    const { ownerWindow } = emblaApi.internalEngine().nodeHandler
    if (!ownerWindow) return

    const startTime = new Date().getTime()
    const event = emblaApi.createEvent('autoplay:timerset', { startTime })

    ownerWindow.clearTimeout(timerId)
    timerId = ownerWindow.setTimeout(next, getDelay())
    timerStartTime = startTime
    event.emit()
  }

  function clearTimer(): void {
    const { ownerWindow } = emblaApi.internalEngine().nodeHandler
    if (!ownerWindow) return

    const stopTime = new Date().getTime()
    const event = emblaApi.createEvent('autoplay:timerstopped', { stopTime })

    ownerWindow.clearTimeout(timerId)
    timerId = 0
    timerStartTime = null
    event.emit()
  }

  function startAutoplay(): void {
    if (!pluginIsActive()) return
    if (documentIsHidden()) {
      playOnDocumentVisible = true
      return
    }

    if (!autoplayRunning) {
      const event = emblaApi.createEvent('autoplay:play', null)
      event.emit()
    }

    setTimer()
    autoplayRunning = true
  }

  function stopAutoplay(): void {
    if (!pluginIsActive()) return

    if (autoplayRunning) {
      const event = emblaApi.createEvent('autoplay:stop', null)
      event.emit()
    }

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

  function onDefaultInteraction(
    _: EmblaCarouselType,
    originalEvent: AutoplayInteractionType['originalEvent'],
    customType?: AutoplayInteractionType['interaction']
  ): void {
    const type = <AutoplayInteractionType['interaction']>originalEvent.type
    const interaction = customType || type

    if (interaction === 'slidefocus') stopAutoplay()
    if (interaction === 'pointerdown') stopAutoplay()
  }

  function onCustomInteraction(
    _: EmblaCarouselType,
    originalEvent: AutoplayInteractionType['originalEvent'],
    customType?: AutoplayInteractionType['interaction']
  ): void {
    const type = <AutoplayInteractionType['interaction']>originalEvent.type
    const interaction = customType || type
    if (interaction === 'mouseenter') isMouseOver = true
    if (interaction === 'mouseleave') isMouseOver = false
    if (interaction === 'pointerdown') isPointerDown = true
    if (interaction === 'pointerup') isPointerDown = false

    const event = emblaApi.createEvent('autoplay:interaction', {
      interaction,
      originalEvent,
      isMouseOver,
      isPointerDown
    })

    event.emit()
  }

  function play(instantOverride?: boolean): void {
    instant = instantOverride ?? instant
    startAutoplay()
  }

  function stop(): void {
    if (autoplayRunning) stopAutoplay()
  }

  function reset(): void {
    if (autoplayRunning) startAutoplay()
  }

  function pause(): void {
    if (!autoplayRunning) return
    pauseDelay = timeUntilNext()
    stopAutoplay()
  }

  function isPlaying(): boolean {
    return autoplayRunning
  }

  function next(): void {
    const { indexCurrent } = emblaApi.internalEngine()
    const nextIndex = indexCurrent.clone().add(1).get()
    const lastIndex = emblaApi.snapList().length - 1
    const kill = options.stopOnLastSnap && nextIndex === lastIndex

    const event = emblaApi.createEvent('autoplay:select', {
      targetSnap: emblaApi.canScrollToNext() ? nextIndex : 0,
      sourceSnap: indexCurrent.get()
    })

    if (emblaApi.canScrollToNext()) {
      emblaApi.scrollToNext(instant)
    } else {
      emblaApi.scrollToSnap(0, instant)
    }

    event.emit()
    pauseDelay = null

    if (kill) return stopAutoplay()
    startAutoplay()
  }

  function getDelay(): number {
    return pauseDelay || delay[emblaApi.selectedSnap()]
  }

  function timeUntilNext(): number | null {
    if (!pluginIsActive()) return null
    if (!timerStartTime) return null
    const timePastSinceStart = new Date().getTime() - timerStartTime
    return getDelay() - timePastSinceStart
  }

  const self: AutoplayType = {
    name: 'autoplay',
    options: userOptions,
    init,
    destroy,
    play,
    stop,
    reset,
    pause,
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
