<script>
  import useEmblaCarousel from 'embla-carousel-svelte'
  let api
  function onInit(event) { api = event.detail }
  export function getApi() { return api }
</script>

<div on:emblainit={onInit} use:useEmblaCarousel>
  <div><div>Slide 1</div><div>Slide 2</div></div>
</div>
