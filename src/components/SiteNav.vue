<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { nav } from '../data/content'

const route = useRoute()
const scrolled = ref(false)
const open = ref(false)
const hashActive = ref('')
let io

const onScroll = () => { scrolled.value = window.scrollY > 24 }
const onKey = (e) => { if (e.key === 'Escape') open.value = false }

// Home sections that belong to a nav item (Work is a real page, so it is matched by route instead)
const GROUP = { about: 'about', capabilities: 'about', experiments: 'experiments', additional: 'work', work: 'work', ai: 'experiments', contact: 'contact' }

function observe() {
  io?.disconnect()
  hashActive.value = ''
  if (route.name !== 'home') return
  io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) hashActive.value = GROUP[e.target.id] ?? ''
  }, { rootMargin: '-45% 0px -50% 0px' })
  document.querySelectorAll('section[id]').forEach((s) => io.observe(s))
}

const isActive = (id) => (id === 'work' && route.path.startsWith('/work')) || (route.name === 'home' && hashActive.value === id)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  observe()
})
watch(() => route.fullPath, () => { open.value = false; setTimeout(observe, 60) })
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  io?.disconnect()
})
</script>

<template>
  <header class="nav" :class="{ scrolled, open }">
    <div class="wrap bar">
      <RouterLink to="/" class="brand" aria-label="Fardin, home">FARDIN</RouterLink>

      <nav class="links" aria-label="Primary">
        <RouterLink v-for="n in nav" :key="n.id" :to="n.to" class="link label" :aria-current="isActive(n.id) ? 'true' : undefined">{{ n.label }}</RouterLink>
      </nav>

      <RouterLink :to="{ path: '/', hash: '#contact' }" class="btn btn-accent cta">Let's talk <span class="arr">↗</span></RouterLink>

      <button class="menu label" :aria-expanded="open" aria-controls="mobile-menu" @click="open = !open">
        {{ open ? 'Close' : 'Menu' }}
      </button>
    </div>

    <nav id="mobile-menu" class="panel" aria-label="Mobile" :hidden="!open">
      <RouterLink v-for="n in nav" :key="n.id" :to="n.to">{{ n.label }}</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#contact' }" class="accent">Let's talk ↗</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.nav { position: fixed; inset: 0 0 auto 0; z-index: 100; border-bottom: 1px solid transparent; transition: background-color 0.3s, border-color 0.3s; }
.nav.scrolled, .nav.open { background: rgba(10, 10, 10, 0.9); border-bottom-color: var(--line); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.bar { height: var(--nav-h); display: flex; align-items: center; gap: 40px; }
.brand { font-weight: 800; font-size: 18px; letter-spacing: -0.02em; margin-right: auto; color: var(--text); }
.links { display: flex; gap: 32px; }
.link { color: var(--muted); transition: color 0.2s; position: relative; padding: 6px 0; }
.link:hover { color: var(--text); }
.link[aria-current='true'] { color: var(--text); box-shadow: inset 0 -2px 0 var(--accent); }
.cta { padding: 11px 16px; }
.menu { display: none; padding: 10px 0; color: var(--text); }
.panel { display: none; }

@media (max-width: 819px) {
  .links, .cta { display: none; }
  .menu { display: block; }
  .panel:not([hidden]) { display: flex; flex-direction: column; padding: 8px var(--gutter) 28px; border-top: 1px solid var(--line); }
  .panel a { font-size: 32px; font-weight: 700; letter-spacing: -0.03em; text-transform: uppercase; padding: 14px 0; border-bottom: 1px solid var(--line); color: var(--text); }
  .panel a.accent { color: var(--primary-hover); border-bottom: 0; }
}
</style>
