import React, { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import imageByIndex from './imageByIndex'

const mockApiCall = (
  minWait: number,
  maxWait: number,
  callback: () => void,
): void => {
  const min = Math.ceil(minWait)
  const max = Math.floor(maxWait)
  const wait = Math.floor(Math.random() * (max - min + 1)) + min
  setTimeout(callback, wait)
}

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, slides: propSlides } = props
  const scrollListener = useRef<() => void>(() => undefined)
  const [slides, setSlides] = useState(propSlides)
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [pointerIsDown, setPointerIsDown] = useState(false)

  const setPointerDown = useCallback(() => setPointerIsDown(true), [])
  const setPointerNotDown = useCallback(() => setPointerIsDown(false), [])

  const lastSlideIsInView = useCallback(() => {
    if (!emblaApi) return false
    const lastSlide = emblaApi.slideNodes().length - 1
    return emblaApi.slidesInView().indexOf(lastSlide) !== -1
  }, [emblaApi])

  const onScroll = useCallback(() => {
    if (!emblaApi) return
    setLoadingMore((isLoadingMore) => {
      if (isLoadingMore) return true
      const shouldLoadMore = lastSlideIsInView()
      if (shouldLoadMore) emblaApi.off('scroll', scrollListener.current)
      return shouldLoadMore
    })
  }, [emblaApi, setLoadingMore, lastSlideIsInView])

  const addScrollListener = useCallback(() => {
    if (!emblaApi || !hasMoreToLoad) return
    scrollListener.current = () => onScroll()
    emblaApi.on('scroll', scrollListener.current)
  }, [emblaApi, hasMoreToLoad, onScroll])

  const reloadEmbla = useCallback(() => {
    if (!emblaApi) return
    const oldEngine = emblaApi.internalEngine()
    emblaApi.reInit()
    const newEngine = emblaApi.internalEngine()
    Object.assign(newEngine.scrollBody, oldEngine.scrollBody)
    Object.assign(newEngine.location, oldEngine.location)
    Object.assign(newEngine.target, oldEngine.target)
    const { index } = newEngine.scrollTarget.byDistance(0, false)
    newEngine.index.set(index)
    newEngine.animation.start()
    setLoadingMore(false)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || slides.length === emblaApi.slideNodes().length - 1) return
    const engine = emblaApi.internalEngine()
    const boundsActive = engine.limit.reachedMax(engine.target.get())
    engine.scrollBounds.toggleActive(boundsActive)
  }, [emblaApi, slides])

  useEffect(() => {
    if (!emblaApi || !hasMoreToLoad || pointerIsDown) return
    if (slides.length === emblaApi.slideNodes().length - 1) return
    reloadEmbla()
    addScrollListener()
  }, [
    emblaApi,
    slides,
    pointerIsDown,
    hasMoreToLoad,
    reloadEmbla,
    addScrollListener,
  ])

  useEffect(() => {
    if (!emblaApi || hasMoreToLoad) return
    if (slides.length === emblaApi.slideNodes().length) return
    if (pointerIsDown && !lastSlideIsInView()) return
    reloadEmbla()
    emblaApi.off('pointerDown', setPointerDown)
    emblaApi.off('pointerUp', setPointerNotDown)
  }, [
    emblaApi,
    slides,
    hasMoreToLoad,
    pointerIsDown,
    setPointerDown,
    setPointerNotDown,
    reloadEmbla,
    lastSlideIsInView,
  ])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('pointerDown', setPointerDown)
    emblaApi.on('pointerUp', setPointerNotDown)
    addScrollListener()
  }, [emblaApi, setPointerDown, setPointerNotDown, addScrollListener])

  useEffect(() => {
    if (!loadingMore) return
    mockApiCall(1000, 2000, () => {
      setSlides((currentSlides) => {
        if (currentSlides.length === 20) {
          setHasMoreToLoad(false)
          return currentSlides
        }
        const newSlideCount = currentSlides.length + 5
        return Array.from(Array(newSlideCount).keys())
      })
    })
  }, [setSlides, loadingMore])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <img
                className="embla__slide__img"
                src={imageByIndex(index)}
                alt="Your alt text"
              />
            </div>
          ))}
          {hasMoreToLoad && (
            <div className="embla__slide embla__slide__loading">
              {loadingMore && (
                <span className="embla__slide__loading__spinner" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
