// SERVER
import EmblaCarousel from 'embla-carousel'

export function getEmblaCarouselSsr(slides, carouselId) {
  const emblaServerApi = EmblaCarousel(null, {
    loop: true,
    ssr: slides.map(() => 50), // Each slide is 50% of the viewport width
    breakpoints: {
      '(min-width: 768px)': {
        ssr: slides.map(() => 70) // Each slide is 70% of the viewport width
      }
    }
  })

  return `
    <style>
      ${emblaServerApi.ssrStyles(`#${carouselId}`, '.embla__slide')}
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
