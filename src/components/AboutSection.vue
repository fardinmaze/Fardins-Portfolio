<script setup>
import { about } from '../data/content'
</script>

<template>
  <section id="about" class="section rule" aria-labelledby="about-title">
    <div class="wrap grid">
      <div class="left">
        <p class="label accent" v-reveal>About</p>
        <h2 id="about-title" class="h-section title" v-split="'lines'">
          <span v-for="l in about.title" :key="l" class="tl">{{ l }}</span>
        </h2>
        <div class="paras">
          <p v-for="(p, i) in about.paragraphs" :key="i" v-split="'blur-words'">{{ p }}</p>
        </div>
        <ul class="tags" v-reveal="4">
          <li v-for="t in about.tags" :key="t" class="label">{{ t }}</li>
        </ul>
      </div>

      <div class="right">
        <dl class="facts" v-reveal="2">
          <div v-for="f in about.facts" :key="f.big">
            <dt>{{ f.big }}</dt>
            <dd class="label muted">{{ f.small }}</dd>
          </div>
        </dl>

        <div class="exp" v-reveal="3">
          <p class="label muted head">Experience</p>
          <ul>
            <li v-for="e in about.experience" :key="e.org + e.role">
              <span class="role">{{ e.role }}<span class="muted"> · {{ e.org }}</span></span>
              <span class="label muted period">{{ e.period }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.left { grid-column: 1 / span 7; }
.right { grid-column: 9 / span 4; padding-top: 2.4rem; }
.title { margin: 20px 0 clamp(28px, 4vw, 48px); font-size: clamp(2.5rem, 6vw, 4.8rem); }
.tl { display: block; }
.paras { display: flex; flex-direction: column; gap: 20px; max-width: 32em; font-size: clamp(1.1rem, 1.6vw, 1.3rem); line-height: 1.45; }
.paras p:first-child { color: var(--text); }
.paras p + p { color: var(--muted); }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 36px; }
.tags li { padding: 8px 12px; border: 1px solid var(--line); border-radius: 4px; }

.facts > div { padding: 20px 0; border-top: 1px solid var(--line); }
.facts dt { font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 800; letter-spacing: -0.04em; text-transform: uppercase; line-height: 1; margin-bottom: 8px; }
.exp { margin-top: 28px; border-top: 1px solid var(--line); padding-top: 20px; }
.head { margin-bottom: 8px; }
.exp li { display: flex; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 1rem; line-height: 1.3; }
.period { white-space: nowrap; padding-top: 3px; }

@media (max-width: 999px) {
  .left, .right { grid-column: 1 / -1; }
  .right { padding-top: 56px; }
}
@media (max-width: 519px) {
  .exp li { flex-direction: column; gap: 4px; }
}
</style>
