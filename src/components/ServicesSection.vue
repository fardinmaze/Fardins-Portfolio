<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data/content'

const root = ref(null)
let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.svc-title .line-mask > span', {
      yPercent: 110, duration: 1, stagger: 0.1, ease: 'power4.out',
      scrollTrigger: { trigger: '.svc-title', start: 'top 85%' },
    })
    // Grid tiles unmask upward in batches as they enter the viewport.
    gsap.set('.tile', { clipPath: 'inset(100% 0 0 0)', y: 30 })
    ScrollTrigger.batch('.tile', {
      start: 'top 90%', once: true,
      onEnter: (els) => gsap.to(els, { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }),
    })
  }, root.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="services" ref="root" class="services">
    <div class="container">
      <span class="eyebrow">What I do</span>
      <h2 class="svc-title">
        <span class="line-mask"><span>Design that works</span></span>
        <span class="line-mask"><span>for <em class="grad-text">people</em> and <em class="grad-text">business.</em></span></span>
      </h2>
      <div class="grid">
        <article v-for="(s, i) in services" :key="s.title" class="tile">
          <span class="n">0{{ i + 1 }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
          <span class="go">↗</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services { padding: clamp(100px, 14vw, 200px) 0; }
.svc-title { font-size: clamp(36px, 6vw, 92px); margin: 28px 0 clamp(48px, 6vw, 90px); }
.svc-title em { font-style: normal; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.tile {
  position: relative; display: flex; flex-direction: column; gap: 14px; min-height: 280px; padding: 24px;
  border-radius: 22px; background: var(--paper-2); overflow: hidden; isolation: isolate;
  transition: color .4s, transform .4s cubic-bezier(.2,.8,.2,1);
}
/* gradient floods up from below on hover */
.tile::before { content: ''; position: absolute; inset: 0; z-index: -1; background: var(--grad); transform: translateY(101%); transition: transform .55s cubic-bezier(.2,.8,.2,1); }
.tile:hover { color: #fff; transform: translateY(-6px); }
.tile:hover::before { transform: none; }
.n { font-size: 13px; color: var(--muted); transition: color .4s; }
.tile:hover .n, .tile:hover p { color: rgba(255,255,255,.85); }
h3 { font-size: 26px; margin-top: auto; }
p { font-size: 14px; color: #55545a; transition: color .4s; }
.go { position: absolute; top: 20px; right: 22px; font-size: 20px; transition: transform .4s cubic-bezier(.2,.8,.2,1); }
.tile:hover .go { transform: translate(4px, -4px) rotate(45deg); }
@media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .grid { grid-template-columns: 1fr; } .tile { min-height: 220px; } }
</style>
