<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap, prefersReducedMotion } from '../composables/gsap'
import { pick, featuredSlugs } from '../data/projects'
import ShotFrame from './ShotFrame.vue'
import CategoryTag from './CategoryTag.vue'

const featured = pick(featuredSlugs)
const n = featured.length
const ROTATIONS = [-9, 13, -15, 7, -11, 10] // each card leaves with a different tilt

const track = ref(null)
const list = ref(null)
const cards = ref([])
const active = ref(0)
const stacked = ref(true) // false = plain list (reduced motion)
let ctx

// Scroll distance of the pinned stage: one step per card that leaves, plus a short rest at the end.
const trackHeight = computed(() => `calc(100svh + ${(n - 1) * 90}svh + 30svh)`)
const pad = (i) => String(i + 1).padStart(2, '0')

onMounted(() => {
  if (prefersReducedMotion()) { stacked.value = false; return }

  ctx = gsap.context(() => {
    const els = cards.value
    const depth = () => (window.innerWidth < 768 ? 14 : window.innerWidth < 992 ? 18 : 30)

    // 1) Entry: the whole stack swings up into place while the section scrolls into view.
    const entry = { trigger: track.value, start: 'top bottom', end: 'top top', scrub: 0.8 }
    gsap.fromTo(list.value, { yPercent: 30, rotation: -4 }, { yPercent: 0, rotation: 0, ease: 'none', scrollTrigger: entry })
    gsap.fromTo(track.value.querySelectorAll('.media'), { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: entry })

    // 2) Resting positions: every card sits a little lower and further back than the one above it.
    els.forEach((el, i) => gsap.set(el, { y: () => depth() * i, z: () => -depth() * i, rotation: 0, scale: 1 }))

    // 3) Pinned scrub: the top card flies up and tilts away, the rest step forward in depth.
    const tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: track.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          active.value = Math.max(0, Math.min(n - 1, Math.round(self.progress * (n - 1 + 0.35))))
        },
      },
    })
    for (let i = 0; i < n - 1; i++) {
      tl.to(els[i], { y: () => -window.innerHeight * 1.1, scale: 1.18, rotation: ROTATIONS[i % ROTATIONS.length], ease: 'power1.in' }, i)
      for (let j = i + 1; j < n; j++) {
        const slot = j - i - 1
        tl.to(els[j], { y: () => depth() * slot, z: () => -depth() * slot, ease: 'power1.inOut' }, i)
      }
    }
    tl.to({}, { duration: 0.35 })
  }, track.value)
})
onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="work" class="work" :class="{ plain: !stacked }" aria-labelledby="work-title">
    <div class="wrap head">
      <p class="label accent" v-reveal>Selected work</p>
      <h2 id="work-title" class="h-section title" v-split="'lines'">Ideas <span class="arrow">→</span> Products</h2>
    </div>

    <div ref="track" class="track" :style="stacked ? { height: trackHeight } : null">
      <div class="stage">
        <ol ref="list" class="list">
          <li
            v-for="(p, i) in featured" :key="p.slug"
            :ref="(el) => (cards[i] = el)"
            class="card" :class="{ gone: stacked && i < active }" :style="{ zIndex: n - i }"
            :aria-labelledby="`wc-${p.slug}`"
          >
            <div class="info">
              <div class="top">
                <CategoryTag :cat="p.cat" />
                <span class="count num label muted">{{ pad(i) }} / {{ pad(n - 1) }}</span>
              </div>
              <div class="mid">
                <p class="name">{{ p.name }}</p>
                <h3 :id="`wc-${p.slug}`">
                  <template v-if="p.headline">{{ p.headline }}</template><span v-else class="tbc">Add outcome headline</span>
                </h3>
                <p v-if="p.description" class="desc">{{ p.description }}</p>
                <p v-else class="desc"><span class="tbc">Add one-sentence description</span></p>
              </div>
              <div class="bottom">
                <p class="role label"><span class="muted">Role</span> {{ p.role }}</p>
                <ul class="tags"><li v-for="t in p.tags" :key="t" class="label">{{ t }}</li></ul>
                <RouterLink :to="`/work/${p.slug}`" class="link-arrow cta" data-cursor="OPEN">View project <span class="arr">→</span></RouterLink>
              </div>
            </div>
            <div class="visual" data-cursor="VIEW">
              <ShotFrame :src="p.cover?.src" :alt="p.cover?.alt" :index="pad(i)" :name="p.name" label="project visual" ratio="auto" />
            </div>
          </li>
        </ol>
      </div>
    </div>

    <div class="wrap more">
      <RouterLink to="/work" class="btn btn-ghost">All work <span class="arr">→</span></RouterLink>
    </div>
  </section>
</template>

<style scoped>
.work { padding-top: clamp(80px, 11vw, 160px); }
.title { margin: 20px 0 clamp(36px, 5vw, 64px); font-size: clamp(2.5rem, 6.4vw, 5rem); }
.arrow { color: var(--accent); }

.stage { position: sticky; top: 0; height: 100vh; height: 100svh; overflow: hidden; perspective: 1400px; display: grid; }
.list { position: relative; transform-style: preserve-3d; will-change: transform; }
.card {
  position: absolute; inset: 0; margin: auto;
  width: min(1180px, calc(100% - var(--gutter) * 2)); height: min(74svh, 640px);
  display: grid; grid-template-columns: 5fr 7fr; gap: 20px; padding: 20px;
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--r);
  box-shadow: 0 30px 60px -30px #000; will-change: transform;
}
.card.gone { pointer-events: none; }
.info { display: flex; flex-direction: column; justify-content: space-between; gap: 20px; padding: clamp(8px, 1.6vw, 24px); min-height: 0; }
.top { display: flex; justify-content: space-between; align-items: center; }
.mid { display: flex; flex-direction: column; gap: 14px; }
.name { font-size: 0.95rem; font-weight: 700; letter-spacing: 0.02em; text-transform: uppercase; color: var(--text); }
h3 { font-size: clamp(1.7rem, 3.1vw, 2.9rem); line-height: 1.02; letter-spacing: -0.04em; }
.desc { color: var(--muted); font-size: 1rem; max-width: 30em; }
.bottom { display: flex; flex-direction: column; gap: 14px; }
.role { display: flex; gap: 10px; flex-wrap: wrap; text-transform: none; letter-spacing: 0.02em; font-size: 13px; color: var(--body); }
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tags li { padding: 5px 9px; border: 1px solid var(--line); border-radius: 4px; color: var(--body); }
.cta { align-self: flex-start; color: var(--text); }
.cta::after { content: ''; position: absolute; inset: 0; z-index: 1; } /* whole card is the link target */
.visual { min-height: 0; }
.visual :deep(.shot) { height: 100%; }

.more { padding-block: clamp(32px, 5vw, 56px) 0; }

@media (max-width: 899px) {
  .card { grid-template-columns: 1fr; grid-template-rows: minmax(0, 36%) minmax(0, 1fr); height: min(80svh, 680px); padding: 14px; gap: 14px; }
  .visual { order: -1; }
  .info { padding: 4px; gap: 12px; justify-content: flex-start; }
  .top .count { display: none; }
  .mid { gap: 8px; }
  h3 { font-size: clamp(1.4rem, 6vw, 1.9rem); }
  .desc { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; font-size: 0.95rem; }
  .bottom { gap: 10px; margin-top: auto; }
  .tags li:nth-child(n + 3) { display: none; }
}

/* reduced motion: a plain, readable list instead of the pinned stack */
.plain .stage { position: static; height: auto; perspective: none; overflow: visible; }
.plain .list { display: grid; gap: 32px; transform: none !important; padding-inline: var(--gutter); max-width: 1440px; margin-inline: auto; }
.plain .card { position: relative; inset: auto; margin: 0; width: 100%; height: auto; transform: none !important; }
.plain .visual { aspect-ratio: 4 / 3; }
@media (max-width: 899px) { .plain .card { grid-template-rows: auto auto; } }
</style>
