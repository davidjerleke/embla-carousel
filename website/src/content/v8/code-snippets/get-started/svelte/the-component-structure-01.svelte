<script>
  import useEmblaCarousel from 'embla-carousel-svelte'
</script>

<div class="embla">
  <div class="embla__viewport" use:useEmblaCarousel>
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>

  <button class="embla__prev">Scroll to prev</button>
  <button class="embla__next">Scroll to next</button>
</div>
