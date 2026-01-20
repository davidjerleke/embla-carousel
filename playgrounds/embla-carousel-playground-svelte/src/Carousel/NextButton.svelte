<script lang="ts">
  const { enabled, onClick } = $props<{
    enabled: boolean
    onClick: () => void
  }>()
</script>

<button
  class="embla__button embla__button--next"
  type="button"
  onclick={onClick}
  disabled={!enabled}
  aria-label="Go to slide"
>
  <svg
    class="embla__button__svg"
    viewBox="0 0 238.003 238.003"
    fill="currentColor"
  >
    <path
      d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z"
    />
  </svg>
</button>
