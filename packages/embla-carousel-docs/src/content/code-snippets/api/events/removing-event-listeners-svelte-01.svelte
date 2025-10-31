<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi
  let options = { loop: true }

  const logSlidesInViewOnce = (emblaApi, event) => {
    console.log(`${event.type}: ${emblaApi.slidesInView()}`)
    emblaApi.off('slidesinview', logSlidesInViewOnce)
  }

  const onInit = (event) => {
    emblaApi = event.detail
    emblaApi.on('slidesinview', logSlidesInViewOnce)
  }
</script>

<div class="embla">
  <div
    class="embla__viewport"
    on:emblainit={onInit}
    use:useEmblaCarousel={{ options }}
  >
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>
</div>
