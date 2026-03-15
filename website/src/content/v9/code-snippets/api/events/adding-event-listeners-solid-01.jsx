import { createEffect, on } from 'solid-js'
import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(() => ({ loop: true }))

  const logSlidesInView = (emblaApi, event) => {
    console.log(`${event.type}: ${event.detail.slidesInView}`)
  }

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return
      api.on('slidesinview', logSlidesInView)
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
