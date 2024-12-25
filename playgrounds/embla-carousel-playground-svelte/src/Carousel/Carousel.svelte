<script lang="ts">
  import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
  import useEmblaCarousel from 'embla-carousel-svelte'
  import DotButton from './DotButton.svelte'
  import PrevButton from './PrevButton.svelte'
  import NextButton from './NextButton.svelte'

  const { options, slides, isSsr } = $props<{
    options?: EmblaOptionsType
    slides: number[]
    isSsr: boolean
  }>()

  const emblaServerApi = useEmblaCarousel({ options })
  let emblaApi: EmblaCarouselType | null = $state(null)

  let actionAttached = $state(false)
  let prevBtnEnabled = $state(emblaServerApi.canScrollPrev())
  let nextBtnEnabled = $state(emblaServerApi.canScrollNext())
  let scrollSnaps = $state<number[]>([])
  let selectedIndex = $state(emblaServerApi.selectedSnap())
  let showSsr = $derived(isSsr && !emblaApi)

  const ssrStyles = `<style>${emblaServerApi.ssrStyles(
    '.embla__container',
    '.embla__slide'
  )}</style>`

  function onInit(emblaApi: EmblaCarouselType): void {
    scrollSnaps = emblaApi.snapList()
  }

  function onEmblaInit(event: CustomEvent<EmblaCarouselType>): void {
    emblaApi = event.detail

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reinit', onInit).on('reinit', onSelect).on('select', onSelect)
  }

  function onSelect(emblaApi: EmblaCarouselType): void {
    prevBtnEnabled = emblaApi.canScrollPrev()
    nextBtnEnabled = emblaApi.canScrollNext()
    selectedIndex = emblaApi.selectedSnap()
  }

  function scrollPrev(): void {
    emblaApi?.scrollPrev()
  }

  function scrollNext(): void {
    emblaApi?.scrollNext()
  }

  function scrollTo(index: number): void {
    emblaApi?.scrollToSnap(index)
  }

  setTimeout(
    () => {
      actionAttached = true
    },
    isSsr ? 2000 : 0
  )
</script>

{#if showSsr}
  <div id="embla-ssr-styles">
    {@html ssrStyles}
  </div>
{/if}

<div class="playground__ssr-text">
  <strong>SSR:</strong> <span>{showSsr.toString()}</span>
</div>

<div class="embla">
  {#if actionAttached}
    <div
      class="embla__viewport"
      use:useEmblaCarousel={{ options }}
      onemblainit={onEmblaInit}
    >
      <div class="embla__container">
        {#each slides as index}
          <div class="embla__slide">
            <div class="embla__slide__number">{index + 1}</div>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div class="embla__viewport">
      <div class="embla__container">
        {#each slides as index}
          <div class="embla__slide">
            <div class="embla__slide__number">{index + 1}</div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <div class="embla__controls">
    <div class="embla__buttons">
      <PrevButton enabled={prevBtnEnabled} onClick={scrollPrev} />
      <NextButton enabled={nextBtnEnabled} onClick={scrollNext} />
    </div>

    <div class="embla__dots">
      {#each scrollSnaps as _, index}
        <DotButton
          selected={index === selectedIndex}
          onClick={() => scrollTo(index)}
        />
      {/each}
    </div>
  </div>
</div>
