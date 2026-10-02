<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const p = ref(0)
const update = () => {
  const h = document.documentElement.scrollHeight - window.innerHeight
  p.value = h > 0 ? window.scrollY / h : 0
}
onMounted(() => window.addEventListener('scroll', update, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', update))
</script>

<template>
  <div class="bar" :style="{ transform: `scaleX(${p})` }" />
</template>

<style scoped>
.bar { position: fixed; inset: 0 0 auto 0; height: 3px; z-index: 100; background: var(--grad); transform-origin: left; pointer-events: none; }
</style>
