<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi
  let prevButtonDisabled = true
  let nextButtonDisabled = true
  let options = { loop: false }

  const goToPrev = () => emblaApi?.goToPrev()
  const goToNext = () => emblaApi?.goToNext()

  const toggleButtonsDisabled = (emblaApi) => {
    prevButtonDisabled = !emblaApi.canGoToPrev()
    nextButtonDisabled = !emblaApi.canGoToNext()
  }

  const onInit = (event) => {
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

  <button class="embla__prev" on:click={goToPrev} disabled={prevButtonDisabled}>
    Scroll to prev
  </button>
  <button class="embla__next" on:click={goToNext} disabled={nextButtonDisabled}>
    Scroll to next
  </button>
</div>
