import { AxisType } from './Axis'
import { EventHandlerType } from './EventHandler'

export type ResizeHandlerType = {
  init: <CallbackType extends Function>(cb: CallbackType) => void
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

  function readSize(node: Element | HTMLElement): number {
    return axis.measureSize(node.getBoundingClientRect())
  }

  function init<CallbackType extends Function>(cb: CallbackType): void {
    containerSize = readSize(container)
    slideSizes = slides.map(readSize)

    resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const slideSize = slideSizes[slides.indexOf(<HTMLElement>entry.target)]
        const lastSize = entry.target === container ? containerSize : slideSize

        if (lastSize !== readSize(entry.target)) cb()
        eventHandler.emit('resize')
      })
    })

    const observeNodes = [container].concat(slides)
    observeNodes.forEach((node) => resizeObserver.observe(node))
  }

  function destroy(): void {
    resizeObserver.disconnect()
  }

  const self: ResizeHandlerType = {
    init,
    destroy,
  }
  return self
}
