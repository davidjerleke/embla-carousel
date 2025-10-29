import { createSignal, createEffect, on } from 'solid-js'
import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(() => ({ loop: false }))
  const [prevButtonDisabled, setPrevButtonDisabled] = createSignal(true)
  const [nextButtonDisabled, setNextButtonDisabled] = createSignal(true)

  const scrollToPrev = () => emblaApi()?.scrollToPrev()
  const scrollToNext = () => emblaApi()?.scrollToNext()

  const toggleButtonsDisabled = (emblaApi) => {
    setPrevButtonDisabled(!emblaApi.canScrollToPrev())
    setNextButtonDisabled(!emblaApi.canScrollToNext())
  }

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return

      toggleButtonsDisabled(api)
      api.on('reinit', toggleButtonsDisabled)
      api.on('select', toggleButtonsDisabled)
    })
  )

  return (
    <div class="embla">
      <div class="embla__viewport" ref={emblaRef}>
        <div class="embla__container">
          <div class="embla__slide">Slide 1</div>
          <div class="embla__slide">Slide 2</div>
          <div class="embla__slide">Slide 3</div>
        </div>
      </div>

      <button
        class="embla__prev"
        onClick={scrollToPrev}
        disabled={prevButtonDisabled()}
      >
        Scroll to prev
      </button>
      <button
        class="embla__next"
        onClick={scrollToNext}
        disabled={nextButtonDisabled()}
      >
        Scroll to next
      </button>
    </div>
  )
}
