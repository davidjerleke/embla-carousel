<script setup>
import { watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])

const goToPrev = () => emblaApi.value?.goToPrev()
const goToNext = () => emblaApi.value?.goToNext()

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

    <button class="embla__prev" @click="goToPrev">Scroll to prev</button>
    <button class="embla__next" @click="goToNext">Scroll to next</button>
  </div>
</template>
