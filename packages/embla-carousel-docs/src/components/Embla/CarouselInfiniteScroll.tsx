import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useEmblaCarousel } from 'embla-carousel/react'
import { EmblaOptionsType } from 'embla-carousel'
import { useInView } from 'react-intersection-observer'
import { imageByIndex } from './images'
import {
  Wrapper,
  Container,
  Viewport,
  Slide,
  SlideInner,
  SlideImg,
  SlideNumber,
} from './carouselBasicStyles'
import {
  SlideLoading,
  SlideLoadingSpinner,
} from './carouselInfiniteScrollStyles'

type PropType = {
  id: string
  options?: EmblaOptionsType
}

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

const Carousel = (props: PropType) => {
  const { id, options } = props
  const carouselId = `${id}-carousel-items`
  const scrollListener = useRef<() => void>(() => undefined)
  const [slides, setSlides] = useState([0, 1, 2, 3, 4])
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [pointerIsDown, setPointerIsDown] = useState(false)
  const loadingRole = loadingMore ? 'alert' : undefined
  const loadingAriaBusy = loadingMore ? 'true' : undefined
  const loadingAriaLabel = loadingMore ? 'Loading more slides' : undefined

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
    const oldEngine = emblaApi.dangerouslyGetEngine()
    emblaApi.reInit()
    const newEngine = emblaApi.dangerouslyGetEngine()
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
    const engine = emblaApi.dangerouslyGetEngine()
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
    <Viewport ref={emblaRef}>
      <Container id={carouselId} aria-live="polite">
        {slides.map((index) => {
          const { src, alt } = imageByIndex(index)
          return (
            <Slide
              key={`${src}-${index}`}
              $size={100}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              role="group"
            >
              <SlideNumber>
                <span>{index + 1}</span>
              </SlideNumber>
              <SlideInner>
                <SlideImg src={src} alt={alt} />
              </SlideInner>
            </Slide>
          )
        })}
        {hasMoreToLoad && (
          <SlideLoading
            $size={0}
            role={loadingRole}
            aria-busy={loadingAriaBusy}
            aria-label={loadingAriaLabel}
          >
            {loadingMore && <SlideLoadingSpinner />}
          </SlideLoading>
        )}
      </Container>
    </Viewport>
  )
}

export const CarouselInfiniteScroll = (props: PropType) => {
  const [inViewRef, inView] = useInView({ triggerOnce: true })

  return (
    <Wrapper ref={inViewRef}>
      {inView ? <Carousel aria-roledescription="carousel" {...props} /> : null}
    </Wrapper>
  )
}
