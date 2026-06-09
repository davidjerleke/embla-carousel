<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let options = { slidesToScroll: 2 }
</script>

<div class="embla">
  <div class="embla__viewport" use:useEmblaCarousel={{ options }}>
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>
</div>
