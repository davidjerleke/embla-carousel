import { useState, useEffect, useCallback } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, PrevButton, NextButton } from './Buttons'

type PropType = {
  slides: number[]
  isSsr: boolean
  options?: EmblaOptionsType
}

export const EmblaCarousel = (props: PropType) => {
  const { slides, options, isSsr } = props
  const [refAttached, setRefAttached] = useState(false)
  const [emblaRef, emblaApi, emblaServerApi] = useEmblaCarousel(options)
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(
    emblaServerApi.canScrollToPrev()
  )
  const [nextBtnEnabled, setNextBtnEnabled] = useState(
    emblaServerApi.canScrollToNext()
  )
  const [selectedIndex, setSelectedIndex] = useState(
    emblaServerApi.selectedSnap()
  )
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const showSsr = isSsr && !emblaApi

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollToPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollToNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollToSnap(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.snapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedSnap())
    setPrevBtnEnabled(emblaApi.canScrollToPrev())
    setNextBtnEnabled(emblaApi.canScrollToNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)

    emblaApi.on('reinit', onInit).on('reinit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  useEffect(() => {
    setTimeout(
      () => {
        setRefAttached(true)
      },
      isSsr ? 2000 : 0
    )
  }, [isSsr])

  return (
    <>
      {showSsr && (
        <style id="embla-ssr-styles">
          {emblaServerApi.ssrStyles('.embla__container', '.embla__slide')}
        </style>
      )}

      <div className="playground__ssr-text">
        <strong>SSR:</strong> <span>{showSsr.toString()}</span>
      </div>

      <div className="embla">
        <div
          className="embla__viewport"
          ref={refAttached ? emblaRef : undefined}
        >
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
          </div>

          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                selected={index === selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
