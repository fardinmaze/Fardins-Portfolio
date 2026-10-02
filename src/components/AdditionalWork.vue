<script setup>
import { pick, additionalSlugs, otherWork } from '../data/projects'
import ProjectRow from './ProjectRow.vue'

const items = pick(additionalSlugs)
</script>

<template>
  <section id="additional" class="section rule" aria-labelledby="add-title">
    <div class="wrap">
      <p class="label accent" v-reveal>Additional work</p>
      <h2 id="add-title" class="h-section title" v-split="'lines'">More projects.</h2>

      <div class="list" v-reveal="1">
        <ProjectRow v-for="(p, i) in items" :key="p.slug" :project="p" :n="`0${i + 1}`" />

        <!-- Earlier work carried over from the previous portfolio: listed, no dedicated page yet -->
        <div v-for="(o, i) in otherWork" :key="o.name" class="plain">
          <span class="n num label muted">0{{ items.length + i + 1 }}</span>
          <span class="main">
            <strong class="name">{{ o.name }}</strong>
            <span class="head">{{ o.line }}</span>
          </span>
          <span class="facts label muted">{{ o.facts }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.title { margin: 20px 0 clamp(32px, 5vw, 64px); font-size: clamp(2.2rem, 4.6vw, 3.6rem); }
.list { border-bottom: 1px solid var(--line); }
.plain { display: grid; grid-template-columns: 48px minmax(0, 1fr) minmax(0, 0.8fr); gap: 24px; align-items: center; padding: 26px 0; border-top: 1px solid var(--line); }
.main { display: flex; flex-direction: column; gap: 6px; }
.name { font-size: clamp(1.4rem, 2.4vw, 2rem); letter-spacing: -0.03em; color: var(--text); text-transform: uppercase; }
.head { color: var(--muted); }
.facts { text-transform: none; letter-spacing: 0.02em; font-size: 13px; }
@media (max-width: 899px) {
  .plain { grid-template-columns: 1fr; gap: 8px; padding: 22px 0; }
  .n { display: none; }
}
</style>
