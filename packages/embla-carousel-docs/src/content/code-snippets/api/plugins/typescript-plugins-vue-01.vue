<script setup lang="ts">
import { watch, ref } from 'vue'
import { EmblaPluginType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const plugins = ref<EmblaPluginType[]>([Autoplay()])
const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins)

watch(
  emblaApi,
  (api) => {
    if (!api) return
    api.plugins().autoplay?.play()
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
