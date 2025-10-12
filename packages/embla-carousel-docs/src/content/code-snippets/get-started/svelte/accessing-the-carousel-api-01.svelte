<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi
  let options = { loop: false }

  const scrollToPrev = () => emblaApi?.scrollToPrev()
  const scrollToNext = () => emblaApi?.scrollToNext()

  function onInit(event) {
    emblaApi = event.detail
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

  <button class="embla__prev" on:click={scrollToPrev}>Scroll to prev</button>
  <button class="embla__next" on:click={scrollToNext}>Scroll to next</button>
</div>
