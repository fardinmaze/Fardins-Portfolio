<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Looping, muted hero video.
// - starts when it is mostly on screen and pauses when it leaves (saves CPU and battery)
// - does not autoplay for visitors who prefer reduced motion
// - has a real play/pause button, because auto-playing motion needs one
const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  w: { type: Number, default: 1920 },
  h: { type: Number, default: 1080 },
  label: { type: String, default: 'Looping hero video' },
})

const video = ref(null)
const playing = ref(false)
let io
let userPaused = false
const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

async function play() {
  try { await video.value.play(); playing.value = true } catch { playing.value = false } // autoplay can be blocked
}
function pause() { video.value.pause(); playing.value = false }
function toggle() {
  if (playing.value) { userPaused = true; pause() } else { userPaused = false; play() }
}

onMounted(() => {
  if (!video.value) return
  if (reduce) { userPaused = true; return } // stay on the poster until asked
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !userPaused) play()
    else if (!e.isIntersecting) pause()
  }, { threshold: 0.4 })
  io.observe(video.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <figure class="vh">
    <video
      ref="video" :src="src" :poster="poster || undefined" :width="w" :height="h"
      muted loop playsinline preload="metadata" disablepictureinpicture :aria-label="label"
    />
    <button class="ctl label" type="button" :aria-pressed="playing" :aria-label="playing ? 'Pause video' : 'Play video'" @click="toggle">
      <span class="ico" aria-hidden="true">{{ playing ? '❚❚' : '▶' }}</span>
      {{ playing ? 'Pause' : 'Play' }}
    </button>
  </figure>
</template>

<style scoped>
.vh { position: relative; margin: 0; border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; background: var(--surface); }
video { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; }
.ctl {
  position: absolute; right: 14px; bottom: 14px; display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 12px; border-radius: 4px; background: rgba(10, 10, 10, 0.72); color: var(--text);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); transition: background-color 0.2s, color 0.2s;
}
.ctl:hover { background: var(--accent); color: var(--bg); }
.ico { font-size: 10px; letter-spacing: 0; }
</style>
