import { createEffect, on } from 'solid-js'
import useEmblaCarousel from 'embla-carousel-solid'
import Autoplay from 'embla-carousel-autoplay'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    () => ({ loop: true }),
    () => [Autoplay()]
  )

  const logAutoplayStart = (emblaApi, event) => {
    console.log(`${event.type} fired`)
  }

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return

      api.on('autoplay:play', logAutoplayStart)
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
    </div>
  )
}
