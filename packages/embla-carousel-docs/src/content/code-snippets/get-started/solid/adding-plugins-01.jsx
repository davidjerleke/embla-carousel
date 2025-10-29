import { createEffect, on } from 'solid-js'
import createEmblaCarousel from 'embla-carousel-solid'
import Autoplay from 'embla-carousel-autoplay'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = createEmblaCarousel(
    () => ({ loop: true }),
    () => [Autoplay()]
  )

  const scrollToPrev = () => emblaApi()?.scrollToPrev()
  const scrollToNext = () => emblaApi()?.scrollToNext()

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return
      api.plugins().autoplay?.play()
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

      <button class="embla__prev" onClick={scrollToPrev}>
        Scroll to prev
      </button>
      <button class="embla__next" onClick={scrollToNext}>
        Scroll to next
      </button>
    </div>
  )
}
