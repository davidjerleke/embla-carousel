<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-vue'
import PrevButton from './PrevButton.vue'
import NextButton from './NextButton.vue'
import DotButton from './DotButton.vue'

const props = defineProps<{
  options: EmblaOptionsType
  slides: number[]
  isSsr: boolean
}>()

const [emblaRef, emblaApi, emblaServerApi] = useEmblaCarousel(props.options)
const refAttached = ref(false)
const prevBtnEnabled = ref(emblaServerApi.canScrollToPrev())
const nextBtnEnabled = ref(emblaServerApi.canScrollToNext())
const selectedIndex = ref(emblaServerApi.selectedSnap())
const scrollSnaps = ref<number[]>([])
const showSsr = computed(() => props.isSsr && !emblaApi.value)
const ssrStyles = `<style>${emblaServerApi.ssrStyles(
  '.embla__container',
  '.embla__slide'
)}</style>`

function scrollPrev(): void {
  return emblaApi.value?.scrollToPrev()
}

function scrollNext(): void {
  return emblaApi.value?.scrollToNext()
}
function scrollTo(index: number): void {
  return emblaApi.value?.scrollToSnap(index)
}

function onInit(emblaApi: EmblaCarouselType): void {
  scrollSnaps.value = emblaApi.snapList()
}

function onSelect(emblaApi: EmblaCarouselType): void {
  selectedIndex.value = emblaApi.selectedSnap()
  prevBtnEnabled.value = emblaApi.canScrollToPrev()
  nextBtnEnabled.value = emblaApi.canScrollToNext()
}

watch(
  () => emblaApi.value,
  () => {
    if (!emblaApi.value) return

    onInit(emblaApi.value)
    onSelect(emblaApi.value)

    emblaApi.value
      .on('reinit', (event) => onInit(event.api))
      .on('reinit', (event) => onSelect(event.api))
      .on('select', (event) => onSelect(event.api))
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
        <PrevButton @click="scrollPrev" :enabled="prevBtnEnabled" />
        <NextButton @click="scrollNext" :enabled="nextBtnEnabled" />
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
