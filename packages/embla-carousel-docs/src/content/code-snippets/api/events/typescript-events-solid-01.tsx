/** @jsxImportSource solid-js */
import { createEffect, on } from 'solid-js'
import { EmblaCarouselType, EmblaEventModelType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(() => ({ loop: true }))

  const logSelectEvent = (
    emblaApi: EmblaCarouselType,
    event: EmblaEventModelType<'select'>
  ): void => {
    const { sourceSnap, targetSnap } = event.detail

    console.log('Previous snap index: ', sourceSnap)
    console.log('Current snap index: ', targetSnap)
  }

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return
      api.on('select', logSelectEvent)
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
