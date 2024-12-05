import { AxisType } from './Axis'
import { EmblaCarouselType } from './EmblaCarousel'
import { EventHandlerType } from './EventHandler'
import { WatchHandlerType } from './WatchHandler'
import { NodeRectsType } from './NodeRects'
import { mathAbs, WindowType } from './utils'

export type ResizeHandlerType = {
  init: () => void
  destroy: () => void
}

export function ResizeHandler(
  active: boolean,
  container: HTMLElement,
  eventHandler: EventHandlerType,
  watchHandler: WatchHandlerType,
  ownerWindow: WindowType,
  slides: HTMLElement[],
  axis: AxisType,
  nodeRects: NodeRectsType
): ResizeHandlerType {
  const observeNodes = [container].concat(slides)
  let resizeObserver: ResizeObserver
  let containerSize: number
  let slideSizes: number[] = []
  let destroyed = false

  function readSize(node: HTMLElement): number {
    return axis.measureSize(nodeRects.measure(node))
  }

  function init(): void {
    if (!active) return

    containerSize = readSize(container)
    slideSizes = slides.map(readSize)

    resizeObserver = new ResizeObserver((entries) => {
      watchHandler.emit('resize', entries, onResize)
    })

    ownerWindow.requestAnimationFrame(() => {
      observeNodes.forEach((node) => resizeObserver.observe(node))
    })
  }

  function destroy(): void {
    destroyed = true
    if (resizeObserver) resizeObserver.disconnect()
  }

  function onResize(
    entries: ResizeObserverEntry[],
    emblaApi: EmblaCarouselType
  ): void {
    for (const entry of entries) {
      if (destroyed) return

      const isContainer = entry.target === container
      const slideIndex = slides.indexOf(<HTMLElement>entry.target)
      const lastSize = isContainer ? containerSize : slideSizes[slideIndex]

      const newSize = readSize(isContainer ? container : slides[slideIndex])
      const diffSize = mathAbs(newSize - lastSize)

      if (diffSize >= 0.5) {
        emblaApi.reInit()
        eventHandler.emit('resize', entries)
        break
      }
    }
  }

  const self: ResizeHandlerType = {
    init,
    destroy
  }
  return self
}
