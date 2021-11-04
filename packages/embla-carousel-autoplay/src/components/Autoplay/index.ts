import { defaultOptions, AutoplayOptionsType, OptionsType } from './Options'
import { EmblaCarouselType, EmblaPluginType } from 'embla-carousel'

export type AutoplayType = EmblaPluginType<OptionsType> & {
  play: () => void
  stop: () => void
  reset: () => void
  next: () => void
}

function Autoplay(
  userOptions?: AutoplayOptionsType,
  userNode?: (emblaRoot: HTMLElement) => HTMLElement | null,
): AutoplayType {
  const options = Object.assign({}, defaultOptions, userOptions)
  const { stopOnInteraction, stopOnMouseEnter, stopOnLastSnap, delay } = options
  let carousel: EmblaCarouselType
  let mouseEntered = false
  let timer = 0

  function init(embla: EmblaCarouselType): void {
    carousel = embla
    const { eventStore } = carousel.internalEngine()
    const emblaRoot = carousel.rootNode()
    const root = (userNode && userNode(emblaRoot)) || emblaRoot

    carousel.on('init', play)
    carousel.on('pointerDown', stop)
    carousel.on('pointerUp', reset)

    if (stopOnMouseEnter) {
      eventStore.add(root, 'mouseenter', () => {
        mouseEntered = true
        stop()
      })
      eventStore.add(root, 'mouseleave', () => {
        mouseEntered = false
        reset()
      })
    }
  }

  function destroy(): void {
    carousel.off('init', play)
    carousel.off('pointerDown', stop)
    carousel.off('pointerUp', reset)
    mouseEntered = false
    stop()
  }

  function play(): void {
    stop()
    requestAnimationFrame(() => {
      timer = window.setTimeout(next, delay)
    })
  }

  function stop(): void {
    if (!timer) return
    window.clearTimeout(timer)
    timer = 0
  }

  function reset(): void {
    stop()
    if (stopOnMouseEnter && mouseEntered) return
    if (!stopOnInteraction) play()
  }

  function next(): void {
    const { index } = carousel.internalEngine()
    const proceed = index.get() !== index.max || !stopOnLastSnap

    if (!proceed) return

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
    next,
  }
  return self
}

export default Autoplay
