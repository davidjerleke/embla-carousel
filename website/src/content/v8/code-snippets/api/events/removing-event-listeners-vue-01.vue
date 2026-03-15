<script setup>
import { watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

const logSlidesInViewOnce = (emblaApi) => {
  console.log(emblaApi.slidesInView())
  emblaApi.off('slidesInView', logSlidesInViewOnce)
}

watch(
  emblaApi,
  (api) => {
    if (!api) return
    api.on('slidesInView', logSlidesInViewOnce)
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
