// SERVER
import EmblaCarousel from 'embla-carousel'
import Ssr from 'embla-carousel-ssr'

export function getEmblaCarouselSsr(slides, carouselId) {
  const emblaServerApi = EmblaCarousel(
    null,
    { loop: true },
    [Ssr({ slideSizes: slides.map(() => 50) })] // Each slide is 50% of the viewport width
  )

  return `
    <style>
      ${emblaServerApi
        .plugins()
        .ssr?.getStyles(`#${carouselId}`, '.embla__slide')}
    </style>

    <div class="embla">
      <div class="embla__viewport">
        <div class="embla__container" id="${carouselId}">
          ${slides
            .map((slide) => `<div class="embla__slide">${slide}</div>`)
            .join('')}
        </div>
      </div>
    </div>
  `
}
