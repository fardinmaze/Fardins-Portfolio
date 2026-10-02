<script setup>
import { ai } from '../data/content'
</script>

<template>
  <section id="ai" class="section rule" aria-labelledby="ai-title">
    <div class="wrap">
      <div class="grid">
        <div class="left">
          <p class="label accent" v-reveal>AI-assisted workflow</p>
          <h2 id="ai-title" class="h-section title" v-reveal="1">
            <span v-for="l in ai.title" :key="l" class="tl">{{ l }}</span>
          </h2>
          <p class="text" v-reveal="2">{{ ai.text }}</p>
        </div>

        <ol class="seq" v-reveal="2" aria-label="Workflow sequence">
          <li v-for="(s, i) in ai.steps" :key="s">
            <span class="n num label muted">0{{ i + 1 }}</span>
            <span class="name">{{ s }}</span>
            <span class="down" aria-hidden="true">{{ i < ai.steps.length - 1 ? '↓' : '↺' }}</span>
          </li>
        </ol>
      </div>
    </div>

    <!-- tools: restrained ticker. The second list is a visual duplicate for the loop only. -->
    <div class="ticker" v-reveal="1">
      <ul class="sr-only">
        <li v-for="t in ai.tools" :key="t">{{ t }}</li>
      </ul>
      <div class="track" aria-hidden="true">
        <template v-for="k in 4" :key="k">
          <span v-for="t in ai.tools" :key="t + k" class="tool">{{ t }}<i /></span>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.left { grid-column: 1 / span 6; }
.title { margin: 20px 0 clamp(24px, 3vw, 40px); font-size: clamp(2.5rem, 6vw, 4.8rem); }
.tl { display: block; }
.text { color: var(--muted); max-width: 28em; font-size: clamp(1.1rem, 1.6vw, 1.3rem); }

.seq { grid-column: 8 / span 5; border-top: 1px solid var(--line); align-self: end; }
.seq li { display: grid; grid-template-columns: 40px 1fr auto; align-items: baseline; padding: 13px 0; border-bottom: 1px solid var(--line); transition: padding-left 0.3s var(--ease); }
.seq li:hover { padding-left: 10px; }
.seq li:hover .name { color: var(--accent); }
.name { font-size: 1.4rem; font-weight: 700; letter-spacing: -0.02em; text-transform: uppercase; transition: color 0.2s; }
.down { color: var(--muted); }

.ticker { margin-top: clamp(64px, 9vw, 120px); border-block: 1px solid var(--line); overflow: hidden; }
.track { display: flex; width: max-content; animation: slide 36s linear infinite; }
.ticker:hover .track { animation-play-state: paused; }
.tool { display: inline-flex; align-items: center; gap: 40px; padding: 28px 40px 28px 0; font-size: clamp(2rem, 5vw, 4rem); font-weight: 700; letter-spacing: -0.04em; text-transform: uppercase; color: var(--muted); white-space: nowrap; }
.tool i { width: 8px; height: 8px; background: var(--accent); }
@keyframes slide { to { transform: translateX(-25%); } }

.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

@media (max-width: 999px) {
  .left, .seq { grid-column: 1 / -1; }
  .seq { margin-top: 48px; }
}
@media (prefers-reduced-motion: reduce) {
  .track { animation: none; flex-wrap: wrap; width: auto; padding-inline: var(--gutter); }
  .seq li { transition: none; }
}
</style>
