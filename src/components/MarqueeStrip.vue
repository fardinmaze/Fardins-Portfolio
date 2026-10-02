<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data/content'

const root = ref(null)
const track = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // Infinite loop that speeds up and reverses with scroll velocity.
    const loop = gsap.to(track.value, { xPercent: -50, repeat: -1, duration: 28, ease: 'none' })
    let dir = 1
    // ease back to a calm cruise once scrolling stops
    const settle = gsap.delayedCall(0.15, () => gsap.to(loop, { timeScale: dir, duration: 1.2, overwrite: true })).pause()
    ScrollTrigger.create({
      trigger: document.body, start: 0, end: 'max',
      onUpdate(self) {
        dir = self.direction
        const boost = 1 + Math.min(5, Math.abs(self.getVelocity()) / 400)
        gsap.to(loop, { timeScale: dir * boost, duration: 0.25, overwrite: true })
        settle.restart(true)
      },
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="strip" aria-hidden="true">
    <div ref="track" class="track">
      <template v-for="n in 2" :key="n">
        <span v-for="s in services" :key="s.title + n" class="item">{{ s.title }} <i /></span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.strip { background: var(--ink); color: var(--paper); padding: 22px 0; overflow: hidden; rotate: -1.2deg; margin: -20px -2vw 0; position: relative; z-index: 2; }
.track { display: flex; width: max-content; will-change: transform; }
.item { display: inline-flex; align-items: center; gap: 36px; padding-right: 36px; font-family: var(--font-display); font-size: clamp(22px, 3vw, 40px); font-weight: 600; letter-spacing: -0.02em; white-space: nowrap; }
.item i { width: 14px; height: 14px; border-radius: 50%; background: var(--grad); }
</style>
