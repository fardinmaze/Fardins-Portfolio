<script setup>
import CategoryTag from './CategoryTag.vue'
defineProps({ project: { type: Object, required: true }, n: { type: String, default: '' } })
</script>

<template>
  <RouterLink :to="`/work/${project.slug}`" class="row hoverable" data-cursor="OPEN">
    <span class="n num label muted">{{ n }}</span>
    <span class="cat"><CategoryTag :cat="project.cat" /></span>
    <span class="main">
      <strong class="name">{{ project.name }}</strong>
      <span class="head"><template v-if="project.headline">{{ project.headline }}</template><span v-else class="tbc">Add outcome headline</span></span>
    </span>
    <span class="role label muted">{{ project.role }}</span>
    <span class="go" aria-hidden="true">→</span>
  </RouterLink>
</template>

<style scoped>
.row { display: grid; grid-template-columns: 48px 150px minmax(0, 1fr) minmax(0, 0.8fr) 32px; gap: 24px; align-items: center; padding: 26px 0; border-top: 1px solid var(--line); transition: padding-left 0.3s var(--ease); }
.row:hover { padding-left: 10px; }
.row:hover .go { transform: translateX(5px); color: var(--text); }
.row:hover .name { color: var(--text); }
.main { display: flex; flex-direction: column; gap: 6px; }
.name { font-size: clamp(1.4rem, 2.4vw, 2rem); letter-spacing: -0.03em; color: var(--text); text-transform: uppercase; }
.head { color: var(--muted); font-size: 1rem; }
.role { text-transform: none; letter-spacing: 0.02em; font-size: 13px; }
.go { color: var(--muted); transition: transform 0.25s var(--ease), color 0.2s; justify-self: end; }
@media (max-width: 899px) {
  .row { grid-template-columns: 1fr 24px; gap: 8px 16px; padding: 22px 0; }
  .n { display: none; }
  .cat { grid-column: 1 / -1; }
  .main { grid-column: 1; }
  .role { grid-column: 1; }
  .go { grid-column: 2; grid-row: 2; }
  .row:hover { padding-left: 0; }
}
@media (prefers-reduced-motion: reduce) { .row { transition: none; } .row:hover { padding-left: 0; } }
</style>
