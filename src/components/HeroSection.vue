<script setup>
import { hero } from '../data/content'
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="gridbg" aria-hidden="true" />
    <div class="wrap inner">
      <div class="meta rise" style="--i: 0">
        <span class="label accent">{{ hero.metaLeft }}</span>
        <span class="label muted">{{ hero.metaRight }}</span>
      </div>

      <h1 id="hero-title">
        <span class="line rise" style="--i: 1">Product Analyst</span>
        <span class="line rise" style="--i: 2">&amp; Designer<span class="stop">.</span></span>
      </h1>

      <div class="lower grid">
        <div class="copy">
          <p class="lead rise" style="--i: 3">{{ hero.lead }}</p>
          <p class="sub rise" style="--i: 3">{{ hero.sub }}</p>
          <div class="ctas rise" style="--i: 4">
            <RouterLink to="/work" class="btn btn-accent">View work <span class="arr">↘</span></RouterLink>
            <RouterLink :to="{ path: '/', hash: '#contact' }" class="btn btn-ghost">Let's talk <span class="arr">↗</span></RouterLink>
          </div>
        </div>

        <!-- Product-development system: one lime marker steps through the stages (CSS only) -->
        <ol class="pipe rise" style="--i: 5" role="img" aria-label="Product development flow: idea, research, product, design, build, launch">
          <li v-for="(s, i) in hero.pipeline" :key="s.name" class="step" :style="{ '--n': i }" aria-hidden="true">
            <span class="idx num">0{{ i + 1 }}</span>
            <span class="name">{{ s.name }}</span>
            <span class="note">{{ s.note }}</span>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; min-height: 100svh; display: flex; align-items: flex-end; padding: calc(var(--nav-h) + 56px) 0 56px; overflow: hidden; }
.gridbg {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.55;
  background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 70% 40%, #000 0%, transparent 75%);
  mask-image: radial-gradient(ellipse 80% 70% at 70% 40%, #000 0%, transparent 75%);
}
.inner { position: relative; width: 100%; }
.meta { display: flex; flex-wrap: wrap; gap: 8px 32px; margin-bottom: clamp(28px, 4vw, 56px); }
h1 { font-size: var(--h-hero); line-height: 0.94; letter-spacing: -0.045em; text-transform: uppercase; font-weight: 800; margin-bottom: clamp(40px, 6vw, 88px); }
.line { display: block; }
.stop { color: var(--accent); }

.lower { align-items: end; row-gap: 40px; }
.copy { grid-column: 1 / span 6; }
.lead { font-size: clamp(1.35rem, 2.2vw, 1.85rem); line-height: 1.2; letter-spacing: -0.02em; font-weight: 600; max-width: 22em; }
.sub { margin-top: 16px; color: var(--muted); max-width: 30em; }
.ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }

.pipe { grid-column: 8 / span 5; border-top: 1px solid var(--line); }
.step {
  position: relative; display: grid; grid-template-columns: 34px 1fr auto; align-items: baseline; gap: 12px;
  padding: 11px 0 11px 22px; border-bottom: 1px solid var(--line); color: var(--muted);
  animation: lit 7.2s linear infinite; animation-delay: calc(var(--n) * 1.2s);
}
.step::before {
  content: ''; position: absolute; left: 0; top: 50%; width: 8px; height: 8px; translate: 0 -50%;
  border: 1px solid var(--primary); background: var(--bg); animation: node 7.2s linear infinite; animation-delay: calc(var(--n) * 1.2s);
}
.idx { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; }
.name { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; text-transform: uppercase; }
.note { font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 500; }
@keyframes lit { 0%, 14% { color: var(--text); } 17%, 100% { color: var(--muted); } }
@keyframes node { 0%, 14% { background: var(--accent); border-color: var(--accent); } 17%, 100% { background: var(--bg); border-color: var(--primary); } }

@media (max-width: 1099px) {
  .copy { grid-column: 1 / -1; }
  .pipe { grid-column: 1 / -1; }
}
@media (max-width: 599px) {
  .note { display: none; }
  .step { grid-template-columns: 34px 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .step, .step::before { animation: none; }
}
</style>
