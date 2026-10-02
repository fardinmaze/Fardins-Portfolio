<script setup>
import SiteLoader from './components/SiteLoader.vue'
import CursorDot from './components/CursorDot.vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <SiteLoader />
  <CursorDot />
  <SiteNav />
  <main id="main" tabindex="-1">
    <RouterView />
  </main>
  <SiteFooter />
</template>
