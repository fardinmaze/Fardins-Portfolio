<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const dot = ref(null)
const ring = ref(null)
let off = []

onMounted(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return
  const dx = gsap.quickTo(dot.value, 'x', { duration: 0.1 })
  const dy = gsap.quickTo(dot.value, 'y', { duration: 0.1 })
  const rx = gsap.quickTo(ring.value, 'x', { duration: 0.45, ease: 'power3' })
  const ry = gsap.quickTo(ring.value, 'y', { duration: 0.45, ease: 'power3' })
  const move = (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY) }
  const over = (e) => {
    const hit = e.target.closest('a, button, [data-cursor]')
    gsap.to(ring.value, { scale: hit ? 1.9 : 1, opacity: hit ? 0.9 : 0.5, duration: 0.3 })
    gsap.to(dot.value, { scale: hit ? 0 : 1, duration: 0.2 })
  }
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseover', over)
  off = [() => window.removeEventListener('mousemove', move), () => window.removeEventListener('mouseover', over)]
})
onBeforeUnmount(() => off.forEach((f) => f()))
</script>

<template>
  <div class="cursor">
    <div ref="ring" class="ring" />
    <div ref="dot" class="dot" />
  </div>
</template>

<style scoped>
.cursor { position: fixed; inset: 0; pointer-events: none; z-index: 200; }
.dot, .ring { position: absolute; top: 0; left: 0; border-radius: 50%; translate: -50% -50%; }
.dot { width: 8px; height: 8px; background: var(--pink); }
.ring { width: 34px; height: 34px; border: 1.5px solid var(--purple); opacity: 0.5; }
</style>
