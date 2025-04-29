import { EventHandlerType } from './EventHandler'
import { objectKeys, WindowType } from './utils'

type IntersectionEntryMapType = {
  [key: number]: IntersectionObserverEntry
}

export type SlidesInViewOptionsType = IntersectionObserverInit['threshold']

export type SlidesInViewType = {
  init: (ownerWindow: WindowType) => void
  destroy: () => void
  get: (inView?: boolean) => number[]
}

export function SlidesInView(
  container: HTMLElement,
  slides: HTMLElement[],
  eventHandler: EventHandlerType,
  threshold: SlidesInViewOptionsType
): SlidesInViewType {
  const intersectionEntryMap: IntersectionEntryMapType = {}
  let inViewCache: number[] | null = null
  let notInViewCache: number[] | null = null
  let intersectionObserver: IntersectionObserver
  let destroyed = false

  function init(ownerWindow: WindowType): void {
    intersectionObserver = new ownerWindow.IntersectionObserver(
      onIntersection,
      {
        root: container.parentElement,
        threshold
      }
    )

    slides.forEach((slide) => intersectionObserver.observe(slide))
  }

  function destroy(): void {
    if (intersectionObserver) intersectionObserver.disconnect()
    destroyed = true
  }

  function onIntersection(entries: IntersectionObserverEntry[]): void {
    const event = eventHandler.createEvent('slidesinview', entries)

    for (const entry of entries) {
      if (destroyed) return

      const index = slides.indexOf(<HTMLElement>entry.target)
      intersectionEntryMap[index] = entry
    }

    inViewCache = null
    notInViewCache = null
    event.emit()
  }

  function createInViewList(inView: boolean): number[] {
    return objectKeys(intersectionEntryMap).reduce(
      (list: number[], slideIndex) => {
        const index = parseInt(slideIndex)
        const { isIntersecting } = intersectionEntryMap[index]
        const inViewMatch = inView && isIntersecting
        const notInViewMatch = !inView && !isIntersecting

        if (inViewMatch || notInViewMatch) list.push(index)
        return list
      },
      []
    )
  }

  function get(inView: boolean = true): number[] {
    if (inView && inViewCache) return inViewCache
    if (!inView && notInViewCache) return notInViewCache

    const slideIndexes = createInViewList(inView)

    if (inView) inViewCache = slideIndexes
    if (!inView) notInViewCache = slideIndexes

    return slideIndexes
  }

  const self: SlidesInViewType = {
    init,
    destroy,
    get
  }

  return self
}
