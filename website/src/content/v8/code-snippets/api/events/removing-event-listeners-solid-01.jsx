import { createEffect, on } from 'solid-js'
import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(() => ({ loop: true }))

  const logSlidesInViewOnce = (emblaApi) => {
    console.log(emblaApi.slidesInView())
    emblaApi.off('slidesInView', logSlidesInViewOnce)
  }

  createEffect(
    on(emblaApi, (api) => {
      if (!api) return
      api.on('slidesInView', logSlidesInViewOnce)
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
