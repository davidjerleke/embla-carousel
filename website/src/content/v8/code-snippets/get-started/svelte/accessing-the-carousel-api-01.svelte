<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi
  let options = { loop: false }

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const onInit = (event) => {
    emblaApi = event.detail
  }
</script>

<div class="embla">
  <div
    class="embla__viewport"
    on:emblaInit={onInit}
    use:useEmblaCarousel={{ options }}
  >
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>

  <button class="embla__prev" on:click={scrollPrev}>Scroll to prev</button>
  <button class="embla__next" on:click={scrollNext}>Scroll to next</button>
</div>
