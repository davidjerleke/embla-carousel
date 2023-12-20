import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EngineType } from 'embla-carousel/components/Engine'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import imageByIndex from '../imageByIndex'

const mockApiCall = (
  minWait: number,
  maxWait: number,
  callback: () => void
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
  const scrollListenerRef = useRef<() => void>(() => undefined)
  const listenForScrollRef = useRef(true)
  const hasMoreToLoadRef = useRef(true)
  const [slides, setSlides] = useState(propSlides)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    watchSlides: (emblaApi) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaApi.internalEngine()

        emblaApi.reInit()
        const newEngine = emblaApi.internalEngine()
        const copyEngineModules: (keyof EngineType)[] = [
          'location',
          'target',
          'scrollBody'
        ]
        copyEngineModules.forEach((engineModule) => {
          Object.assign(newEngine[engineModule], oldEngine[engineModule])
        })

        newEngine.translate.to(oldEngine.location.get())
        const { index } = newEngine.scrollTarget.byDistance(0, false)
        newEngine.index.set(index)
        newEngine.animation.start()

        setLoadingMore(false)
        listenForScrollRef.current = true
      }

      const reloadAfterPointerUp = (): void => {
        emblaApi.off('pointerUp', reloadAfterPointerUp)
        reloadEmbla()
      }

      const engine = emblaApi.internalEngine()

      if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get())
        engine.scrollBounds.toggleActive(boundsActive)
        emblaApi.on('pointerUp', reloadAfterPointerUp)
      } else {
        reloadEmbla()
      }
    }
  })

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    if (!listenForScrollRef.current) return

    setLoadingMore((loadingMore) => {
      const lastSlide = emblaApi.slideNodes().length - 1
      const lastSlideInView = emblaApi.slidesInView().includes(lastSlide)
      const loadMore = !loadingMore && lastSlideInView

      if (loadMore) {
        listenForScrollRef.current = false

        mockApiCall(1000, 2000, () => {
          setSlides((currentSlides) => {
            if (currentSlides.length === 20) {
              setHasMoreToLoad(false)
              emblaApi.off('scroll', scrollListenerRef.current)
              return currentSlides
            }
            const newSlideCount = currentSlides.length + 5
            return Array.from(Array(newSlideCount).keys())
          })
        })
      }

      return loadingMore || lastSlideInView
    })
  }, [])

  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => onScroll(emblaApi)
      emblaApi.on('scroll', scrollListenerRef.current)
    },
    [onScroll]
  )

  useEffect(() => {
    if (!emblaApi) return
    addScrollListener(emblaApi)

    const onResize = () => emblaApi.reInit()
    window.addEventListener('resize', onResize)
    emblaApi.on('destroy', () => window.removeEventListener('resize', onResize))
  }, [emblaApi, addScrollListener])

  useEffect(() => {
    hasMoreToLoadRef.current = hasMoreToLoad
  }, [hasMoreToLoad])

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
            <div
              className={'embla-infinite-scroll'.concat(
                loadingMore ? ' embla-infinite-scroll--loading-more' : ''
              )}
            >
              <span className="embla-infinite-scroll__spinner" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
