<script setup lang="ts">
defineProps<{
  selected: boolean
  onClick: () => void
}>()
</script>

<template>
  <button
    :class="['embla__dot', { 'embla__dot--selected': selected }]"
    type="button"
    @click="onClick"
  />
</template>
