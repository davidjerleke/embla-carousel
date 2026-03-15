import { createSignal, createEffect, on, For } from 'solid-js'
import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(() => ({
    loop: false
  }))
  const [scrollSnaps, setScrollSnaps] = createSignal([])
  const [selectedSnap, setSelectedSnap] = createSignal(0)

  const scrollTo = (index) => emblaApi()?.scrollTo(index)
  const setupSnaps = (emblaApi) => setScrollSnaps(emblaApi.scrollSnapList())
  const setActiveSnap = (emblaApi) =>
    setSelectedSnap(emblaApi.selectedScrollSnap())

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return

      setupSnaps(api)
      setActiveSnap(api)

      api.on('reInit', setupSnaps)
      api.on('reInit', setActiveSnap)
      api.on('select', setActiveSnap)
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
            <button
              class={'embla__dot'.concat(
                index() === selectedSnap() ? ' embla__dot--selected' : ''
              )}
              onClick={() => scrollTo(index())}
            >
              {/* Button content */}
            </button>
          )}
        </For>
      </div>
    </div>
  )
}
