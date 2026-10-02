<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, prefersReducedMotion } from '../composables/gsap'
import { releaseLoader, introVariant } from '../composables/loader'

const word = 'FARDIN.'.split('')
const BARS = 5
const show = ref(typeof document !== 'undefined' && document.documentElement.hasAttribute('data-loading'))
const variant = show.value ? introVariant() : 'open' // decided once, before the first paint
const root = ref(null)
const count = ref(0)
let tl, killTimer, fontsReady = false, waiting = false

function finish() {
  clearTimeout(killTimer)
  releaseLoader() // idempotent: removes the attribute and fires the event
  show.value = false
}

// Hold the timeline at `label` until fonts are ready so the page never opens on a font swap.
function gate(label) {
  tl.call(() => { if (!fontsReady) { waiting = true; tl.pause() } }, null, label)
}

// FIRST VISIT: wordmark letters rise, then the screen splits into two halves (one up, one down).
function playOpen(q) {
  const letters = q('[data-letter]')
  const [left, right] = q('[data-half]')
  const tag = root.value.querySelector('[data-tag]')

  tl.fromTo(letters, { yPercent: 130, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'expo.out' }, 0.02)
    .fromTo(tag, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.4)
    .addLabel('curtain', '>+0.35')
  gate('curtain')
  tl.to(letters, { yPercent: -130, opacity: 0, duration: 0.45, stagger: 0.03, ease: 'power3.in' }, 'curtain')
    .to(tag, { opacity: 0, duration: 0.3 }, 'curtain')
    .to(left, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 'curtain+=0.25')
    .to(right, { yPercent: 100, duration: 0.9, ease: 'expo.inOut' }, 'curtain+=0.25')
    .call(releaseLoader, null, 'curtain+=0.7') // hero starts while the curtain is still opening
}

// REFRESH / REVISIT: a quick 0 to 100 counter with a progress line, then five blinds lift away from the centre.
function playRefresh(q) {
  const bars = q('[data-bar]')
  const num = root.value.querySelector('[data-counter]') // number + percent sign move and fade together
  const line = root.value.querySelector('[data-line]')
  const meta = q('[data-meta]')
  const counter = { v: 0 }

  tl.fromTo(meta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, 0)
    .fromTo(num, { yPercent: 20, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }, 0)
    .to(counter, { v: 100, duration: 0.85, ease: 'power2.inOut', onUpdate: () => { count.value = Math.round(counter.v) } }, 0.05)
    .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.85, ease: 'power2.inOut' }, 0.05)
    .addLabel('wipe', '>+0.1')
  gate('wipe')
  tl.to([num, ...meta, line], { opacity: 0, duration: 0.25, ease: 'power2.in' }, 'wipe')
    .to(bars, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', stagger: { each: 0.07, from: 'center' } }, 'wipe+=0.1')
    .call(releaseLoader, null, 'wipe+=0.45')
}

onMounted(() => {
  if (!show.value) return
  if (prefersReducedMotion()) return finish()

  window.scrollTo(0, 0)
  const q = (s) => [...root.value.querySelectorAll(s)]
  tl = gsap.timeline({ paused: true, onComplete: finish })
  variant === 'open' ? playOpen(q) : playRefresh(q)

  const ready = () => { fontsReady = true; if (waiting) { waiting = false; tl.play() } }
  document.fonts?.ready ? document.fonts.ready.then(ready, ready) : ready()
  setTimeout(ready, 2500) // never wait on fonts forever
  killTimer = setTimeout(finish, 9000) // absolute safety net
  tl.play()
})
onBeforeUnmount(() => { tl?.kill(); clearTimeout(killTimer) })
</script>

<template>
  <div v-if="show" ref="root" class="loader" :data-variant="variant" role="status" aria-label="Loading">
    <!-- first visit -->
    <template v-if="variant === 'open'">
      <div class="half l" data-half />
      <div class="half r" data-half />
      <div class="mark" aria-hidden="true">
        <span class="word">
          <span v-for="(c, i) in word" :key="i" class="mask"><span data-letter :class="{ dot: c === '.' }">{{ c }}</span></span>
        </span>
        <span class="tag label" data-tag>Product Analyst &amp; Designer</span>
      </div>
    </template>

    <!-- refresh / revisit -->
    <template v-else>
      <div v-for="i in BARS" :key="i" class="bar" data-bar :style="{ left: `${(i - 1) * (100 / BARS)}%`, width: `${100 / BARS + 0.2}%` }" />
      <div class="meta" aria-hidden="true">
        <span class="label" data-meta>FARDIN.</span>
        <span class="label muted" data-meta>Loading</span>
      </div>
      <div class="counter" data-counter aria-hidden="true">
        <span class="num">{{ String(count).padStart(3, '0') }}</span><span class="pct">%</span>
      </div>
      <div class="line" data-line aria-hidden="true" />
    </template>
  </div>
</template>

<style scoped>
.loader { position: fixed; inset: 0; z-index: 400; pointer-events: all; }

/* first visit */
.half { position: absolute; top: 0; bottom: 0; width: 50%; background: #151515; will-change: transform; }
.half.l { left: 0; }
.half.r { right: 0; }
.mark { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; gap: 18px; }
.word { display: flex; font-size: clamp(3.4rem, 11vw, 9rem); font-weight: 800; letter-spacing: -0.05em; line-height: 1; color: var(--text); }
.mask { display: block; overflow: hidden; padding: 0.06em 0; }
.mask > span { display: block; will-change: transform; }
.dot { color: var(--accent); }
.tag { color: var(--muted); }

/* refresh / revisit */
.bar { position: absolute; top: 0; bottom: 0; background: #151515; will-change: transform; }
.meta { position: absolute; top: clamp(20px, 3vw, 36px); left: var(--gutter); right: var(--gutter); display: flex; justify-content: space-between; color: var(--text); }
.counter { position: absolute; left: var(--gutter); bottom: clamp(36px, 6vw, 72px); display: flex; align-items: baseline; gap: 0.1em; font-weight: 800; letter-spacing: -0.06em; line-height: 0.8; font-size: clamp(5rem, 22vw, 17rem); color: var(--text); font-variant-numeric: tabular-nums; }
.pct { color: var(--accent); font-size: 0.4em; letter-spacing: 0; }
.line { position: absolute; left: var(--gutter); right: var(--gutter); bottom: clamp(20px, 3vw, 36px); height: 2px; background: var(--accent); transform-origin: left; }
</style>
