import { For } from 'solid-js'
import useEmblaCarousel from 'embla-carousel-solid'
import Ssr from 'embla-carousel-ssr'

export function EmblaCarousel(props) {
  const [emblaRef, emblaApi, emblaServerApi] = useEmblaCarousel(
    () => ({ loop: true }),
    () => [
      Ssr({
        slideSizes: props.slides.map(() => 50), // Each slide is 50% of the viewport width
        breakpoints: {
          '(min-width: 768px)': {
            slideSizes: props.slides.map(() => 70) // Each slide is 70% of the viewport width
          }
        }
      })
    ]
  )

  const renderSsrStyles = () => !emblaApi()

  return (
    <>
      {renderSsrStyles() && (
        <style>
          {emblaServerApi
            .plugins()
            .ssr?.getStyles(`#${props.carouselId}`, '.embla__slide')}
        </style>
      )}

      <div class="embla">
        <div class="embla__viewport" ref={emblaRef}>
          <div class="embla__container" id={props.carouselId}>
            <For each={props.slides}>
              {(slide) => <div class="embla__slide">{slide}</div>}
            </For>
          </div>
        </div>
      </div>
    </>
  )
}
