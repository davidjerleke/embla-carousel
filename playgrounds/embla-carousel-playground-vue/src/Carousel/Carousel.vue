<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-vue'
import PrevButton from './PrevButton.vue'
import NextButton from './NextButton.vue'
import DotButton from './DotButton.vue'
import Ssr from 'embla-carousel-ssr'

const props = defineProps<{
  options: EmblaOptionsType
  slides: number[]
  slideSize: number
  isSsr: boolean
}>()

const [emblaRef, emblaApi, emblaServerApi] = useEmblaCarousel(props.options, [
  Ssr({ slideSizes: props.slides.map(() => props.slideSize) })
])
const refAttached = ref(false)
const prevBtnDisabled = ref(true)
const nextBtnDisabled = ref(true)
const selectedIndex = ref(0)
const scrollSnaps = ref<number[]>([])
const showSsr = computed(() => props.isSsr && !emblaApi.value)
const ssrStyles = `<style>${emblaServerApi
  .plugins()
  .ssr?.getStyles('.embla__container', '.embla__slide')}</style>`

function scrollPrev(): void {
  return emblaApi.value?.goToPrev()
}

function scrollNext(): void {
  return emblaApi.value?.goToNext()
}

function scrollTo(index: number): void {
  return emblaApi.value?.goTo(index)
}

function onInit(emblaApi: EmblaCarouselType): void {
  scrollSnaps.value = emblaApi.snapList()
}

function onSelect(emblaApi: EmblaCarouselType): void {
  selectedIndex.value = emblaApi.selectedSnap()
  prevBtnDisabled.value = !emblaApi.canGoToPrev()
  nextBtnDisabled.value = !emblaApi.canGoToNext()
}

watch(
  () => emblaApi.value,
  () => {
    if (!emblaApi.value) return

    onInit(emblaApi.value)
    onSelect(emblaApi.value)

    emblaApi.value
      .on('reinit', onInit)
      .on('reinit', onSelect)
      .on('select', onSelect)
  },
  { immediate: true }
)

onMounted(() => {
  setTimeout(
    () => {
      refAttached.value = true
    },
    props.isSsr ? 2000 : 0
  )
})
</script>

<template>
  <div v-if="showSsr" v-html="ssrStyles" id="embla-ssr-styles"></div>

  <div class="playground__ssr-text">
    <strong>SSR: </strong>
    <span>{{ showSsr.toString() }}</span>
  </div>

  <div class="embla">
    <div v-if="refAttached" class="embla__viewport" ref="emblaRef">
      <div class="embla__container">
        <div v-for="(_, index) in slides" :key="index" class="embla__slide">
          <div class="embla__slide__number">{{ index + 1 }}</div>
        </div>
      </div>
    </div>

    <div v-else class="embla__viewport">
      <div class="embla__container">
        <div v-for="(_, index) in slides" :key="index" class="embla__slide">
          <div class="embla__slide__number">{{ index + 1 }}</div>
        </div>
      </div>
    </div>

    <div class="embla__controls">
      <div class="embla__buttons">
        <PrevButton @click="scrollPrev" :disabled="prevBtnDisabled" />
        <NextButton @click="scrollNext" :disabled="nextBtnDisabled" />
      </div>

      <div class="embla__dots">
        <DotButton
          v-for="(_, index) in scrollSnaps"
          :key="index"
          :selected="index === selectedIndex"
          @click="scrollTo(index)"
        />
      </div>
    </div>
  </div>
</template>
