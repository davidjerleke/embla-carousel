import { defaultOptions, AutoplayOptionsType, OptionsType } from './Options'
import { CreatePluginType } from 'embla-carousel/components/Plugins'
import { EmblaCarouselType } from 'embla-carousel'

export type AutoplayType = CreatePluginType<
  {
    play: () => void
    stop: () => void
    reset: () => void
  },
  OptionsType
>

function Autoplay(
  userOptions?: AutoplayOptionsType,
  userNode?: (emblaRoot: HTMLElement) => HTMLElement | null,
): AutoplayType {
  const options = Object.assign(
    {},
    defaultOptions,
    Autoplay.globalOptions,
    userOptions,
  )
  const {
    playOnInit,
    stopOnInteraction,
    stopOnMouseEnter,
    stopOnLastSnap,
    delay,
  } = options
  const interaction = stopOnInteraction ? destroy : stop
  let carousel: EmblaCarouselType
  let timer = 0

  function init(embla: EmblaCarouselType): void {
    carousel = embla
    const { eventStore } = carousel.internalEngine()
    const emblaRoot = carousel.rootNode()
    const root = (userNode && userNode(emblaRoot)) || emblaRoot

    carousel.on('pointerDown', interaction)
    if (!stopOnInteraction) carousel.on('pointerUp', reset)

    if (stopOnMouseEnter) {
      eventStore.add(root, 'mouseenter', interaction)
      if (!stopOnInteraction) eventStore.add(root, 'mouseleave', reset)
    }

    eventStore.add(document, 'visibilitychange', () => {
      if (document.visibilityState === 'hidden') return stop()
      reset()
    })
    eventStore.add(window, 'pagehide', (event: PageTransitionEvent) => {
      if (event.persisted) stop()
    })

    if (playOnInit) play()
  }

  function destroy(): void {
    carousel.off('pointerDown', interaction)
    if (!stopOnInteraction) carousel.off('pointerUp', reset)
    stop()
    timer = 0
  }

  function play(): void {
    stop()
    timer = window.setTimeout(next, delay)
  }

  function stop(): void {
    if (!timer) return
    window.clearTimeout(timer)
  }

  function reset(): void {
    if (!timer) return
    stop()
    play()
  }

  function next(): void {
    const { index } = carousel.internalEngine()
    const kill = stopOnLastSnap && index.get() === index.max

    if (kill) return destroy()

    if (carousel.canScrollNext()) {
      carousel.scrollNext()
    } else {
      carousel.scrollTo(0)
    }
    play()
  }

  const self: AutoplayType = {
    name: 'Autoplay',
    options,
    init,
    destroy,
    play,
    stop,
    reset,
  }
  return self
}

Autoplay.globalOptions = <AutoplayOptionsType | undefined>undefined

export default Autoplay
