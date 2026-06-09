<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi
  let prevButtonDisabled = true
  let nextButtonDisabled = true
  let options = { loop: false }

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const toggleButtonsDisabled = (emblaApi) => {
    prevButtonDisabled = !emblaApi.canScrollPrev()
    nextButtonDisabled = !emblaApi.canScrollNext()
  }

  const onInit = (event) => {
    emblaApi = event.detail

    toggleButtonsDisabled(emblaApi)
    emblaApi.on('reInit', toggleButtonsDisabled)
    emblaApi.on('select', toggleButtonsDisabled)
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

  <button
    class="embla__prev"
    on:click={scrollPrev}
    disabled={prevButtonDisabled}
  >
    Scroll to prev
  </button>
  <button
    class="embla__next"
    on:click={scrollNext}
    disabled={nextButtonDisabled}
  >
    Scroll to next
  </button>
</div>
