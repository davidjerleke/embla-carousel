import { OptionsType, defaultOptions } from './Options'
import { getAutoScrollRootNode } from './utils'
import {
  CreatePluginType,
  OptionsHandlerType,
  EmblaCarouselType,
  EngineType,
  ScrollBodyType
} from 'embla-carousel'

declare module 'embla-carousel' {
  interface EmblaPluginsType {
    autoScroll: AutoScrollType
  }

  interface EmblaEventListType {
    'autoscroll:play': 'autoscroll:play'
    'autoscroll:stop': 'autoscroll:stop'
  }

  interface EmblaEventDetailType {
    'autoscroll:play': null
    'autoscroll:stop': null
  }
}

export type AutoScrollType = CreatePluginType<
  {
    play: (delay?: number) => void
    stop: () => void
    reset: () => void
    isPlaying: () => boolean
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
  let timerId = 0
  let autoScrollRunning = false
  let mouseIsOver = false
  let defaultScrollBehaviour: ScrollBodyType

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

    startDelay = options.startDelay
    destroyed = false
    defaultScrollBehaviour = emblaApi.internalEngine().scrollBody

    const { eventStore } = emblaApi.internalEngine()
    const isDraggable = emblaApi.internalEngine().options.draggable
    const root = getAutoScrollRootNode(emblaApi, options.rootNode)

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
      emblaApi.on('slidefocusstart', stopAutoScroll)
    }

    if (options.stopOnFocusIn && !options.stopOnInteraction) {
      eventStore.add(emblaApi.containerNode(), 'focusout', startAutoScroll)
    }

    if (options.playOnInit) startAutoScroll()
  }

  function destroy(): void {
    if (!pluginIsActive()) return

    emblaApi
      .off('pointerdown', onPointerDown)
      .off('pointerup', onPointerUp)
      .off('slidefocusstart', stopAutoScroll)
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
    emblaApi.emit('autoscroll:play', null)

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
    emblaApi.emit('autoscroll:stop', null)

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
      index,
      indexPrevious,
      limit: { reachedMin, reachedMax, constrain },
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

      bodyVelocity = directionSign * options.speed
      rawLocation += bodyVelocity
      location.add(bodyVelocity)
      target.set(location)

      directionDiff = rawLocation - rawLocationPrevious
      scrollDirection = Math.sign(directionDiff)
      rawLocationPrevious = rawLocation

      const currentIndex = scrollTarget.byDistance(0, false).index

      if (index.get() !== currentIndex) {
        indexPrevious.set(index.get())
        index.set(currentIndex)
        emblaApi.emit('select', null)
      }

      const reachedEnd =
        options.direction === 'forward'
          ? reachedMin(offsetLocation.get())
          : reachedMax(offsetLocation.get())

      if (!loop && reachedEnd) {
        hasSettled = true
        const constrainedLocation = constrain(location.get())
        location.set(constrainedLocation)
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

  function onPointerDown(): void {
    if (!mouseIsOver) stopAutoScroll()
  }

  function onPointerUp(): void {
    if (!mouseIsOver) startAutoScrollOnSettle()
  }

  function onMouseEnter(): void {
    mouseIsOver = true
    stopAutoScroll()
  }

  function onMouseLeave(): void {
    mouseIsOver = false
    startAutoScroll()
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

  const self: AutoScrollType = {
    name: 'autoScroll',
    options: userOptions,
    init,
    destroy,
    play,
    stop,
    reset,
    isPlaying
  }
  return self
}

declare namespace AutoScroll {
  let globalOptions: AutoScrollOptionsType | undefined
}

AutoScroll.globalOptions = undefined

export default AutoScroll
