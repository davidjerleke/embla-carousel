<script lang="ts">
  import {
    EmblaCarouselType,
    EmblaOptionsType,
    EmblaPluginType
  } from 'embla-carousel'
  import useEmblaCarousel from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'

  let emblaApi: EmblaCarouselType
  let options: EmblaOptionsType = { loop: true }
  let plugins: EmblaPluginType[] = [Autoplay()]

  const onInit = (event: CustomEvent<EmblaCarouselType>): void => {
    emblaApi = event.detail
    emblaApi.plugins().autoplay?.play()
  }
</script>

<div class="embla">
  <div
    class="embla__viewport"
    on:emblainit={onInit}
    use:useEmblaCarousel={{ options, plugins }}
  >
    <div class="embla__container">
      <div class="embla__slide">Slide 1</div>
      <div class="embla__slide">Slide 2</div>
      <div class="embla__slide">Slide 3</div>
    </div>
  </div>
</div>
