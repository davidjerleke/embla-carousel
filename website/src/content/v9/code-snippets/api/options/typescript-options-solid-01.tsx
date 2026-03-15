/** @jsxImportSource solid-js */
import { createSignal } from 'solid-js'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [options, setOptions] = createSignal<EmblaOptionsType>({ loop: true })
  const [emblaRef] = useEmblaCarousel(options)

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
