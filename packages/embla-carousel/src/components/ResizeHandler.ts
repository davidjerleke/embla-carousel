import { AxisType } from './Axis'
import { EmblaCarouselType } from './EmblaCarousel'
import { EventHandlerType } from './EventHandler'
import { NodeRectsType } from './NodeRects'
import { isBoolean, mathAbs, WindowType } from './utils'

type ResizeHandlerCallbackType = (
  emblaApi: EmblaCarouselType,
  entries: ResizeObserverEntry[]
) => boolean | void

export type ResizeHandlerOptionType = boolean | ResizeHandlerCallbackType

export type ResizeHandlerType = {
  init: (emblaApi: EmblaCarouselType) => void
  destroy: () => void
}

export function ResizeHandler(
  container: HTMLElement,
  eventHandler: EventHandlerType,
  ownerWindow: WindowType,
  slides: HTMLElement[],
  axis: AxisType,
  watchResize: ResizeHandlerOptionType,
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

  function init(emblaApi: EmblaCarouselType): void {
    if (!watchResize) return

    containerSize = readSize(container)
    slideSizes = slides.map(readSize)

    function defaultCallback(entries: ResizeObserverEntry[]): void {
      for (const entry of entries) {
        if (destroyed) return

        const isContainer = entry.target === container
        const slideIndex = slides.indexOf(<HTMLElement>entry.target)
        const lastSize = isContainer ? containerSize : slideSizes[slideIndex]
        const newSize = readSize(isContainer ? container : slides[slideIndex])
        const diffSize = mathAbs(newSize - lastSize)

        if (diffSize >= 0.5) {
          emblaApi.reInit()
          eventHandler.emit('resize')

          break
        }
      }
    }

    resizeObserver = new ResizeObserver((entries) => {
      if (isBoolean(watchResize) || watchResize(emblaApi, entries)) {
        defaultCallback(entries)
      }
    })

    ownerWindow.requestAnimationFrame(() => {
      observeNodes.forEach((node) => resizeObserver.observe(node))
    })
  }

  function destroy(): void {
    destroyed = true
    if (resizeObserver) resizeObserver.disconnect()
  }

  const self: ResizeHandlerType = {
    init,
    destroy
  }
  return self
}
