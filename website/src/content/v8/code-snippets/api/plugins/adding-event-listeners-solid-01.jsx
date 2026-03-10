import { createEffect, on } from 'solid-js'
import useEmblaCarousel from 'embla-carousel-solid'
import Autoplay from 'embla-carousel-autoplay'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    () => ({ loop: true }),
    () => [Autoplay()]
  )

  const logPluginEvent = (emblaApi, eventName) => {
    console.log(`Autoplay just triggered ${eventName}!`)
  }

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return

      api.on('autoplay:stop', logPluginEvent)
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
