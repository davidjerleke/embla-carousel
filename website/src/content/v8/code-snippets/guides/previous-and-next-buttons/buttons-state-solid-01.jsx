import { createSignal, createEffect, on } from 'solid-js'
import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(() => ({ loop: false }))
  const [prevButtonDisabled, setPrevButtonDisabled] = createSignal(true)
  const [nextButtonDisabled, setNextButtonDisabled] = createSignal(true)

  const scrollPrev = () => emblaApi()?.scrollPrev()
  const scrollNext = () => emblaApi()?.scrollNext()

  const toggleButtonsDisabled = (emblaApi) => {
    setPrevButtonDisabled(!emblaApi.canScrollPrev())
    setNextButtonDisabled(!emblaApi.canScrollNext())
  }

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return

      toggleButtonsDisabled(api)
      api.on('reInit', toggleButtonsDisabled)
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
        onClick={scrollPrev}
        disabled={prevButtonDisabled()}
      >
        Scroll to prev
      </button>
      <button
        class="embla__next"
        onClick={scrollNext}
        disabled={nextButtonDisabled()}
      >
        Scroll to next
      </button>
    </div>
  )
}
