<script setup>
import { ref, watch } from 'vue'
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
const prevButtonDisabled = ref(true)
const nextButtonDisabled = ref(true)

const scrollToPrev = () => emblaApi.value?.scrollToPrev()
const scrollToNext = () => emblaApi.value?.scrollToNext()

function toggleButtonsDisabled(emblaApi) {
  prevButtonDisabled.value = !emblaApi.canScrollToPrev()
  nextButtonDisabled.value = !emblaApi.canScrollToNext()
}

watch(
  () => emblaApi.value,
  () => {
    if (!emblaApi.value) return

    toggleButtonsDisabled(emblaApi.value)
    emblaApi.value.on('reinit', toggleButtonsDisabled)
    emblaApi.value.on('select', toggleButtonsDisabled)
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
      @click="scrollToPrev"
      :disabled="prevButtonDisabled"
    >
      Scroll to prev
    </button>
    <button
      class="embla__next"
      @click="scrollToNext"
      :disabled="nextButtonDisabled"
    >
      Scroll to next
    </button>
  </div>
</template>
