<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { nav, profile } from '../data/content'
import { scrollToTarget } from '../composables/useSmoothScroll'
import { vMagnetic } from '../composables/magnetic'

const hidden = ref(false)
let last = 0
const onScroll = () => {
  const y = window.scrollY
  hidden.value = y > last && y > 160
  last = y
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ hidden }">
    <a href="#top" class="logo" @click.prevent="scrollToTarget(0)">
      <span class="mark" /> {{ profile.firstName }}
    </a>
    <nav class="links">
      <a v-for="n in nav" :key="n.href" :href="n.href" class="ulink" @click.prevent="scrollToTarget(n.href)">{{ n.label }}</a>
    </nav>
    <a v-magnetic="0.25" :href="profile.calendly" target="_blank" rel="noopener" class="btn cta">
      Talk with me <span class="arrow">→</span>
    </a>
  </header>
</template>

<style scoped>
.nav {
  position: fixed; top: 16px; left: 50%; z-index: 90; translate: -50% 0;
  display: flex; align-items: center; gap: 28px;
  padding: 8px 8px 8px 20px; border-radius: 999px;
  background: rgba(236, 235, 231, 0.7); backdrop-filter: blur(16px) saturate(1.4);
  box-shadow: 0 0 0 1px var(--line), 0 12px 40px -16px rgba(0, 0, 0, 0.25);
  transition: transform .5s cubic-bezier(.2,.8,.2,1);
  width: max-content; max-width: calc(100vw - 24px);
}
.nav.hidden { transform: translateY(-140%); }
.logo { display: flex; align-items: center; gap: 8px; font-family: var(--font-display); font-weight: 700; font-size: 18px; letter-spacing: -0.03em; }
.mark { width: 14px; height: 14px; border-radius: 50%; background: var(--grad); animation: spin 6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg) scale(1.15); } }
.links { display: flex; gap: 24px; font-size: 14px; font-weight: 500; }
.cta { padding: 10px 18px; font-size: 14px; }
@media (max-width: 720px) { .links { display: none; } .nav { gap: 16px; } }
</style>
