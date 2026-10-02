<script setup>
import CategoryTag from '../CategoryTag.vue'
import ShotFrame from '../ShotFrame.vue'

defineProps({ next: { type: Object, required: true } })
</script>

<template>
  <section class="next rule" aria-labelledby="next-title">
    <div class="wrap">
      <div class="top">
        <p id="next-title" class="label accent">Next project</p>
        <RouterLink to="/work" class="link-arrow muted"><span class="arr back-arr">←</span> All work</RouterLink>
      </div>

      <RouterLink :to="`/work/${next.slug}`" class="card hoverable" data-cursor="VIEW">
        <div class="txt">
          <CategoryTag :cat="next.cat" />
          <p class="name">{{ next.name }}</p>
          <p class="head"><template v-if="next.headline">{{ next.headline }}</template><span v-else class="tbc">Add outcome headline</span></p>
          <p v-if="next.description" class="blurb">{{ next.description }}</p>
          <span class="link-arrow go">View project <span class="arr">→</span></span>
        </div>
        <div class="vis"><ShotFrame :src="next.cover?.src" :alt="next.cover?.alt" :name="next.name" label="project visual" ratio="16 / 9" /></div>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.next { padding-block: clamp(56px, 8vw, 112px); }
.top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 32px; }
.link-arrow.muted { color: var(--muted); }
.link-arrow.muted:hover { color: var(--text); }
.link-arrow.muted:hover .back-arr { transform: translateX(-5px); }
.card { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px; row-gap: 28px; align-items: end; transition: transform 0.35s var(--ease); }
.card:hover { transform: translateY(-4px); }
.card:hover .go { color: var(--primary-hover); }
.card:hover .go .arr { transform: translateX(5px); }
.txt { grid-column: 1 / span 5; display: flex; flex-direction: column; gap: 16px; }
.vis { grid-column: 6 / span 7; }
.name { font-size: clamp(2.4rem, 5.4vw, 4.4rem); font-weight: 800; letter-spacing: -0.05em; line-height: 0.95; text-transform: uppercase; color: var(--text); overflow-wrap: anywhere; }
.head { font-size: clamp(1.15rem, 1.8vw, 1.5rem); color: var(--body); letter-spacing: -0.02em; line-height: 1.2; }
.blurb { color: var(--muted); font-size: 1rem; max-width: 28em; }
.go { color: var(--text); margin-top: 8px; }
@media (max-width: 899px) { .txt, .vis { grid-column: 1 / -1; } .card { row-gap: 24px; } .vis { order: -1; } }
@media (prefers-reduced-motion: reduce) { .card:hover { transform: none; } }
</style>
