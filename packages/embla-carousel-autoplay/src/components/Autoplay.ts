import { OptionsType, defaultOptions } from './Options'
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
  }
}

export type AutoplayType = CreatePluginType<
  {
    play: (jump?: boolean) => void
    stop: () => void
    reset: () => void
    isPlaying: () => boolean
  },
  OptionsType
>

export type AutoplayOptionsType = AutoplayType['options']

function Autoplay(userOptions: AutoplayOptionsType = {}): AutoplayType {
  let options: OptionsType
  let emblaApi: EmblaCarouselType
  let destroyed: boolean
  let playing = false
  let resume = true
  let jump = false
  let timer = 0

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

    const { eventStore, ownerDocument } = emblaApi.internalEngine()
    const emblaRoot = emblaApi.rootNode()
    const root = (options.rootNode && options.rootNode(emblaRoot)) || emblaRoot
    const container = emblaApi.containerNode()

    emblaApi.on('pointerDown', stopTimer)

    if (!options.stopOnInteraction) {
      emblaApi.on('pointerUp', startTimer)
    }

    if (options.stopOnMouseEnter) {
      eventStore.add(root, 'mouseenter', () => {
        resume = false
        stopTimer()
      })

      if (!options.stopOnInteraction) {
        eventStore.add(root, 'mouseleave', () => {
          resume = true
          startTimer()
        })
      }
    }

    if (options.stopOnFocusIn) {
      eventStore.add(container, 'focusin', stopTimer)

      if (!options.stopOnInteraction) {
        eventStore.add(container, 'focusout', startTimer)
      }
    }

    eventStore.add(ownerDocument, 'visibilitychange', visibilityChange)

    if (options.playOnInit && !documentIsHidden()) startTimer()
  }

  function destroy(): void {
    emblaApi.off('pointerDown', stopTimer).off('pointerUp', startTimer)
    stopTimer()
    destroyed = true
    playing = false
  }

  function startTimer(): void {
    if (destroyed) return
    if (!resume) return
    if (!playing) emblaApi.emit('autoplay:play')
    const { ownerWindow } = emblaApi.internalEngine()
    ownerWindow.clearInterval(timer)
    timer = ownerWindow.setInterval(next, options.delay)
    playing = true
  }

  function stopTimer(): void {
    if (destroyed) return
    if (playing) emblaApi.emit('autoplay:stop')
    const { ownerWindow } = emblaApi.internalEngine()
    ownerWindow.clearInterval(timer)
    timer = 0
    playing = false
  }

  function visibilityChange(): void {
    if (documentIsHidden()) {
      resume = playing
      return stopTimer()
    }

    if (resume) startTimer()
  }

  function documentIsHidden(): boolean {
    const { ownerDocument } = emblaApi.internalEngine()
    return ownerDocument.visibilityState === 'hidden'
  }

  function play(jumpOverride?: boolean): void {
    if (typeof jumpOverride !== 'undefined') jump = jumpOverride
    resume = true
    startTimer()
  }

  function stop(): void {
    if (playing) stopTimer()
  }

  function reset(): void {
    if (playing) play()
  }

  function isPlaying(): boolean {
    return playing
  }

  function next(): void {
    const { index } = emblaApi.internalEngine()
    const nextIndex = index.clone().add(1).get()
    const lastIndex = emblaApi.scrollSnapList().length - 1
    const kill = options.stopOnLastSnap && nextIndex === lastIndex

    if (kill) stopTimer()

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext(jump)
    } else {
      emblaApi.scrollTo(0, jump)
    }
  }

  const self: AutoplayType = {
    name: 'autoplay',
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

declare namespace Autoplay {
  let globalOptions: AutoplayOptionsType | undefined
}

Autoplay.globalOptions = undefined

export default Autoplay
