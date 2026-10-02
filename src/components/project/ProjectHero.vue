<script setup>
import { computed } from 'vue'
import { CATEGORIES } from '../../data/projects'
import ShotFrame from '../ShotFrame.vue'

const props = defineProps({ project: { type: Object, required: true } })
const heroImg = computed(() => props.project.hero || null)
</script>

<template>
  <header class="hero" :class="`c-${project.cat}`">
    <div class="wrap">
      <RouterLink to="/work" class="back link-arrow"><span class="arr back-arr">←</span> Back to work</RouterLink>

      <p class="crumb label rise" style="--i: 0">
        <span class="sig" aria-hidden="true">
          <i v-if="project.cat !== 'build'" class="d-design" />
          <i v-if="project.cat !== 'design'" class="d-build" />
        </span>
        <span class="cat">{{ CATEGORIES[project.cat].label }}</span> / {{ project.name }}
      </p>

      <h1 class="name rise" style="--i: 1">{{ project.name }}</h1>
      <p class="headline rise" style="--i: 2">
        <template v-if="project.headline">{{ project.headline }}</template>
        <span v-else class="tbc">Add outcome-oriented headline</span>
      </p>
      <p class="desc rise" style="--i: 3">
        <template v-if="project.description">{{ project.description }}</template>
        <span v-else class="tbc">Add short project description</span>
      </p>

      <dl class="meta rise" style="--i: 4">
        <div><dt class="label muted">Role</dt><dd>{{ project.role }}</dd></div>
        <div><dt class="label muted">Year</dt><dd><template v-if="project.year">{{ project.year }}</template><span v-else class="tbc">Add year</span></dd></div>
        <div><dt class="label muted">Platform</dt><dd><template v-if="project.platform">{{ project.platform }}</template><span v-else class="tbc">Add platform</span></dd></div>
      </dl>

      <div class="visual rise" style="--i: 5">
        <ShotFrame :src="heroImg?.src" :alt="heroImg?.alt" :name="project.name" label="hero visual" ratio="16 / 9" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero { padding: calc(var(--nav-h) + 28px) 0 clamp(48px, 7vw, 96px); }
.back { color: var(--muted); margin-bottom: clamp(36px, 6vw, 80px); }
.back:hover { color: var(--text); }
.back:hover .back-arr { transform: translateX(-5px); }
.crumb { display: flex; align-items: center; gap: 12px; color: var(--muted); margin-bottom: 20px; }
.sig { display: inline-flex; gap: 4px; }
.sig i { width: 8px; height: 8px; display: block; }
.d-design { border: 1.5px solid var(--accent); }
.d-build { background: var(--accent); }
.cat { color: var(--text); }
.c-design .cat { color: var(--primary-hover); }
.c-build .cat { color: var(--accent); }
.name { font-size: clamp(3rem, 8.4vw, 7rem); font-weight: 800; letter-spacing: -0.05em; line-height: 0.92; text-transform: uppercase; margin-bottom: 20px; overflow-wrap: anywhere; }
.headline { font-size: clamp(1.5rem, 3.2vw, 2.7rem); font-weight: 600; letter-spacing: -0.035em; line-height: 1.08; color: var(--text); max-width: 20em; }
.desc { margin-top: 20px; max-width: 36em; color: var(--body); font-size: clamp(1.05rem, 1.5vw, 1.25rem); }
.meta { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 24px; margin-top: clamp(32px, 5vw, 56px); padding-top: 20px; border-top: 1px solid var(--line); }
.meta dd { margin-top: 6px; color: var(--text); font-size: 1rem; }
.visual { margin-top: clamp(32px, 5vw, 64px); }
@media (max-width: 719px) { .meta { grid-template-columns: 1fr 1fr; } .meta > div:first-child { grid-column: 1 / -1; } }
</style>
