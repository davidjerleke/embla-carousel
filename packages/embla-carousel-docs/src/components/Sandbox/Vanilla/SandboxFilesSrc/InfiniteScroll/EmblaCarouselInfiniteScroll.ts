import { EmblaCarouselType } from 'embla-carousel'
import { EngineType } from 'embla-carousel/components/Engine'

export const mockApiCall = (
  minWait: number,
  maxWait: number,
  callback: () => void
): void => {
  const min = Math.ceil(minWait)
  const max = Math.floor(maxWait)
  const wait = Math.floor(Math.random() * (max - min + 1)) + min
  setTimeout(callback, wait)
}

export const createHTMLFromString = (htmlString: string): HTMLElement => {
  const div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  return <HTMLElement>div.firstChild
}

export type InfiniteScrollCallbackType = (
  loadMore: (newSlides?: HTMLElement[]) => void,
  endInfiniteScroll: () => void,
  slideCount: number
) => void

export const SLIDE_TEMPLATE = `
<div class="embla__slide">
  <div class="embla__slide__number">
    <span>__SLIDE_NUMBER__</span>
  </div>
</div>
`

export const setupInfiniteScroll = (
  emblaApi: EmblaCarouselType,
  loadMoreCallback: InfiniteScrollCallbackType
): (() => void) => {
  const loadingNode = <HTMLElement>(
    emblaApi.containerNode().querySelector('.embla-infinite-scroll')
  )
  let hasMoreToLoad = true
  let slideCount = 0

  const isLastSlideInView = () => {
    const lastSlide = emblaApi.slideNodes().length - 1
    return emblaApi.slidesInView().indexOf(lastSlide) !== -1
  }

  const deactivateBounds = () => {
    if (slideCount === emblaApi.slideNodes().length - 1) return
    const engine = emblaApi.internalEngine()
    const boundsActive = engine.limit.pastMaxBound(engine.target.get())
    engine.scrollBounds.toggleActive(boundsActive)
  }

  const reloadEngine = (): void => {
    const oldEngine = emblaApi.internalEngine()
    const pointerDown = oldEngine.dragHandler.pointerDown()
    if (hasMoreToLoad && pointerDown) return
    if (hasMoreToLoad && slideCount === emblaApi.slideNodes().length - 1) return
    if (!hasMoreToLoad && !isLastSlideInView() && pointerDown) return

    emblaApi.reInit()
    const newEngine = emblaApi.internalEngine()
    const copyEngineModules: (keyof EngineType)[] = [
      'scrollBody',
      'location',
      'offsetLocation',
      'previousLocation',
      'target'
    ]
    copyEngineModules.forEach((engineModule) =>
      Object.assign(newEngine[engineModule], oldEngine[engineModule])
    )

    newEngine.translate.to(oldEngine.location.get())
    const { index } = newEngine.scrollTarget.byDistance(0, false)
    newEngine.indexCurrent.set(index)
    newEngine.animation.start()

    if (!hasMoreToLoad) removeInfiniteScroll()
    else emblaApi.on('scroll', onScroll)
  }

  const removeLoadingSlide = (): void => {
    const container = emblaApi.containerNode()
    const lastSlide = container.querySelector('.embla-infinite-scroll')
    if (lastSlide) container.removeChild(lastSlide)
  }

  const addMoreSlides = (newSlides: HTMLElement[]): void => {
    const fragment = document.createDocumentFragment()
    newSlides.forEach((slide) => fragment.appendChild(slide))
    fragment.appendChild(loadingNode)
    slideCount += newSlides.length
    emblaApi.containerNode().appendChild(fragment)
    loadingNode.classList.remove('embla-infinite-scroll--loading-more')
    deactivateBounds()
  }

  const loadMore = (newSlides?: HTMLElement[]): void => {
    hasMoreToLoad = !!newSlides
    removeLoadingSlide()
    if (newSlides) addMoreSlides(newSlides)
    reloadEngine()
  }

  const onScroll = (): void => {
    if (!isLastSlideInView()) return
    emblaApi.off('scroll', onScroll)
    loadingNode.classList.add('embla-infinite-scroll--loading-more')
    loadMoreCallback(loadMore, () => loadMore(), slideCount)
  }

  const addInfiniteScroll = (): void => {
    emblaApi.on('pointerup', reloadEngine)
    emblaApi.on('scroll', onScroll)
    slideCount = emblaApi.slideNodes().length - 1
  }

  const removeInfiniteScroll = (): void => {
    emblaApi.off('pointerup', reloadEngine)
    emblaApi.off('scroll', onScroll)
  }

  return addInfiniteScroll
}
