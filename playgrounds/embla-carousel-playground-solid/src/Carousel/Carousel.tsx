import { Component, For, Show, createEffect, createSignal } from 'solid-js'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-solid'
import { DotButton, NextButton, PrevButton } from './Buttons'

type PropType = {
  slides: number[]
  isSsr: boolean
  options?: EmblaOptionsType
}

export const EmblaCarousel: Component<PropType> = (props) => {
  const [refAttached, setRefAttached] = createSignal(false)
  const [emblaRef, emblaApi, emblaServerApi] = useEmblaCarousel(
    () => props.options
  )
  const [prevBtnEnabled, setPrevBtnEnabled] = createSignal(
    emblaServerApi.canGoToPrev()
  )
  const [nextBtnEnabled, setNextBtnEnabled] = createSignal(
    emblaServerApi.canGoToNext()
  )
  const [selectedIndex, setSelectedIndex] = createSignal(
    emblaServerApi.selectedSnap()
  )
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
    setPrevBtnEnabled(emblaApi.canGoToPrev())
    setNextBtnEnabled(emblaApi.canGoToNext())
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
          {emblaServerApi.ssrStyles('.embla__container', '.embla__slide')}
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
