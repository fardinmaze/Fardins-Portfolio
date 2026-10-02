<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { experience } from '../data/content'

const root = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    // Timeline spine draws itself with scroll.
    gsap.fromTo('.spine-fill', { scaleY: 0 }, {
      scaleY: 1, ease: 'none', transformOrigin: 'top',
      scrollTrigger: { trigger: '.list', start: 'top 70%', end: 'bottom 60%', scrub: true },
    })
    // Rows slide in from alternating sides; dot lights up on arrival.
    gsap.utils.toArray('.row').forEach((row, i) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none reverse' } })
      tl.from(row.querySelector('.card'), { x: i % 2 ? 90 : -90, opacity: 0, duration: 0.9, ease: 'power3.out' })
        .to(row.querySelector('.dot'), { scale: 1, backgroundColor: '#ff3d9a', duration: 0.4, ease: 'back.out(3)' }, 0.1)
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="experience" ref="root" class="exp">
    <div class="container">
      <span class="eyebrow">Experience</span>
      <h2>Where I've <span class="grad-text">worked</span></h2>
      <div class="list">
        <div class="spine"><div class="spine-fill" /></div>
        <div v-for="(e, i) in experience" :key="e.company + e.role" class="row" :class="{ right: i % 2 }">
          <span class="dot" />
          <div class="card" data-cursor>
            <span class="period">{{ e.period }}</span>
            <h3>{{ e.role }}</h3>
            <p>{{ e.company }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.exp { padding: clamp(40px, 6vw, 80px) 0 clamp(120px, 14vw, 220px); }
h2 { font-size: clamp(36px, 6vw, 92px); margin: 28px 0 clamp(50px, 6vw, 90px); }
.list { position: relative; display: flex; flex-direction: column; gap: 28px; }
.spine { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: var(--line); translate: -50% 0; }
.spine-fill { width: 100%; height: 100%; background: var(--grad); }
.row { position: relative; display: flex; justify-content: flex-start; }
.row.right { justify-content: flex-end; }
.dot { position: absolute; left: 50%; top: 34px; width: 16px; height: 16px; translate: -50% 0; border-radius: 50%; background: var(--paper); box-shadow: 0 0 0 2px var(--ink); transform: scale(.7); z-index: 1; }
.card { width: calc(50% - 48px); padding: 26px 28px; border-radius: 20px; background: var(--paper-2); transition: transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s; }
.card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -20px rgba(139, 61, 255, .45); }
.period { font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--purple); font-weight: 500; }
h3 { font-size: clamp(24px, 2.6vw, 36px); margin: 10px 0 6px; }
p { color: var(--muted); }
@media (max-width: 720px) {
  .spine { left: 8px; } .dot { left: 8px; }
  .card { width: calc(100% - 36px); margin-left: 36px; }
  .row, .row.right { justify-content: flex-start; }
}
</style>
