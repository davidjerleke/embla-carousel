<script lang="ts">
  import createEmblaCarousel from 'embla-carousel-svelte/attachment'
  import type { EmblaCarouselType } from 'embla-carousel'

  let emblaApi = $state.raw<EmblaCarouselType>()
  let options = $state({ loop: false })
  const onApiChange = (api: EmblaCarouselType | undefined) => {
    emblaApi = api
  }
  const attachment = createEmblaCarousel(() => ({ options, onApiChange }))
</script>

<div class="embla">
  <div class="embla__viewport" {@attach attachment}>
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>
  <button onclick={() => emblaApi?.goToPrev()}>Previous</button>
  <button onclick={() => emblaApi?.goToNext()}>Next</button>
  <button onclick={() => (options.loop = !options.loop)}>Toggle loop</button>
</div>
