<script setup>
import { computed } from 'vue'
import ShotFrame from './ShotFrame.vue'
import CategoryTag from './CategoryTag.vue'

const props = defineProps({
  project: { type: Object, required: true },
  n: { type: String, required: true },
  layout: { type: String, default: 'a' }, // a: visual left · b: visual right · c: full-width visual
})
const to = computed(() => `/work/${props.project.slug}`)
</script>

<template>
  <article class="pb" :data-layout="layout" :aria-labelledby="`pf-${project.slug}`">
    <RouterLink :to="to" class="visual hoverable" data-cursor="VIEW" :aria-label="`View ${project.name} project`" tabindex="-1" v-reveal="0">
      <ShotFrame :index="n" :name="project.name" label="project visual" :ratio="layout === 'c' ? '21 / 9' : '4 / 3'" />
    </RouterLink>

    <div class="info" v-reveal="1">
      <header class="head">
        <CategoryTag :cat="project.cat" />
        <p class="name">{{ project.name }}</p>
        <h3 :id="`pf-${project.slug}`"><template v-if="project.headline">{{ project.headline }}</template><span v-else class="tbc">Add outcome headline</span></h3>
        <p v-if="project.description" class="desc">{{ project.description }}</p>
        <p v-else class="desc"><span class="tbc">Add one-sentence description</span></p>
      </header>

      <div class="body">
        <p class="role label"><span class="muted">Role</span> {{ project.role }}</p>
        <ul class="tags"><li v-for="t in project.tags" :key="t" class="label">{{ t }}</li></ul>
        <RouterLink :to="to" class="link-arrow cta" data-cursor="OPEN">View project <span class="arr">→</span></RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.pb { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px; row-gap: 32px; padding-block: clamp(48px, 6vw, 88px); border-top: 1px solid var(--line); align-items: end; }
.visual { display: block; }

.pb[data-layout='a'] .visual { grid-column: 1 / span 8; }
.pb[data-layout='a'] .info { grid-column: 9 / span 4; }
.pb[data-layout='b'] .visual { grid-column: 6 / span 7; grid-row: 1; }
.pb[data-layout='b'] .info { grid-column: 1 / span 5; grid-row: 1; padding-right: 16px; }
.pb[data-layout='c'] .visual { grid-column: 1 / -1; }
.pb[data-layout='c'] .info { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px; row-gap: 24px; }
.pb[data-layout='c'] .head { grid-column: 1 / span 7; }
.pb[data-layout='c'] .body { grid-column: 9 / span 4; justify-content: flex-end; }

.info { display: flex; flex-direction: column; gap: 32px; }
.head { display: flex; flex-direction: column; gap: 14px; }
.name { font-size: 1rem; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; color: var(--text); }
h3 { font-size: clamp(1.9rem, 3.6vw, 3.1rem); line-height: 1.02; letter-spacing: -0.04em; max-width: 14em; }
.desc { color: var(--muted); max-width: 30em; font-size: 1rem; }
.body { display: flex; flex-direction: column; gap: 20px; }
.role { color: var(--body); display: flex; gap: 12px; flex-wrap: wrap; text-transform: none; letter-spacing: 0.02em; font-size: 13px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tags li { padding: 6px 10px; border: 1px solid var(--line); border-radius: 4px; color: var(--body); }
.cta { align-self: flex-start; color: var(--text); }

@media (max-width: 899px) {
  .pb { row-gap: 28px; }
  .pb[data-layout] .visual, .pb[data-layout] .info { grid-column: 1 / -1; grid-row: auto; padding-right: 0; }
  .pb[data-layout='c'] .info { display: flex; }
}
</style>
