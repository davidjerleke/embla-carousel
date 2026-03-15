<script setup>
import { computed } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'

const props = defineProps({
  carouselId: String,
  slides: {
    type: Array,
    required: true
  }
})

const [emblaRef, emblaApi, emblaServerApi] = useEmblaCarousel({
  ssr: props.slides.map(() => 50) // Each slide is 50% of the viewport width
})
const renderSsrStyles = computed(() => !emblaApi.value)

const ssrStyles = `
  <style>
    ${emblaServerApi.ssrStyles(`#${props.carouselId}`, '.embla__slide')}
  </style>
`
</script>

<template>
  <div v-if="renderSsrStyles" v-html="ssrStyles"></div>

  <div class="embla">
    <div class="embla__viewport" ref="emblaRef">
      <div class="embla__container" :id="props.carouselId">
        <div
          class="embla__slide"
          v-for="(slide, index) in props.slides"
          :key="index"
        >
          {{ slide }}
        </div>
      </div>
    </div>
  </div>
</template>
