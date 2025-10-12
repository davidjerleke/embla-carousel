<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi
  let prevButtonDisabled = true
  let nextButtonDisabled = true
  let options = { loop: false }

  const scrollToPrev = () => emblaApi?.scrollToPrev()
  const scrollToNext = () => emblaApi?.scrollToNext()

  function toggleButtonsDisabled(emblaApi) {
    prevButtonDisabled = !emblaApi.canScrollToPrev()
    nextButtonDisabled = !emblaApi.canScrollToNext()
  }

  function onInit(event) {
    emblaApi = event.detail

    toggleButtonsDisabled(emblaApi)
    emblaApi.on('reinit', toggleButtonsDisabled)
    emblaApi.on('select', toggleButtonsDisabled)
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

  <button
    class="embla__prev"
    on:click={scrollToPrev}
    disabled={prevButtonDisabled}
  >
    Scroll to prev
  </button>
  <button
    class="embla__next"
    on:click={scrollToNext}
    disabled={nextButtonDisabled}
  >
    Scroll to next
  </button>
</div>
