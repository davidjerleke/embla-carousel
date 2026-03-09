<script lang="ts">
  import {
    EmblaCarouselType,
    EmblaEventModelType,
    EmblaOptionsType
  } from 'embla-carousel'
  import useEmblaCarousel from 'embla-carousel-svelte'

  let emblaApi: EmblaCarouselType
  let options: EmblaOptionsType = { loop: true }

  const logSelectEvent = (
    emblaApi: EmblaCarouselType,
    event: EmblaEventModelType<'select'>
  ): void => {
    const { sourceSnap, targetSnap } = event.detail

    console.log('Previous snap index: ', sourceSnap)
    console.log('Current snap index: ', targetSnap)
  }

  const onInit = (event: CustomEvent<EmblaCarouselType>): void => {
    emblaApi = event.detail
    emblaApi.on('select', logSelectEvent)
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
