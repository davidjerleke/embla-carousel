import { AxisType } from './Axis'
import { EmblaCarouselType } from './EmblaCarousel'
import { EventHandlerType } from './EventHandler'
import { isBoolean } from './utils'

type ResizeHandlerCallbackType = (
  entries: ResizeObserverEntry[],
  emblaApi: EmblaCarouselType,
) => void

export type ResizeHandlerOptionType = boolean | ResizeHandlerCallbackType

export type ResizeHandlerType = {
  init: (
    emblaApi: EmblaCarouselType,
    watchResize: ResizeHandlerOptionType,
  ) => void
  destroy: () => void
}

export function ResizeHandler(
  container: HTMLElement,
  slides: HTMLElement[],
  axis: AxisType,
  eventHandler: EventHandlerType,
): ResizeHandlerType {
  let resizeObserver: ResizeObserver
  let containerSize: number
  let slideSizes: number[] = []
  let destroyed = false

  function readSize(node: Element | HTMLElement): number {
    return axis.measureSize(node.getBoundingClientRect())
  }

  function init(
    emblaApi: EmblaCarouselType,
    watchResize: ResizeHandlerOptionType,
  ): void {
    if (!watchResize) return

    containerSize = readSize(container)
    slideSizes = slides.map(readSize)

    const defaultCallback = (entries: ResizeObserverEntry[]): void => {
      entries.forEach((entry) => {
        const slideSize = slideSizes[slides.indexOf(<HTMLElement>entry.target)]
        const lastSize = entry.target === container ? containerSize : slideSize

        if (lastSize !== readSize(entry.target)) emblaApi.reInit()
        eventHandler.emit('resize')
      })
    }

    resizeObserver = new ResizeObserver((entries) => {
      if (destroyed) return
      if (isBoolean(watchResize)) defaultCallback(entries)
      else watchResize(entries, emblaApi)
    })

    const observeNodes = [container].concat(slides)
    observeNodes.forEach((node) => resizeObserver.observe(node))
  }

  function destroy(): void {
    if (resizeObserver) resizeObserver.disconnect()
    destroyed = true
  }

  const self: ResizeHandlerType = {
    init,
    destroy,
  }
  return self
}
