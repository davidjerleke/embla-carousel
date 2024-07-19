import { OptionsType, defaultOptions } from './Options'
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
    autoScrollPlay: 'autoScroll:play'
    autoScrollStop: 'autoScroll:stop'
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
  let destroyed: boolean
  let playing = false
  let resume = true
  let timer = 0
  let startDelay: number
  let defaultScrollBehaviour: ScrollBodyType

  function init(
    emblaApiInstance: EmblaCarouselType,
    optionsHandler: OptionsHandlerType
  ): void {
    emblaApi = emblaApiInstance

    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, AutoScroll.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)
    options = optionsAtMedia(allOptions)

    if (emblaApi.scrollSnapList().length <= 1) return

    startDelay = options.startDelay
    destroyed = false
    defaultScrollBehaviour = emblaApi.internalEngine().scrollBody

    const { eventStore } = emblaApi.internalEngine()
    const emblaRoot = emblaApi.rootNode()
    const root = (options.rootNode && options.rootNode(emblaRoot)) || emblaRoot
    const container = emblaApi.containerNode()

    emblaApi.on('pointerDown', stopScroll)

    if (!options.stopOnInteraction) {
      emblaApi.on('pointerUp', startScrollOnSettle)
    }

    if (options.stopOnMouseEnter) {
      eventStore.add(root, 'mouseenter', () => {
        resume = false
        stopScroll()
      })

      if (!options.stopOnInteraction) {
        eventStore.add(root, 'mouseleave', () => {
          resume = true
          startScroll()
        })
      }
    }

    if (options.stopOnFocusIn) {
      eventStore.add(container, 'focusin', () => {
        stopScroll()
        emblaApi.scrollTo(emblaApi.selectedScrollSnap(), true)
      })

      if (!options.stopOnInteraction) {
        eventStore.add(container, 'focusout', startScroll)
      }
    }

    if (options.playOnInit) startScroll()
  }

  function destroy(): void {
    emblaApi
      .off('pointerDown', stopScroll)
      .off('pointerUp', startScrollOnSettle)
      .off('settle', onSettle)
    stopScroll()
    destroyed = true
    playing = false
  }

  function startScroll(): void {
    if (destroyed || playing) return
    if (!resume) return
    emblaApi.emit('autoScroll:play')

    const engine = emblaApi.internalEngine()
    const { ownerWindow } = engine

    timer = ownerWindow.setTimeout(() => {
      engine.scrollBody = createAutoScrollBehaviour(engine)
      engine.animation.start()
    }, startDelay)

    playing = true
  }

  function stopScroll(): void {
    if (destroyed || !playing) return
    emblaApi.emit('autoScroll:stop')

    const engine = emblaApi.internalEngine()
    const { ownerWindow } = engine

    engine.scrollBody = defaultScrollBehaviour
    ownerWindow.clearTimeout(timer)
    timer = 0

    playing = false
  }

  function onSettle(): void {
    if (resume) startScroll()
    emblaApi.off('settle', onSettle)
  }

  function startScrollOnSettle(): void {
    emblaApi.on('settle', onSettle)
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

    function seek(timeStep: number): ScrollBodyType {
      const fixedDeltaTimeSeconds = timeStep / 1000
      let directionDiff = 0

      previousLocation.set(location)

      bodyVelocity = directionSign * options.speed * 55
      rawLocation += bodyVelocity
      location.add(bodyVelocity * fixedDeltaTimeSeconds)
      target.set(location)

      directionDiff = rawLocation - rawLocationPrevious
      scrollDirection = Math.sign(directionDiff)
      rawLocationPrevious = rawLocation

      const currentIndex = scrollTarget.byDistance(0, false).index

      if (index.get() !== currentIndex) {
        indexPrevious.set(index.get())
        index.set(currentIndex)
        emblaApi.emit('select')
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
        stopScroll()
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

  function play(startDelayOverride?: number): void {
    if (typeof startDelayOverride !== 'undefined') {
      startDelay = startDelayOverride
    }
    resume = true
    startScroll()
  }

  function stop(): void {
    if (playing) stopScroll()
  }

  function reset(): void {
    if (playing) {
      stopScroll()
      startScrollOnSettle()
    }
  }

  function isPlaying(): boolean {
    return playing
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
