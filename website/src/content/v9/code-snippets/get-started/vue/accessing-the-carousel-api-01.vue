<script setup>
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

const goToPrev = () => emblaApi.value?.goToPrev()
const goToNext = () => emblaApi.value?.goToNext()
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
