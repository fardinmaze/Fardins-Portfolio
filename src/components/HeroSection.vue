<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { profile } from '../data/content'
import { scrollToTarget } from '../composables/useSmoothScroll'
import { vMagnetic } from '../composables/magnetic'

const root = ref(null)
const blobs = ref(null)
let ctx
let offMove

onMounted(() => {
  ctx = gsap.context(() => {
    // Intro: headline lines rise out of a mask, then supporting content fades in.
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from('.h-line > span', { yPercent: 115, rotate: 3, duration: 1.2, stagger: 0.12, delay: 0.2 })
      .from('.h-fade', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.7')
      .from('.orb', { scale: 0.6, opacity: 0, duration: 1.6, stagger: 0.15 }, 0)

    // Scroll: gradient field drifts slower than the page (parallax), headline fades/lifts.
    gsap.to(blobs.value, {
      yPercent: 25, scale: 1.15, ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to('.hero-inner', {
      yPercent: -14, opacity: 0.1, ease: 'none',
      scrollTrigger: { trigger: root.value, start: '30% top', end: 'bottom top', scrub: true },
    })

    // Pointer: orbs follow cursor at different depths.
    const movers = gsap.utils.toArray('.orb').map((el, i) => ({
      x: gsap.quickTo(el, 'x', { duration: 1.6, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 1.6, ease: 'power3' }),
      depth: (i + 1) * 28,
    }))
    const move = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      movers.forEach((m) => { m.x(nx * m.depth * 2); m.y(ny * m.depth * 2) })
    }
    window.addEventListener('mousemove', move)
    offMove = () => window.removeEventListener('mousemove', move)
  }, root.value)
})
onBeforeUnmount(() => { offMove?.(); ctx?.revert() })
</script>

<template>
  <section id="top" ref="root" class="hero">
    <div ref="blobs" class="field" aria-hidden="true">
      <div class="orb o1" /><div class="orb o2" /><div class="orb o3" /><div class="orb o4" />
      <div class="grain" />
    </div>

    <div class="container hero-inner">
      <p class="h-fade eyebrow">{{ profile.role }} · {{ profile.company }}</p>
      <h1>
        <span v-for="(l, i) in profile.headline" :key="i" class="line-mask h-line">
          <span :class="{ 'grad-text': i === 2 }">{{ l }}</span>
        </span>
      </h1>
      <div class="row">
        <p class="h-fade intro">{{ profile.intro }}</p>
        <div class="h-fade actions">
          <a v-magnetic="0.3" :href="profile.calendly" target="_blank" rel="noopener" class="btn">Talk with me <span class="arrow">→</span></a>
          <a v-magnetic="0.3" href="#work" class="btn ghost" @click.prevent="scrollToTarget('#work')">View work</a>
        </div>
      </div>
    </div>

    <div class="h-fade scroll-hint">Scroll <span /></div>
  </section>
</template>

<style scoped>
.hero { min-height: 100svh; display: flex; align-items: center; padding: 140px 0 100px; overflow: hidden; }
.field { position: absolute; inset: -10%; z-index: 0; filter: blur(70px) saturate(1.2); }
.orb { position: absolute; border-radius: 50%; will-change: transform; }
.o1 { width: 46vw; height: 46vw; left: 4%; top: 8%; background: var(--purple); opacity: .55; animation: float1 16s ease-in-out infinite alternate; }
.o2 { width: 38vw; height: 38vw; right: 2%; top: 16%; background: var(--pink); opacity: .5; animation: float2 19s ease-in-out infinite alternate; }
.o3 { width: 32vw; height: 32vw; left: 38%; bottom: 0; background: var(--red); opacity: .42; animation: float3 22s ease-in-out infinite alternate; }
.o4 { width: 26vw; height: 26vw; left: 22%; top: 40%; background: #4d6bff; opacity: .28; animation: float2 25s ease-in-out infinite alternate-reverse; }
@keyframes float1 { to { transform: translate(14vw, 10vh) scale(1.2); } }
@keyframes float2 { to { transform: translate(-16vw, 14vh) scale(0.85); } }
@keyframes float3 { to { transform: translate(-12vw, -16vh) scale(1.25); } }
.grain {
  position: absolute; inset: 0; opacity: .18; mix-blend-mode: overlay; filter: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.hero::after { content: ''; position: absolute; inset: 0; z-index: 0; background: radial-gradient(ellipse at 50% 55%, rgba(236,235,231,.55), rgba(236,235,231,.1) 70%); pointer-events: none; }

.hero-inner { position: relative; z-index: 1; width: 100%; }
h1 { font-size: clamp(44px, 9.2vw, 148px); margin: 28px 0 44px; }
.row { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap; }
.intro { max-width: 460px; font-size: clamp(16px, 1.4vw, 20px); color: #2b2b2e; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }
.scroll-hint { position: absolute; z-index: 1; bottom: 28px; left: var(--gutter); display: flex; align-items: center; gap: 12px; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
.scroll-hint span { width: 1px; height: 36px; background: linear-gradient(var(--ink), transparent); animation: drip 1.8s ease-in-out infinite; transform-origin: top; }
@keyframes drip { 0% { transform: scaleY(0); } 50% { transform: scaleY(1); } 100% { transform: scaleY(1); opacity: 0; } }
</style>
