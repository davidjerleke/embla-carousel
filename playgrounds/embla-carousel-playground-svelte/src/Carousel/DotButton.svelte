<script lang="ts">
  const { selected, onClick } = $props<{
    selected: boolean
    onClick: () => void
  }>()
</script>

<button
  class="embla__dot {selected ? 'embla__dot--selected' : ''}"
  type="button"
  onclick={onClick}
  aria-label="Go to slide"
>
</button>
