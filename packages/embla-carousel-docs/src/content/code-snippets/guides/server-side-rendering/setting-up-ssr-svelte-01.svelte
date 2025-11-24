<script>
  import useEmblaCarousel from 'embla-carousel-svelte'

  export let slides
  export let carouselId

  const options = {
    loop: true,
    ssr: slides.map(() => 50) // Each slide is 50% of the viewport width
  }

  let emblaApi
  const emblaServerApi = useEmblaCarousel({ options })

  $: renderSsrStyles = !emblaApi
  const ssrStyles = `
    <style>
      ${emblaServerApi.ssrStyles(`#${carouselId}`, '.embla__slide')}
    </style>
  `

  const onInit = (event) => {
    emblaApi = event.detail
  }
</script>

{#if renderSsrStyles}
  <div>
    {@html ssrStyles}
  </div>
{/if}

<div class="embla">
  <div
    class="embla__viewport"
    use:useEmblaCarousel={{ options }}
    on:emblainit={onInit}
  >
    <div class="embla__container" id={carouselId}>
      {#each slides as slide}
        <div class="embla__slide">{slide}</div>
      {/each}
    </div>
  </div>
</div>
