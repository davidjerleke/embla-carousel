<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi
  let options = { loop: false }
  let scrollSnaps = []
  let selectedSnap = 0

  const goTo = (index) => emblaApi?.goTo(index)
  const setupSnaps = (emblaApi) => (scrollSnaps = emblaApi.snapList())
  const setActiveSnap = (emblaApi) => (selectedSnap = emblaApi.selectedSnap())

  const onInit = (event) => {
    emblaApi = event.detail

    setupSnaps(emblaApi)
    setActiveSnap(emblaApi)

    emblaApi.on('reinit', setupSnaps)
    emblaApi.on('reinit', setActiveSnap)
    emblaApi.on('select', setActiveSnap)
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
      <button
        class="embla__dot"
        class:embla__dot--selected={index === selectedSnap}
        on:click={() => goTo(index)}
      >
        <!-- Button content -->
      </button>
    {/each}
  </div>
</div>
