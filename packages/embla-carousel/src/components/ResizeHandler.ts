import { AxisType } from './Axis'
import { EmblaCarouselType } from './EmblaCarousel'
import { EventHandlerType } from './EventHandler'
import { NodeHandlerType } from './NodeHandler'
import { mathAbs, WindowType } from './utils'

export type ResizeHandlerType = {
  init: (ownerWindow: WindowType) => void
  destroy: () => void
}

export function ResizeHandler(
  active: boolean,
  container: HTMLElement,
  eventHandler: EventHandlerType,
  slides: HTMLElement[],
  axis: AxisType,
  nodeHandler: NodeHandlerType
): ResizeHandlerType {
  const observeNodes = [container, ...slides]
  let resizeObserver: ResizeObserver
  let containerSize: number
  let slideSizes: number[] = []
  let destroyed = false
  let resizeWindow: WindowType
  let reInitAnimationFrame: number | null = null
  let reInitScheduled = false

  function readSize(node: HTMLElement): number {
    return axis.getSize(nodeHandler.getRect(node))
  }

  function init(ownerWindow: WindowType): void {
    if (!active) return

    resizeWindow = ownerWindow
    containerSize = readSize(container)
    slideSizes = slides.map(readSize)

    resizeObserver = new ownerWindow.ResizeObserver(onResize)
    ownerWindow.requestAnimationFrame(() => {
      observeNodes.forEach((node) => resizeObserver.observe(node))
    })
  }

  function destroy(): void {
    destroyed = true
    if (resizeObserver) resizeObserver.disconnect()
    if (reInitAnimationFrame !== null) {
      resizeWindow.cancelAnimationFrame(reInitAnimationFrame)
      reInitAnimationFrame = null
    }
    reInitScheduled = false
  }

  function scheduleReInit(api: EmblaCarouselType): void {
    // Defer reInit() instead of calling it synchronously from inside the
    // ResizeObserver callback, which browsers can report as a ResizeObserver
    // loop. Multiple resize batches arriving before the frame fires collapse
    // into a single reInit() call.
    if (reInitScheduled) return
    reInitScheduled = true

    reInitAnimationFrame = resizeWindow.requestAnimationFrame(() => {
      reInitScheduled = false
      reInitAnimationFrame = null
      if (!destroyed) api.reInit()
    })
  }

  function onResize(entries: ResizeObserverEntry[]): void {
    const event = eventHandler.createEvent('resize', entries)
    const preventDefault = !event.emit()
    if (preventDefault) return

    for (const entry of entries) {
      if (destroyed) return

      const isContainer = entry.target === container
      const slideIndex = slides.indexOf(<HTMLElement>entry.target)
      const lastSize = isContainer ? containerSize : slideSizes[slideIndex]

      const newSize = readSize(isContainer ? container : slides[slideIndex])
      const diffSize = mathAbs(newSize - lastSize)

      if (diffSize >= 0.5) {
        scheduleReInit(event.api)
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
