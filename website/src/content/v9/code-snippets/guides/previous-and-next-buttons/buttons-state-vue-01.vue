<script setup>
import { ref, watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
const prevButtonDisabled = ref(true)
const nextButtonDisabled = ref(true)

const goToPrev = () => emblaApi.value?.goToPrev()
const goToNext = () => emblaApi.value?.goToNext()

const toggleButtonsDisabled = (emblaApi) => {
  prevButtonDisabled.value = !emblaApi.canGoToPrev()
  nextButtonDisabled.value = !emblaApi.canGoToNext()
}

watch(
  emblaApi,
  (api) => {
    if (!api) return

    toggleButtonsDisabled(api)
    api.on('reinit', toggleButtonsDisabled)
    api.on('select', toggleButtonsDisabled)
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

    <button
      class="embla__prev"
      @click="goToPrev"
      :disabled="prevButtonDisabled"
    >
      Scroll to prev
    </button>
    <button
      class="embla__next"
      @click="goToNext"
      :disabled="nextButtonDisabled"
    >
      Scroll to next
    </button>
  </div>
</template>
