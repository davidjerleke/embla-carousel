<script setup>
import { ref } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'

const options = ref({ loop: true })
const [emblaRef] = useEmblaCarousel(options)

const toggleLoop = () => {
  options.value = {
    ...options.value,
    loop: !options.value.loop
  }
}
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
