import { createEffect, on } from 'solid-js'
import useEmblaCarousel from 'embla-carousel-solid'
import Autoplay from 'embla-carousel-autoplay'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    () => ({ loop: false }),
    () => [Autoplay()]
  )

  const scrollPrev = () => emblaApi()?.scrollPrev()
  const scrollNext = () => emblaApi()?.scrollNext()

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

      <button class="embla__prev" onClick={scrollPrev}>
        Scroll to prev
      </button>
      <button class="embla__next" onClick={scrollNext}>
        Scroll to next
      </button>
    </div>
  )
}
