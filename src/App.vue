<script setup>
import CursorDot from './components/CursorDot.vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <CursorDot />
  <SiteNav />
  <main id="main" tabindex="-1">
    <RouterView />
  </main>
  <SiteFooter />
</template>
