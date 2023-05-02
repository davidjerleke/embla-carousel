export const mockApiCall = (minWait, maxWait, callback) => {
  const min = Math.ceil(minWait)
  const max = Math.floor(maxWait)
  const wait = Math.floor(Math.random() * (max - min + 1)) + min
  setTimeout(callback, wait)
}

export const createHTMLFromString = (htmlString) => {
  const div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  return div.firstChild
}

export const SLIDE_TEMPLATE = `
<div class="embla__slide">
  <div class="embla__slide__number">
    <span>__SLIDE_NUMBER__</span>
  </div>
  <img
    class="embla__slide__img"
    src="src/images/slide-__IMG_NUMBER__.jpg"
    alt="Your alt text"
  />
</div>
`

export const setupInfiniteScroll = (emblaApi, loadMoreCallback) => {
  const loadingNode = emblaApi
    .containerNode()
    .querySelector('.embla-infinite-scroll')
  let hasMoreToLoad = true
  let slideCount = 0

  const isLastSlideInView = () => {
    const lastSlide = emblaApi.slideNodes().length - 1
    return emblaApi.slidesInView().indexOf(lastSlide) !== -1
  }

  const deactivateBounds = () => {
    if (slideCount === emblaApi.slideNodes().length - 1) return
    const engine = emblaApi.internalEngine()
    const boundsActive = engine.limit.reachedMax(engine.target.value)
    engine.scrollBounds.toggleActive(boundsActive)
  }

  const reloadEngine = () => {
    const oldEngine = emblaApi.internalEngine()
    const pointerDown = oldEngine.dragHandler.pointerDown()
    if (hasMoreToLoad && pointerDown) return
    if (hasMoreToLoad && slideCount === emblaApi.slideNodes().length - 1) return
    if (!hasMoreToLoad && !isLastSlideInView() && pointerDown) return

    emblaApi.reInit()
    const newEngine = emblaApi.internalEngine()
    const copyEngineModules = ['scrollBody', 'location', 'target']
    copyEngineModules.forEach((engineModule) =>
      Object.assign(newEngine[engineModule], oldEngine[engineModule]),
    )

    newEngine.translate.to(oldEngine.location.value)
    const { index } = newEngine.scrollTarget.byDistance(0, false)
    newEngine.index.set(index)
    newEngine.animation.start()

    if (!hasMoreToLoad) removeInfiniteScroll()
    else emblaApi.on('scroll', onScroll)
  }

  const removeLoadingSlide = () => {
    const container = emblaApi.containerNode()
    const lastSlide = container.querySelector('.embla-infinite-scroll')
    if (lastSlide) container.removeChild(lastSlide)
  }

  const addMoreSlides = (newSlides) => {
    const fragment = document.createDocumentFragment()
    newSlides.forEach((slide) => fragment.appendChild(slide))
    fragment.appendChild(loadingNode)
    slideCount += newSlides.length
    emblaApi.containerNode().appendChild(fragment)
    loadingNode.classList.remove('embla-infinite-scroll--loading-more')
    deactivateBounds()
  }

  const loadMore = (newSlides) => {
    hasMoreToLoad = !!newSlides
    removeLoadingSlide()
    if (newSlides) addMoreSlides(newSlides)
    reloadEngine()
  }

  const onScroll = () => {
    if (!isLastSlideInView()) return
    emblaApi.off('scroll', onScroll)
    loadingNode.classList.add('embla-infinite-scroll--loading-more')
    loadMoreCallback(loadMore, () => loadMore(), slideCount)
  }

  const addInfiniteScroll = () => {
    emblaApi.on('pointerUp', reloadEngine)
    emblaApi.on('scroll', onScroll)
    slideCount = emblaApi.slideNodes().length - 1
  }

  const removeInfiniteScroll = () => {
    emblaApi.off('pointerUp', reloadEngine)
    emblaApi.off('scroll', onScroll)
  }

  return addInfiniteScroll
}
