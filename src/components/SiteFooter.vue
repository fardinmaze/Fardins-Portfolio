<script setup>
import { profile } from '../data/content'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="foot rule">
    <div class="wrap">
      <div class="top grid">
        <div class="id">
          <p class="brand">FARDIN</p>
          <p class="label muted">Product Analyst &amp; Designer</p>
        </div>
        <ul class="areas label">
          <li><RouterLink :to="{ path: '/work', query: { category: 'design' } }">Design</RouterLink></li>
          <li><RouterLink :to="{ path: '/work', query: { category: 'build' } }">Build</RouterLink></li>
          <li><RouterLink :to="{ path: '/work', query: { category: 'design-build' } }">Design &amp; Build</RouterLink></li>
        </ul>
        <ul class="links label">
          <li><a :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn ↗</a></li>
          <li><a :href="`mailto:${profile.email}`">Email ↗</a></li>
          <li><a :href="profile.framer" target="_blank" rel="noopener">Portfolio / Framer ↗</a></li>
        </ul>
      </div>
      <p class="label muted copy">© {{ year }} FARDIN</p>
    </div>
  </footer>
</template>

<style scoped>
.foot { padding: 56px 0 32px; }
.top { row-gap: 32px; align-items: start; }
.id { grid-column: 1 / span 5; }
.brand { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 6px; color: var(--text); }
.areas { grid-column: 6 / span 3; display: flex; flex-direction: column; gap: 8px; }
.links { grid-column: 9 / span 4; display: flex; flex-direction: column; gap: 8px; }
.areas a, .links a { transition: color 0.2s; }
.areas a { color: var(--muted); }
.areas a:hover, .links a:hover { color: var(--primary-hover); }
.copy { margin-top: 56px; padding-top: 20px; border-top: 1px solid var(--line); }
@media (max-width: 899px) { .id, .areas, .links { grid-column: 1 / -1; } }
</style>
