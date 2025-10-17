<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi
  let options = { loop: false }
  let scrollSnaps = []

  const scrollToSnap = (index) => emblaApi?.scrollToSnap(index)
  const setupSnaps = (emblaApi) => (scrollSnaps = emblaApi.snapList())

  function onInit(event) {
    emblaApi = event.detail

    setupSnaps(emblaApi)
    emblaApi.on('reinit', setupSnaps)
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

  <div class="embla__dots">
    {#each scrollSnaps as _, index}
      <button class="embla__dot" on:click={() => scrollToSnap(index)}>
        <!-- Button content -->
      </button>
    {/each}
  </div>
</div>
