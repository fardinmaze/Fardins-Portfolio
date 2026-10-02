<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { projects } from '../data/content'

const root = ref(null)
let ctx

// 3D tilt on the project cover, following the pointer.
function tilt(e, el) {
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  gsap.to(el, { rotateY: x * 10, rotateX: -y * 10, duration: 0.5, ease: 'power2.out', transformPerspective: 900 })
}
const untilt = (el) => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.6)' })

onMounted(() => {
  ctx = gsap.context(() => {
    // Heading: clip-path wipe.
    gsap.from('.work-title', {
      clipPath: 'inset(0 0 100% 0)', yPercent: 40, duration: 1.1, ease: 'power4.out',
      scrollTrigger: { trigger: '.work-title', start: 'top 85%' },
    })

    // Stacking deck: as the next card slides up, the previous one recedes.
    const cards = gsap.utils.toArray('.card')
    cards.forEach((card, i) => {
      const next = cards[i + 1]
      if (!next) return
      gsap.to(card, {
        scale: 0.92, filter: 'brightness(0.55)', ease: 'none',
        scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 18%', scrub: true },
      })
    })
    // Cover shapes drift inside their cards as they scroll through.
    gsap.utils.toArray('.cover .shape').forEach((s, i) => {
      gsap.fromTo(s, { yPercent: -18, rotate: -8 }, {
        yPercent: 18, rotate: 12, ease: 'none',
        scrollTrigger: { trigger: s.closest('.card'), start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="work" ref="root" class="work">
    <div class="glow" aria-hidden="true" />
    <div class="container">
      <span class="eyebrow light">Selected work</span>
      <h2 class="work-title">Projects that<br /><span class="grad-text">moved the needle</span></h2>

      <div class="deck">
        <article v-for="(p, i) in projects" :key="p.title" class="card" :style="{ '--c1': p.colors[0], '--c2': p.colors[1], top: `${12 + i * 1.2}vh` }">
          <div class="info">
            <div class="idx">0{{ i + 1 }}</div>
            <div>
              <span class="kind">{{ p.kind }}</span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.text }}</p>
            </div>
            <div class="metrics">
              <div v-for="m in p.metrics" :key="m.l"><b>{{ m.v }}</b><span>{{ m.l }}</span></div>
            </div>
          </div>
          <div class="cover" data-cursor @mousemove="(e) => tilt(e, e.currentTarget)" @mouseleave="(e) => untilt(e.currentTarget)">
            <div class="shape" />
            <div class="ring" />
            <span class="tag">View case study ↗</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work { background: var(--ink); color: var(--paper); border-radius: 48px 48px 0 0; padding: clamp(90px, 12vw, 180px) 0 clamp(60px, 8vw, 120px); overflow: clip; }
.glow { position: absolute; top: -20%; right: -10%; width: 60vw; height: 60vw; background: radial-gradient(closest-side, rgba(139, 61, 255, .35), transparent); filter: blur(40px); animation: pulse 9s ease-in-out infinite alternate; pointer-events: none; }
@keyframes pulse { to { transform: translate(-8vw, 10vh) scale(1.2); opacity: .7; } }
.eyebrow.light { color: #9a99a0; }
.work-title { font-size: clamp(40px, 7vw, 112px); margin: 28px 0 clamp(50px, 7vw, 100px); }
.deck { display: flex; flex-direction: column; gap: 18vh; padding-bottom: 6vh; }
.card {
  position: sticky; display: grid; grid-template-columns: 1fr 1.15fr; gap: 24px;
  min-height: 62vh; padding: 20px; border-radius: 32px; background: var(--ink-2);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, .08), 0 40px 80px -30px #000;
  transform-origin: center top; will-change: transform, filter;
}
.info { display: flex; flex-direction: column; justify-content: space-between; gap: 28px; padding: clamp(14px, 2.4vw, 36px); }
.idx { font-family: var(--font-display); color: #55545b; font-size: 18px; }
.kind { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--pink); }
h3 { font-size: clamp(32px, 4.4vw, 64px); margin: 12px 0 16px; }
.info p { color: #a9a8ae; max-width: 420px; }
.metrics { display: flex; gap: 36px; flex-wrap: wrap; }
.metrics b { display: block; font-family: var(--font-display); font-size: clamp(28px, 3.4vw, 48px); letter-spacing: -.03em; font-weight: 600; }
.metrics span { color: #8d8c93; font-size: 13px; }
.cover { position: relative; border-radius: 22px; overflow: hidden; background: linear-gradient(135deg, var(--c1), var(--c2)); display: grid; place-items: center; min-height: 280px; transform-style: preserve-3d; }
.shape { position: absolute; width: 62%; aspect-ratio: 1; border-radius: 38% 62% 55% 45% / 45% 40% 60% 55%; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.55), rgba(255,255,255,0) 60%), rgba(17,17,17,.28); filter: blur(2px); animation: morph 10s ease-in-out infinite alternate; }
@keyframes morph { 50% { border-radius: 60% 40% 40% 60% / 60% 55% 45% 40%; } 100% { border-radius: 45% 55% 62% 38% / 38% 62% 38% 62%; } }
.ring { position: absolute; width: 88%; aspect-ratio: 1; border-radius: 50%; border: 1px solid rgba(255,255,255,.35); }
.tag { position: absolute; left: 20px; bottom: 20px; padding: 10px 16px; border-radius: 999px; background: rgba(17,17,17,.75); backdrop-filter: blur(8px); font-size: 13px; opacity: 0; transform: translateY(10px); transition: .4s cubic-bezier(.2,.8,.2,1); }
.cover:hover .tag { opacity: 1; transform: none; }
@media (max-width: 860px) { .card { grid-template-columns: 1fr; } .cover { min-height: 220px; order: -1; } .card { position: relative; top: auto !important; } .deck { gap: 28px; } }
</style>
