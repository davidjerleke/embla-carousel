import { OptionsType, defaultOptions } from './Options'
import { getAutoScrollRootNode } from './utils'
import {
  CreatePluginType,
  OptionsHandlerType,
  EmblaCarouselType,
  EngineType,
  ScrollBodyType,
  EmblaEventModelType
} from 'embla-carousel'

type AutoScrollInteractionType = {
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
    autoScroll: AutoScrollType
  }

  interface EmblaEventListType {
    'autoscroll:play': null
    'autoscroll:stop': null
    'autoscroll:interaction': AutoScrollInteractionType
  }
}

export type AutoScrollType = CreatePluginType<
  {
    play: (delay?: number) => void
    stop: () => void
    reset: () => void
    isPlaying: () => boolean
    setSpeed: (newSpeed: (initialSpeed: number) => number) => void
  },
  OptionsType
>

export type AutoScrollOptionsType = AutoScrollType['options']

function AutoScroll(userOptions: AutoScrollOptionsType = {}): AutoScrollType {
  let options: OptionsType
  let emblaApi: EmblaCarouselType
  let isSsr = false
  let destroyed = false

  let startDelay: number
  let speed = 0
  let timerId = 0
  let autoScrollRunning = false
  let defaultScrollBehaviour: ScrollBodyType
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
    const optionsBase = mergeOptions(defaultOptions, AutoScroll.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)

    destroyed = false
    options = optionsAtMedia(allOptions)
    isSsr = emblaApi.internalEngine().isSsr

    if (!pluginIsActive()) return
    if (emblaApi.snapList().length <= 1) return

    speed = options.speed
    startDelay = options.startDelay
    destroyed = false
    defaultScrollBehaviour = emblaApi.internalEngine().scrollBody
    onInteraction = options.defaultInteraction
      ? onDefaultInteraction
      : onCustomInteraction

    const { eventStore } = emblaApi.internalEngine()
    const root = getAutoScrollRootNode(emblaApi, options.rootNode)

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
      .off('settle', settle)

    stopAutoScroll()
    destroyed = true
    autoScrollRunning = false
  }

  function startAutoScroll(): void {
    if (!pluginIsActive()) return

    const engine = emblaApi.internalEngine()
    const { ownerWindow } = engine.nodeHandler

    if (!ownerWindow) return
    if (autoScrollRunning) return
    const event = emblaApi.createEvent('autoscroll:play', null)
    event.emit()

    timerId = ownerWindow.setTimeout(() => {
      engine.scrollBody = createAutoScrollBehaviour(engine)
      engine.animation.start()
    }, startDelay)

    autoScrollRunning = true
  }

  function stopAutoScroll(): void {
    if (!pluginIsActive()) return

    const engine = emblaApi.internalEngine()
    const { ownerWindow } = engine.nodeHandler

    if (!ownerWindow) return
    if (!autoScrollRunning) return
    const event = emblaApi.createEvent('autoscroll:stop', null)
    event.emit()

    engine.scrollBody = defaultScrollBehaviour
    ownerWindow.clearTimeout(timerId)
    timerId = 0

    autoScrollRunning = false
  }

  function createAutoScrollBehaviour(engine: EngineType): ScrollBodyType {
    const {
      location,
      previousLocation,
      offsetLocation,
      target,
      scrollTarget,
      indexCurrent,
      indexPrevious,
      limit: { pastMinBound, pastMaxBound, clamp },
      options: { loop }
    } = engine
    const directionSign = options.direction === 'forward' ? -1 : 1
    const noop = (): ScrollBodyType => self

    let bodyVelocity = 0
    let scrollDirection = 0
    let rawLocation = location.get()
    let rawLocationPrevious = 0
    let hasSettled = false

    function seek(): ScrollBodyType {
      let directionDiff = 0

      previousLocation.set(location)

      bodyVelocity = directionSign * speed
      rawLocation += bodyVelocity
      location.add(bodyVelocity)
      target.set(location)

      directionDiff = rawLocation - rawLocationPrevious
      scrollDirection = Math.sign(directionDiff)
      rawLocationPrevious = rawLocation

      const sourceSnap = indexCurrent.get()
      const targetSnap = scrollTarget.byDistance(0, false).index

      if (sourceSnap !== targetSnap) {
        indexPrevious.set(sourceSnap)
        indexCurrent.set(targetSnap)

        const event = emblaApi.createEvent('select', {
          sourceSnap,
          targetSnap
        })
        event.emit()
      }

      const reachedEnd =
        options.direction === 'forward'
          ? pastMinBound(offsetLocation)
          : pastMaxBound(offsetLocation)

      if (!loop && reachedEnd) {
        hasSettled = true
        const clampedLocation = clamp(location)
        location.set(clampedLocation)
        target.set(location)
        stopAutoScroll()
      }

      return self
    }

    const self: ScrollBodyType = {
      direction: () => scrollDirection,
      duration: () => -1,
      velocity: () => bodyVelocity,
      settled: () => hasSettled,
      seek,
      useBaseFriction: noop,
      useBaseDuration: noop,
      useFriction: noop,
      useDuration: noop
    }
    return self
  }

  function onDefaultInteraction(
    _: EmblaCarouselType,
    originalEvent: AutoScrollInteractionType['originalEvent'],
    customType?: AutoScrollInteractionType['interaction']
  ): void {
    const type = <AutoScrollInteractionType['interaction']>originalEvent.type
    const interaction = customType || type

    if (interaction === 'slidefocus') stopAutoScroll()
    if (interaction === 'pointerdown') stopAutoScroll()
  }

  function onCustomInteraction(
    _: EmblaCarouselType,
    originalEvent: AutoScrollInteractionType['originalEvent'],
    customType?: AutoScrollInteractionType['interaction']
  ): void {
    const type = <AutoScrollInteractionType['interaction']>originalEvent.type
    const interaction = customType || type
    if (interaction === 'mouseenter') isMouseOver = true
    if (interaction === 'mouseleave') isMouseOver = false
    if (interaction === 'pointerdown') isPointerDown = true
    if (interaction === 'pointerup') isPointerDown = false

    const event = emblaApi.createEvent('autoscroll:interaction', {
      interaction,
      originalEvent,
      isMouseOver,
      isPointerDown
    })

    event.emit()
  }

  function settle(): void {
    emblaApi.off('settle', settle)
    startAutoScroll()
  }

  function startAutoScrollOnSettle(): void {
    emblaApi.on('settle', settle)
  }

  function play(startDelayOverride?: number): void {
    if (typeof startDelayOverride !== 'undefined') {
      startDelay = startDelayOverride
    }
    startAutoScroll()
  }

  function stop(): void {
    if (autoScrollRunning) stopAutoScroll()
  }

  function reset(): void {
    if (autoScrollRunning) {
      stopAutoScroll()
      startAutoScrollOnSettle()
    }
  }

  function isPlaying(): boolean {
    return autoScrollRunning
  }

  function setSpeed(newSpeed: (initialSpeed: number) => number): void {
    speed = newSpeed(options.speed)
  }

  const self: AutoScrollType = {
    name: 'autoScroll',
    options: userOptions,
    init,
    destroy,
    play,
    stop,
    reset,
    isPlaying,
    setSpeed
  }
  return self
}

declare namespace AutoScroll {
  let globalOptions: AutoScrollOptionsType | undefined
}

AutoScroll.globalOptions = undefined

export default AutoScroll
