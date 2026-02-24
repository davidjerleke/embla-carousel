<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi
  let options = { inViewMargin: '0px -20px 0px 0px' }

  const logSlidesInView = (emblaApi, event) => {
    console.log('Slides entered view: ' + event.detail.slidesEnterView)
  }

  const onInit = (event) => {
    emblaApi = event.detail
    emblaApi.on('slidesinview', logSlidesInView)
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
