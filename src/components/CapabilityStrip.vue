<script setup>
import { strip } from '../data/content'
</script>

<template>
  <section class="strip rule" aria-label="Capabilities">
    <div class="wrap">
      <ul class="cells">
        <li v-for="(c, i) in strip" :key="c.title" v-reveal="i">
          <h2 class="label"><span class="plus" aria-hidden="true">{{ i ? '+' : '' }}</span> {{ c.title }}</h2>
          <p class="items">{{ c.items.join(' · ') }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.strip { border-bottom: 1px solid var(--line); }
.cells { display: grid; grid-template-columns: repeat(4, 1fr); }
li { padding: 28px 24px 28px 0; }
li + li { padding-left: 24px; border-left: 1px solid var(--line); }
h2 { display: flex; gap: 10px; color: var(--text); letter-spacing: 0.08em; margin-bottom: 8px; }
.plus { color: var(--accent); width: 0.8em; }
.items { color: var(--muted); font-size: 0.95rem; line-height: 1.4; }
@media (max-width: 899px) {
  .cells { grid-template-columns: 1fr 1fr; }
  li, li + li { padding: 22px 16px 22px 0; border-left: 0; border-top: 1px solid var(--line); }
  li:nth-child(-n + 2) { border-top: 0; }
  li:nth-child(even) { padding-left: 16px; border-left: 1px solid var(--line); }
}
@media (max-width: 519px) {
  .cells { grid-template-columns: 1fr; }
  li:nth-child(even) { padding-left: 0; border-left: 0; }
  li:nth-child(2) { border-top: 1px solid var(--line); }
}
</style>
