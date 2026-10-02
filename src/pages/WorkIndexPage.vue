<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projects, FILTERS } from '../data/projects'
import ProjectCard from '../components/ProjectCard.vue'

const route = useRoute()
const router = useRouter()

// The URL is the source of truth (?category=build), so filters are linkable and survive reloads.
const active = computed(() => (FILTERS.some((f) => f.key === route.query.category) ? route.query.category : 'all'))
const list = computed(() => (active.value === 'all' ? projects : projects.filter((p) => p.cat === active.value)))
const count = (key) => (key === 'all' ? projects.length : projects.filter((p) => p.cat === key).length)

function pick(key) {
  router.replace({ query: key === 'all' ? {} : { category: key } })
}
</script>

<template>
  <section class="idx">
    <div class="wrap">
      <p class="label accent rise" style="--i: 0">Work</p>
      <h1 class="rise" style="--i: 1">Design, build,<br />or both.</h1>
      <p class="intro rise" style="--i: 2">A library of projects. Design projects show the thinking behind the interface. Build projects show something that actually works. Design &amp; Build shows the full path.</p>

      <div class="filters rise" style="--i: 3" role="group" aria-label="Filter projects by category">
        <button
          v-for="f in FILTERS" :key="f.key" class="chip label" :class="`f-${f.key}`"
          :aria-pressed="active === f.key" @click="pick(f.key)"
        >
          {{ f.label }} <span class="num">{{ count(f.key) }}</span>
        </button>
      </div>
      <p class="sr-only" aria-live="polite">{{ list.length }} projects shown</p>

      <div class="grid-cards">
        <ProjectCard v-for="p in list" :key="p.slug" :project="p" :n="String(projects.indexOf(p) + 1).padStart(2, '0')" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.idx { padding: calc(var(--nav-h) + 64px) 0 clamp(80px, 10vw, 140px); }
h1 { font-size: clamp(2.8rem, 8vw, 6.4rem); text-transform: uppercase; letter-spacing: -0.05em; line-height: 0.95; margin: 20px 0 28px; font-weight: 800; }
.intro { max-width: 36em; color: var(--body); font-size: clamp(1.05rem, 1.5vw, 1.25rem); }
.filters { display: flex; flex-wrap: wrap; gap: 8px; margin: clamp(36px, 5vw, 64px) 0; padding-block: 16px; border-block: 1px solid var(--line); }
.chip { display: inline-flex; gap: 10px; align-items: center; padding: 11px 16px; border: 1px solid var(--line); border-radius: 4px; color: var(--muted); transition: color 0.2s, border-color 0.2s, background-color 0.2s; }
.chip:hover { color: var(--text); border-color: var(--primary); }
.chip[aria-pressed='true'] { color: var(--bg); background: var(--primary-hover); border-color: var(--primary-hover); }
.chip .num { opacity: 0.7; }
.grid-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(48px, 6vw, 80px) 32px; }
@media (max-width: 799px) { .grid-cards { grid-template-columns: 1fr; } }
</style>
