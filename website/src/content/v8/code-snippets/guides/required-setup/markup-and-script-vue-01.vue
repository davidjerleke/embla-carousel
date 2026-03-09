<script setup>
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef] = useEmblaCarousel()
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

    <!-- Optional: Add navigation controls here -->
  </div>
</template>
