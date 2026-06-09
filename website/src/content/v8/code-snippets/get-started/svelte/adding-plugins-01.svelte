<script>
  import useEmblaCarousel from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'

  let options = { loop: false }
  let plugins = [Autoplay()]

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const onInit = (event) => {
    emblaApi = event.detail
    emblaApi.plugins().autoplay?.play()
  }
</script>

<div class="embla">
  <div
    class="embla__viewport"
    on:emblaInit={onInit}
    use:useEmblaCarousel={{ options, plugins }}
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
