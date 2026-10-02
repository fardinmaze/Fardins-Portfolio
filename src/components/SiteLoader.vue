<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, prefersReducedMotion } from '../composables/gsap'
import { releaseLoader } from '../composables/loader'

const word = 'FARDIN.'.split('')
const show = ref(typeof document !== 'undefined' && document.documentElement.hasAttribute('data-loading'))
const root = ref(null)
let tl, killTimer, fontsReady = false, waiting = false

function finish() {
  clearTimeout(killTimer)
  releaseLoader() // idempotent: removes the attribute and fires the event
  show.value = false
}

onMounted(() => {
  if (!show.value) return
  if (prefersReducedMotion()) return finish()

  window.scrollTo(0, 0)
  const q = (s) => root.value.querySelectorAll(s)
  const letters = q('[data-letter]')
  const [left, right] = q('[data-half]')
  const tag = root.value.querySelector('[data-tag]')

  tl = gsap.timeline({ paused: true, onComplete: finish })
  tl.fromTo(letters, { yPercent: 130, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'expo.out' }, 0.02)
    .fromTo(tag, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.4)
    .addLabel('curtain', '>+0.35')
    // hold here until fonts are ready so the page never opens on a font swap
    .call(() => { if (!fontsReady) { waiting = true; tl.pause() } }, null, 'curtain')
    .to(letters, { yPercent: -130, opacity: 0, duration: 0.45, stagger: 0.03, ease: 'power3.in' }, 'curtain')
    .to(tag, { opacity: 0, duration: 0.3 }, 'curtain')
    // two halves slide apart, one up and one down, like the page splitting open
    .to(left, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 'curtain+=0.25')
    .to(right, { yPercent: 100, duration: 0.9, ease: 'expo.inOut' }, 'curtain+=0.25')
    // hero starts animating while the curtain is still opening
    .call(releaseLoader, null, 'curtain+=0.7')

  const ready = () => { fontsReady = true; if (waiting) { waiting = false; tl.play() } }
  document.fonts?.ready ? document.fonts.ready.then(ready, ready) : ready()
  setTimeout(ready, 2500) // never wait on fonts forever
  killTimer = setTimeout(finish, 9000) // absolute safety net
  tl.play()
})
onBeforeUnmount(() => { tl?.kill(); clearTimeout(killTimer) })
</script>

<template>
  <div v-if="show" ref="root" class="loader" role="status" aria-label="Loading">
    <div class="half l" data-half />
    <div class="half r" data-half />
    <div class="mark" aria-hidden="true">
      <span class="word">
        <span v-for="(c, i) in word" :key="i" class="mask"><span data-letter :class="{ dot: c === '.' }">{{ c }}</span></span>
      </span>
      <span class="tag label" data-tag>Product Analyst &amp; Designer</span>
    </div>
  </div>
</template>

<style scoped>
.loader { position: fixed; inset: 0; z-index: 400; pointer-events: all; }
.half { position: absolute; top: 0; bottom: 0; width: 50%; background: #151515; will-change: transform; }
.half.l { left: 0; }
.half.r { right: 0; }
.mark { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 18px; }
.word { display: flex; font-size: clamp(3.4rem, 11vw, 9rem); font-weight: 800; letter-spacing: -0.05em; line-height: 1; color: var(--text); }
.mask { display: block; overflow: hidden; padding: 0.06em 0; }
.mask > span { display: block; will-change: transform; }
.dot { color: var(--accent); }
.tag { color: var(--muted); }
</style>
