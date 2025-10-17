<script setup>
import { ref, watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
const scrollSnaps = ref([])

const scrollToSnap = (index) => emblaApi.value?.scrollToSnap(index)
const setupSnaps = (emblaApi) => (scrollSnaps.value = emblaApi.snapList())

watch(
  () => emblaApi.value,
  (api) => {
    if (!api) return

    setupSnaps(api)
    api.on('reinit', setupSnaps)
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

    <div class="embla__dots">
      <button
        class="embla__dot"
        :key="index"
        v-for="(_, index) in scrollSnaps"
        @click="scrollToSnap(index)"
      >
        <!-- Button content -->
      </button>
    </div>
  </div>
</template>
