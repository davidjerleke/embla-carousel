<script lang="ts">
  import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
  import useEmblaCarousel from 'embla-carousel-svelte'
  import DotButton from './DotButton.svelte'
  import PrevButton from './PrevButton.svelte'
  import NextButton from './NextButton.svelte'
  import Ssr from 'embla-carousel-ssr'

  const { options, slides, slideSize, isSsr } = $props<{
    options?: EmblaOptionsType
    slides: number[]
    slideSize: number
    isSsr: boolean
  }>()

  const emblaServerApi = useEmblaCarousel({
    options,
    plugins: [Ssr({ slideSizes: slides.map(() => slideSize) })]
  })
  let emblaApi: EmblaCarouselType | null = $state(null)

  let actionAttached = $state(false)
  let prevBtnDisabled = $state(true)
  let nextBtnDisabled = $state(true)
  let scrollSnaps = $state<number[]>([])
  let selectedIndex = $state(0)
  let showSsr = $derived(isSsr && !emblaApi)

  const ssrStyles = `<style>${emblaServerApi
    .plugins()
    .ssr?.getStyles('.embla__container', '.embla__slide')}</style>`

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
    prevBtnDisabled = !emblaApi.canGoToPrev()
    nextBtnDisabled = !emblaApi.canGoToNext()
    selectedIndex = emblaApi.selectedSnap()
  }

  function scrollPrev(): void {
    emblaApi?.goToPrev()
  }

  function scrollNext(): void {
    emblaApi?.goToNext()
  }

  function scrollTo(index: number): void {
    emblaApi?.goTo(index)
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
      <PrevButton disabled={prevBtnDisabled} onClick={scrollPrev} />
      <NextButton disabled={nextBtnDisabled} onClick={scrollNext} />
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
