<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  to: { type: Number, required: true },
  decimals: { type: Number, default: 0 },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  duration: { type: Number, default: 1300 },
})

const fmt = (v) => `${props.prefix}${v.toFixed(props.decimals)}${props.suffix}`
const final = fmt(props.to)
const shown = ref(final)
const root = ref(null)
let io
let raf

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window)) return
  shown.value = fmt(0)
  io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    io.disconnect()
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / props.duration)
      const eased = 1 - Math.pow(1 - p, 3)
      shown.value = fmt(props.to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  }, { threshold: 0.6 })
  io.observe(root.value)
})
onBeforeUnmount(() => { io?.disconnect(); cancelAnimationFrame(raf) })
</script>

<template>
  <!-- the invisible copy reserves the final width so nothing shifts while counting -->
  <span ref="root" class="cu num" :aria-label="final">
    <span class="ghost" aria-hidden="true">{{ final }}</span>
    <span class="live" aria-hidden="true">{{ shown }}</span>
  </span>
</template>

<style scoped>
.cu { display: inline-grid; }
.cu > * { grid-area: 1 / 1; }
.ghost { visibility: hidden; }
</style>
