<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { profile } from '../data/content'
import { vMagnetic } from '../composables/magnetic'

const root = ref(null)
const copied = ref(false)
let ctx

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch { /* clipboard blocked: mailto link still works */ }
}

onMounted(() => {
  ctx = gsap.context(() => {
    // Curtain: the dark panel opens from an inset rounded card to full bleed.
    gsap.fromTo(root.value, { clipPath: 'inset(10% 5% 0% 5% round 48px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top 95%', end: 'top 20%', scrub: true },
    })
    // Giant words slide in opposite horizontal directions, tied to scroll.
    gsap.fromTo('.big .a', { xPercent: -25 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top 80%', end: 'top 10%', scrub: true } })
    gsap.fromTo('.big .b', { xPercent: 25 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top 80%', end: 'top 10%', scrub: true } })
    gsap.from('.reveal', {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.reveal', start: 'top 90%' },
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <footer id="contact" ref="root" class="contact">
    <div class="glow g1" aria-hidden="true" /><div class="glow g2" aria-hidden="true" />
    <div class="container">
      <span class="eyebrow light">Contact</span>
      <h2 class="big">
        <span class="a">Let's build</span>
        <span class="b grad-text">something bold.</span>
      </h2>

      <div class="cta-row reveal">
        <a v-magnetic="0.3" :href="profile.calendly" target="_blank" rel="noopener" class="btn">Schedule a 15-min call <span class="arrow">→</span></a>
        <button v-magnetic="0.2" class="mail" @click="copyEmail" :aria-label="`Copy email ${profile.email}`">
          {{ copied ? 'Copied ✓' : profile.email }}
        </button>
      </div>

      <div class="foot reveal">
        <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span>
        <div class="soc">
          <a v-for="s in profile.socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" class="ulink">{{ s.label }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.contact { background: var(--ink); color: var(--paper); padding: clamp(100px, 14vw, 200px) 0 36px; overflow: hidden; }
.eyebrow.light { color: #9a99a0; }
.glow { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
.g1 { width: 50vw; height: 50vw; left: -10vw; bottom: -25vw; background: var(--purple); opacity: .4; animation: d1 14s ease-in-out infinite alternate; }
.g2 { width: 40vw; height: 40vw; right: -8vw; bottom: -20vw; background: var(--red); opacity: .32; animation: d1 18s ease-in-out infinite alternate-reverse; }
@keyframes d1 { to { transform: translate(8vw, -10vh) scale(1.2); } }
.container { position: relative; z-index: 1; }
.big { font-size: clamp(48px, 11vw, 190px); margin: 30px 0 60px; display: flex; flex-direction: column; letter-spacing: -0.04em; }
.big span { display: block; will-change: transform; }
.cta-row { display: flex; gap: 28px; align-items: center; flex-wrap: wrap; margin-bottom: clamp(80px, 12vw, 180px); }
.mail { font-family: var(--font-display); font-size: clamp(18px, 2.2vw, 28px); padding: 8px 4px; border-bottom: 1.5px solid #55545b; transition: color .3s, border-color .3s; }
.mail:hover { color: var(--pink); border-color: var(--pink); }
.foot { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.12); font-size: 14px; color: #9a99a0; }
.soc { display: flex; gap: 24px; }
.soc a:hover { color: #fff; }
</style>
