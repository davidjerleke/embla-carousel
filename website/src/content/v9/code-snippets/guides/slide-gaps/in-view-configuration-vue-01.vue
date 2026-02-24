<script setup>
import { watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({
  inViewMargin: '0px -20px 0px 0px'
})

const logSlidesInView = (emblaApi, event) => {
  console.log('Slides entered view: ' + event.detail.slidesEnterView)
}

watch(
  emblaApi,
  (api) => {
    if (!api) return
    api.on('slidesinview', logSlidesInView)
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
