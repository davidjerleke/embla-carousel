<script lang="ts">
  import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi: EmblaCarouselType
  let options: EmblaOptionsType = { loop: true }

  const logSelectedSnap = (emblaApi: EmblaCarouselType): void => {
    console.log(emblaApi.selectedSnap())
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>): void => {
    emblaApi = event.detail
    emblaApi.on('select', logSelectedSnap)
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
</div>
