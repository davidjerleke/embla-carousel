<script setup lang="ts">
// @ts-nocheck
import { watch } from 'vue'
import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

const logEmblaEvent = (
  emblaApi: EmblaCarouselType,
  eventName: EmblaEventType
): void => {
  console.log(`Embla just triggered ${eventName}!`)
}

watch(
  emblaApi,
  (api) => {
    if (!api) return
    api.on('select', logEmblaEvent)
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
