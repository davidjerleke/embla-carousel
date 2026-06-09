// @ts-nocheck
/** @jsxImportSource solid-js */
import { createEffect, on } from 'solid-js'
import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(() => ({ loop: true }))

  const logEmblaEvent = (
    emblaApi: EmblaCarouselType,
    eventName: EmblaEventType
  ): void => {
    console.log(`Embla just triggered ${eventName}!`)
  }

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return
      api.on('select', logEmblaEvent)
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
