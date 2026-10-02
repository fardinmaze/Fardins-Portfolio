<script setup>
import ShotFrame from './ShotFrame.vue'
import CategoryTag from './CategoryTag.vue'

defineProps({ project: { type: Object, required: true }, n: { type: String, default: '' } })
</script>

<template>
  <article class="card hoverable" data-cursor="VIEW">
    <ShotFrame :src="project.cover?.src" :alt="project.cover?.alt" :index="n" :name="project.name" label="project visual" ratio="4 / 3" />
    <div class="info">
      <CategoryTag :cat="project.cat" />
      <h2 class="name">{{ project.name }}</h2>
      <p class="head"><template v-if="project.headline">{{ project.headline }}</template><span v-else class="tbc">Add outcome headline</span></p>
      <p v-if="project.description" class="desc">{{ project.description }}</p>
      <p v-else class="desc"><span class="tbc">Add one-sentence description</span></p>
      <p class="role label"><span class="muted">Role</span> {{ project.role }}</p>
      <ul class="tags"><li v-for="t in project.tags" :key="t" class="label">{{ t }}</li></ul>
      <!-- stretched link: the whole card is one link target -->
      <RouterLink :to="`/work/${project.slug}`" class="link-arrow cta">View project <span class="arr">→</span></RouterLink>
    </div>
  </article>
</template>

<style scoped>
.card { position: relative; display: flex; flex-direction: column; gap: 24px; transition: transform 0.35s var(--ease); }
.card:hover { transform: translateY(-4px); }
.card:focus-within { outline: 2px solid var(--accent); outline-offset: 8px; border-radius: var(--r); }
.info { display: flex; flex-direction: column; gap: 12px; }
.name { font-size: clamp(1.1rem, 1.5vw, 1.3rem); text-transform: uppercase; letter-spacing: 0.01em; }
.head { font-size: clamp(1.5rem, 2.6vw, 2.2rem); font-weight: 600; line-height: 1.05; letter-spacing: -0.04em; color: var(--text); max-width: 16em; }
.desc { color: var(--muted); font-size: 1rem; max-width: 32em; }
.role { display: flex; gap: 12px; flex-wrap: wrap; color: var(--body); text-transform: none; letter-spacing: 0.02em; font-size: 13px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tags li { padding: 5px 9px; border: 1px solid var(--line); border-radius: 4px; color: var(--body); }
.cta { align-self: flex-start; color: var(--text); margin-top: 6px; }
.cta::after { content: ''; position: absolute; inset: 0; }
.card:hover .cta { color: var(--primary-hover); }
.card:hover .cta .arr { transform: translateX(5px); }
@media (prefers-reduced-motion: reduce) { .card:hover { transform: none; } }
</style>
