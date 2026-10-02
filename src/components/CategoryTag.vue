<script setup>
import { CATEGORIES } from '../data/projects'
defineProps({ cat: { type: String, required: true } })
</script>

<template>
  <span class="ctag label" :class="`c-${cat}`">
    <i v-if="cat !== 'build'" class="d-design" aria-hidden="true" />
    <i v-if="cat !== 'design'" class="d-build" aria-hidden="true" />
    {{ CATEGORIES[cat].label }}
  </span>
</template>
