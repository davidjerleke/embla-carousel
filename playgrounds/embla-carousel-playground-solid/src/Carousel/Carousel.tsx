import { Component, For, Show, createEffect, createSignal } from 'solid-js'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-solid'
import { DotButton, NextButton, PrevButton } from './Buttons'
import Ssr from 'embla-carousel-ssr'

type PropType = {
  slides: number[]
  slideSize: number
  isSsr: boolean
  options?: EmblaOptionsType
}

export const EmblaCarousel: Component<PropType> = (props) => {
  const [refAttached, setRefAttached] = createSignal(false)
  const [emblaRef, emblaApi, emblaServerApi] = useEmblaCarousel(
    () => props.options,
    () => [Ssr({ slideSizes: props.slides.map(() => props.slideSize) })]
  )
  const [prevBtnDisabled, setPrevBtnDisabled] = createSignal(true)
  const [nextBtnDisabled, setNextBtnDisabled] = createSignal(true)
  const [selectedIndex, setSelectedIndex] = createSignal(0)
  const [scrollSnaps, setScrollSnaps] = createSignal<number[]>([])
  const [showSsr, setShowSsr] = createSignal(props.isSsr && !emblaApi())

  function scrollPrev(): void {
    emblaApi()?.goToPrev()
  }

  function scrollNext(): void {
    emblaApi()?.goToNext()
  }

  function scrollTo(index: number): void {
    emblaApi()?.goTo(index)
  }

  function onInit(emblaApi: EmblaCarouselType): void {
    setScrollSnaps(emblaApi.snapList())
  }

  function onSelect(emblaApi: EmblaCarouselType): void {
    setSelectedIndex(emblaApi.selectedSnap())
    setPrevBtnDisabled(!emblaApi.canGoToPrev())
    setNextBtnDisabled(!emblaApi.canGoToNext())
  }

  createEffect(() => {
    const api = emblaApi()
    if (!api) return

    onInit(api)
    onSelect(api)
    api.on('reinit', onInit).on('reinit', onSelect).on('select', onSelect)
  })

  setTimeout(
    () => {
      setRefAttached(true)
      setShowSsr(false)
    },
    props.isSsr ? 2000 : 0
  )

  return (
    <>
      {showSsr() && (
        <style id="embla-ssr-styles">
          {emblaServerApi
            .plugins()
            .ssr?.getStyles('.embla__container', '.embla__slide')}
        </style>
      )}

      <div class="playground__ssr-text">
        <strong>SSR:</strong> <span>{showSsr().toString()}</span>
      </div>

      <div class="embla">
        <Show when={!refAttached()}>
          <div class="embla__viewport">
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
        </Show>

        <Show when={refAttached()}>
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
        </Show>

        <div class="embla__controls">
          <div class="embla__buttons">
            <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled()} />
            <NextButton onClick={scrollNext} disabled={nextBtnDisabled()} />
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
