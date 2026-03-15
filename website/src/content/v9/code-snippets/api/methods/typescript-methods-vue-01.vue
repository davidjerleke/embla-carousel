<script setup lang="ts">
import { watch } from 'vue'
import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

const logSelectedSnap = (emblaApi: EmblaCarouselType) => {
  console.log(emblaApi.selectedSnap())
}

watch(
  emblaApi,
  (api) => {
    if (!api) return
    api.on('select', logSelectedSnap)
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
