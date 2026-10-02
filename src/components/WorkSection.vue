<script setup>
import { pick, featuredSlugs } from '../data/projects'
import ProjectFeature from './ProjectFeature.vue'

const featured = pick(featuredSlugs)
const layouts = ['c', 'b', 'a']
</script>

<template>
  <section id="work" class="section work" aria-labelledby="work-title">
    <div class="wrap">
      <p class="label accent" v-reveal>Selected work</p>
      <h2 id="work-title" class="h-section title" v-reveal="1">Ideas <span class="arrow">→</span> Products</h2>
      <div class="list">
        <ProjectFeature v-for="(p, i) in featured" :key="p.slug" :project="p" :n="`0${i + 1}`" :layout="layouts[i % layouts.length]" />
      </div>
      <div class="more" v-reveal>
        <RouterLink to="/work" class="btn btn-ghost">All work <span class="arr">→</span></RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.title { margin: 20px 0 clamp(48px, 7vw, 96px); font-size: clamp(2.5rem, 6.4vw, 5rem); }
.arrow { color: var(--accent); }
.list { border-bottom: 1px solid var(--line); }
.more { padding-top: 40px; }
</style>
