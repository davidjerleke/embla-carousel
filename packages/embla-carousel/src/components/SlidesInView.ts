import { EventHandlerType } from './EventHandler'

type IntersectionEntryMapType = {
  [key: number]: IntersectionObserverEntry
}

export type SlidesInViewType = {
  init: () => void
  destroy: () => void
  get: (threshold: number, inView?: boolean) => number[]
}

export function SlidesInView(
  slides: HTMLElement[],
  eventHandler: EventHandlerType
): SlidesInViewType {
  const intersectionEntryMap: IntersectionEntryMapType = {}
  let intersectionObserver: IntersectionObserver
  let destroyed = false

  function init(): void {
    intersectionObserver = new IntersectionObserver((entries) => {
      if (destroyed) return

      entries.forEach((entry) => {
        const index = slides.indexOf(<HTMLElement>entry.target)
        intersectionEntryMap[index] = entry
      })
      eventHandler.emit('slidesInView')
    })

    slides.forEach((slide) => intersectionObserver.observe(slide))
  }

  function destroy(): void {
    if (intersectionObserver) intersectionObserver.disconnect()
    destroyed = true
  }

  function get(threshold: number, inView: boolean = true): number[] {
    const thresholdLimited = threshold || 0.001

    return Object.keys(intersectionEntryMap).reduce((list, slideIndex) => {
      const index = parseInt(slideIndex)
      const { intersectionRatio } = intersectionEntryMap[index]
      const inViewMatch = inView && intersectionRatio >= thresholdLimited
      const notInViewMatch = !inView && intersectionRatio < thresholdLimited

      if (inViewMatch || notInViewMatch) return [...list, index]
      return list
    }, <number[]>[])
  }

  const self: SlidesInViewType = {
    init,
    destroy,
    get
  }

  return self
}
