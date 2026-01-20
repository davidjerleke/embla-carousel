import { createSignal, createEffect, on, For } from 'solid-js'
import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(() => ({
    loop: false
  }))
  const [scrollSnaps, setScrollSnaps] = createSignal([])

  const goTo = (index) => emblaApi()?.goTo(index)
  const setupSnaps = (emblaApi) => setScrollSnaps(emblaApi.snapList())

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return

      setupSnaps(api)
      api.on('reinit', setupSnaps)
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

      <div class="embla__dots">
        <For each={scrollSnaps()}>
          {(_, index) => (
            <button class="embla__dot" onClick={() => goTo(index())}>
              {/* Button content */}
            </button>
          )}
        </For>
      </div>
    </div>
  )
}
