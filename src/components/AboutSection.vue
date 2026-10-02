<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { profile, stats } from '../data/content'

const root = ref(null)
const words = computed(() => profile.about.split(' '))
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // Scroll-scrubbed reading highlight: each word lights up as you read.
    gsap.fromTo('.w', { opacity: 0.14 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '.statement', start: 'top 78%', end: 'bottom 45%', scrub: true },
    })

    // Count-up numbers fire once when the row enters.
    gsap.utils.toArray('.num').forEach((el) => {
      const target = Number(el.dataset.value)
      const o = { v: 0 }
      gsap.to(o, {
        v: target, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => { el.textContent = Math.round(o.v) },
      })
    })
    gsap.from('.stat', {
      y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.stats', start: 'top 88%' },
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="about" ref="root" class="about">
    <div class="container">
      <span class="eyebrow">About</span>
      <p class="statement">
        <span v-for="(w, i) in words" :key="i" class="w">{{ w }}</span>
      </p>
      <div class="stats">
        <div v-for="s in stats" :key="s.label" class="stat">
          <div class="big"><span class="num" :data-value="s.value">0</span>{{ s.suffix }}</div>
          <div class="lbl">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about { padding: clamp(100px, 16vw, 220px) 0 clamp(80px, 10vw, 140px); }
.statement { margin: 32px 0 clamp(60px, 8vw, 110px); max-width: 1100px; font-family: var(--font-display); font-weight: 500; font-size: clamp(28px, 4.4vw, 64px); line-height: 1.12; letter-spacing: -0.03em; }
.w { display: inline-block; margin-right: 0.26em; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line); }
.stat { padding: 28px 24px 0 0; }
.stat + .stat { padding-left: 24px; border-left: 1px solid var(--line); }
.big { font-family: var(--font-display); font-size: clamp(40px, 6vw, 88px); font-weight: 600; letter-spacing: -0.04em; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1; }
.lbl { margin-top: 10px; color: var(--muted); font-size: 14px; }
@media (max-width: 720px) {
  .stats { grid-template-columns: 1fr 1fr; row-gap: 32px; }
  .stat:nth-child(3) { border-left: 0; padding-left: 0; }
}
</style>
