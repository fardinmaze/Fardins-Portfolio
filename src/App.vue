<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from './composables/useSmoothScroll'
import ScrollProgress from './components/ScrollProgress.vue'
import CustomCursor from './components/CustomCursor.vue'
import TheNav from './components/TheNav.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeStrip from './components/MarqueeStrip.vue'
import AboutSection from './components/AboutSection.vue'
import WorkSection from './components/WorkSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ContactSection from './components/ContactSection.vue'

onMounted(() => {
  useSmoothScroll()
  // Fonts shift layout; re-measure triggers once everything settles.
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
})
onBeforeUnmount(() => ScrollTrigger.getAll().forEach((t) => t.kill()))
</script>

<template>
  <ScrollProgress />
  <CustomCursor />
  <TheNav />
  <main>
    <HeroSection />
    <MarqueeStrip />
    <AboutSection />
    <WorkSection />
    <ServicesSection />
    <ExperienceSection />
  </main>
  <ContactSection />
</template>
