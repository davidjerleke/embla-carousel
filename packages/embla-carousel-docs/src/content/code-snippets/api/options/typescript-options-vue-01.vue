<script setup lang="ts">
import { ref } from 'vue'
import { EmblaOptionsType } from 'embla-carousel'
import emblaCarouselVue from 'embla-carousel-vue'

const options = ref<EmblaOptionsType>({ loop: true })
const [emblaRef] = emblaCarouselVue(options)
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
