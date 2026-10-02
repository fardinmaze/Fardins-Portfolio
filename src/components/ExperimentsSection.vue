<script setup>
import { pick, experimentSlugs } from '../data/projects'
import ProjectRow from './ProjectRow.vue'

const items = pick(experimentSlugs)
</script>

<template>
  <section id="experiments" class="section rule" aria-labelledby="exp-title">
    <div class="wrap">
      <div class="grid head">
        <div class="l">
          <p class="label accent" v-reveal>Micro products / experiments</p>
          <h2 id="exp-title" class="h-section title" v-reveal="1">Small tools,<br />working proof.</h2>
        </div>
        <p class="r" v-reveal="2">Experiments where the goal is a working thing, not a mockup: tools and MVPs built to test an idea fast.</p>
      </div>
      <div class="list" v-reveal="1">
        <ProjectRow v-for="(p, i) in items" :key="p.slug" :project="p" :n="`0${i + 1}`" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.head { row-gap: 24px; margin-bottom: clamp(36px, 5vw, 64px); align-items: end; }
.l { grid-column: 1 / span 7; }
.r { grid-column: 9 / span 4; color: var(--muted); }
.title { margin-top: 20px; font-size: clamp(2.5rem, 5.4vw, 4.4rem); }
.list { border-bottom: 1px solid var(--line); }
@media (max-width: 899px) { .l, .r { grid-column: 1 / -1; } }
</style>
