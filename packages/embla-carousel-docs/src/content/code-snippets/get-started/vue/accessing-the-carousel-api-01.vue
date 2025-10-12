<script setup>
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

const scrollToPrev = () => emblaApi.value?.scrollToPrev()
const scrollToNext = () => emblaApi.value?.scrollToNext()
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

    <button class="embla__prev" @click="scrollToPrev">Scroll to prev</button>
    <button class="embla__next" @click="scrollToNext">Scroll to next</button>
  </div>
</template>
