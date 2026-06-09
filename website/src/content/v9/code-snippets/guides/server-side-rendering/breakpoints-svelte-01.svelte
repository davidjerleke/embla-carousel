<script>
  import useEmblaCarousel from 'embla-carousel-svelte'
  import Ssr from 'embla-carousel-ssr'

  export let slides
  export let carouselId

  const options = { loop: true }
  const plugins = [
    Ssr({
      slideSizes: slides.map(() => 50), // Each slide is 50% of the viewport width
      breakpoints: {
        '(min-width: 768px)': {
          slideSizes: slides.map(() => 70) // Each slide is 70% of the viewport width
        }
      }
    })
  ]

  let emblaApi
  const emblaServerApi = useEmblaCarousel({ options, plugins })

  $: renderSsrStyles = !emblaApi
  const ssrStyles = `
    <style>
      ${emblaServerApi.plugins().ssr?.getStyles(`#${carouselId}`, '.embla__slide')}
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
    use:useEmblaCarousel={{ options, plugins }}
    on:emblainit={onInit}
  >
    <div class="embla__container" id={carouselId}>
      {#each slides as slide}
        <div class="embla__slide">{slide}</div>
      {/each}
    </div>
  </div>
</div>
