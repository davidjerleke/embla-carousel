<script setup lang="ts">
import { watch } from 'vue'
import { EmblaCarouselType, EmblaEventModelType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

const logSelectEvent = (
  emblaApi: EmblaCarouselType,
  event: EmblaEventModelType<'select'>
): void => {
  const { sourceSnap, targetSnap } = event.detail

  console.log('Previous snap index: ', sourceSnap)
  console.log('Current snap index: ', targetSnap)
}

watch(
  emblaApi,
  (api) => {
    if (!api) return
    api.on('select', logSelectEvent)
  },
  { immediate: true }
)
</script>

<template>
  <div class="embla">
    <div class="embla__viewport" ref="emblaRef">
      <div class="embla__container">
        <div class="embla__slide">Slide 1</div>
        <div class="embla__slide">Slide 2</div>
        <div class="embla__slide">Slide 3</div>
      </div>
    </div>
  </div>
</template>
