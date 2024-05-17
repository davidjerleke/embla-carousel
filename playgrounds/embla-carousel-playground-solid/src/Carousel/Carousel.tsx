import { Component, For, createEffect, createSignal } from 'solid-js'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import createEmblaCarousel from 'embla-carousel-solid'
import { DotButton, NextButton, PrevButton } from './Buttons'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

export const EmblaCarousel: Component<PropType> = (props) => {
  const [emblaRef, emblaApi] = createEmblaCarousel(() => props.options)
  const [prevBtnEnabled, setPrevBtnEnabled] = createSignal(false)
  const [nextBtnEnabled, setNextBtnEnabled] = createSignal(false)
  const [selectedIndex, setSelectedIndex] = createSignal(0)
  const [scrollSnaps, setScrollSnaps] = createSignal<number[]>([])

  function scrollPrev(): void {
    emblaApi()?.scrollPrev()
  }

  function scrollNext(): void {
    emblaApi()?.scrollNext()
  }

  function scrollTo(index: number): void {
    emblaApi()?.scrollTo(index)
  }

  function onInit(emblaApi: EmblaCarouselType): void {
    setScrollSnaps(emblaApi.scrollSnapList())
  }

  function onSelect(emblaApi: EmblaCarouselType): void {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }

  createEffect(() => {
    const api = emblaApi()
    if (!api) return

    onInit(api)
    onSelect(api)
    api.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  })

  return (
    <>
      <div class="embla">
        <div class="embla__viewport" ref={emblaRef}>
          <div class="embla__container">
            <For each={props.slides}>
              {(slide) => (
                <div class="embla__slide">
                  <div class="embla__slide__number">{slide + 1}</div>
                </div>
              )}
            </For>
          </div>
        </div>

        <div class="embla__controls">
          <div class="embla__buttons">
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled()} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled()} />
          </div>

          <div class="embla__dots">
            <For each={scrollSnaps()}>
              {(_, index) => {
                return (
                  <DotButton
                    selected={index() === selectedIndex()}
                    onClick={() => scrollTo(index())}
                  />
                )
              }}
            </For>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
