import { OptionsType, defaultOptions } from './Options'
import { CreatePluginType } from 'embla-carousel/components/Plugins'
import { OptionsHandlerType } from 'embla-carousel/components/OptionsHandler'
import { EmblaCarouselType } from 'embla-carousel'

declare module 'embla-carousel/components/Plugins' {
  interface EmblaPluginsType {
    autoplay?: AutoplayType
  }
}

declare module 'embla-carousel/components/EventHandler' {
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
  let wasPlaying = false
  let jump = false
  let animationFrame = 0
  let timer = 0

  function init(
    emblaApiInstance: EmblaCarouselType,
    optionsHandler: OptionsHandlerType
  ): void {
    emblaApi = emblaApiInstance
    if (emblaApi.scrollSnapList().length <= 1) return

    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, Autoplay.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)
    options = optionsAtMedia(allOptions)

    jump = options.jump
    destroyed = false

    const { eventStore, ownerDocument } = emblaApi.internalEngine()
    const emblaRoot = emblaApi.rootNode()
    const root = (options.rootNode && options.rootNode(emblaRoot)) || emblaRoot

    emblaApi.on('pointerDown', clearTimer)
    if (!options.stopOnInteraction) emblaApi.on('pointerUp', startTimer)

    if (options.stopOnMouseEnter) {
      eventStore.add(root, 'mouseenter', clearTimer)

      if (!options.stopOnInteraction) {
        eventStore.add(root, 'mouseleave', startTimer)
      }
    }

    if (options.stopOnFocusIn) {
      eventStore.add(root, 'focusin', clearTimer)

      if (!options.stopOnInteraction) {
        eventStore.add(root, 'focusout', startTimer)
      }
    }

    eventStore.add(ownerDocument, 'visibilitychange', () => {
      if (ownerDocument.visibilityState === 'hidden') {
        wasPlaying = playing
        return clearTimer()
      }

      if (wasPlaying) startTimer()
    })

    if (options.playOnInit) {
      emblaApi.on('init', startTimer).on('reInit', startTimer)
    }
  }

  function destroy(): void {
    destroyed = true
    playing = false
    emblaApi.off('init', startTimer).off('reInit', startTimer)
    emblaApi.off('pointerDown', clearTimer)
    if (!options.stopOnInteraction) emblaApi.off('pointerUp', startTimer)
    clearTimer()
    cancelAnimationFrame(animationFrame)
    animationFrame = 0
  }

  function startTimer(): void {
    if (destroyed) return
    if (!playing) emblaApi.emit('autoplay:play')
    const { ownerWindow } = emblaApi.internalEngine()
    ownerWindow.clearInterval(timer)
    timer = ownerWindow.setInterval(next, options.delay)
    playing = true
  }

  function clearTimer(): void {
    if (destroyed) return
    if (playing) emblaApi.emit('autoplay:stop')
    const { ownerWindow } = emblaApi.internalEngine()
    ownerWindow.clearInterval(timer)
    timer = 0
    playing = false
  }

  function play(jumpOverride?: boolean): void {
    if (typeof jumpOverride !== 'undefined') jump = jumpOverride
    startTimer()
  }

  function stop(): void {
    if (playing) clearTimer()
  }

  function reset(): void {
    if (playing) play()
  }

  function isPlaying(): boolean {
    return playing
  }

  function next(): void {
    animationFrame = requestAnimationFrame(() => {
      const { index } = emblaApi.internalEngine()
      const nextIndex = index.clone().add(1).get()
      const lastIndex = emblaApi.scrollSnapList().length - 1
      const kill = options.stopOnLastSnap && nextIndex === lastIndex

      if (kill) clearTimer()

      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext(jump)
      } else {
        emblaApi.scrollTo(0, jump)
      }
    })
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

Autoplay.globalOptions = <AutoplayOptionsType | undefined>undefined

export default Autoplay
