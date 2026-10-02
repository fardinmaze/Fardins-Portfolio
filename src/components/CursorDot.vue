<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const el = ref(null)
const label = ref('')
const state = ref('idle') // idle | link | label
const enabled = ref(false)
let x = 0, y = 0, cx = 0, cy = 0, raf, off

function frame() {
  cx += (x - cx) * 0.22
  cy += (y - cy) * 0.22
  if (el.value) el.value.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`
  raf = requestAnimationFrame(frame)
}

onMounted(() => {
  // desktop with a real pointer only, and never with reduced motion
  const ok = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!ok) return
  enabled.value = true
  const move = (e) => { x = e.clientX; y = e.clientY }
  const over = (e) => {
    const t = e.target.closest?.('[data-cursor], a, button')
    if (!t) { state.value = 'idle'; label.value = ''; return }
    label.value = t.dataset.cursor || ''
    state.value = label.value ? 'label' : 'link'
  }
  window.addEventListener('mousemove', move, { passive: true })
  window.addEventListener('mouseover', over, { passive: true })
  raf = requestAnimationFrame(frame)
  off = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
})
onBeforeUnmount(() => { off?.(); cancelAnimationFrame(raf) })
</script>

<template>
  <div v-if="enabled" ref="el" class="dot" :data-state="state" aria-hidden="true">
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.dot {
  position: fixed; top: 0; left: 0; z-index: 150; pointer-events: none;
  width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
  display: grid; place-items: center; will-change: transform;
  transition: width 0.25s var(--ease), height 0.25s var(--ease);
}
.dot[data-state='link'] { width: 22px; height: 22px; background: transparent; border: 1.5px solid var(--accent); }
.dot[data-state='label'] { width: 60px; height: 60px; }
span { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: var(--bg); opacity: 0; transition: opacity 0.2s; }
.dot[data-state='label'] span { opacity: 1; }
</style>
