<script setup>
import { positioning as p } from '../data/content'
import CategoryTag from './CategoryTag.vue'
</script>

<template>
  <section id="positioning" class="section" aria-labelledby="pos-title">
    <div class="wrap">
      <p class="label accent" v-reveal>How I work on projects</p>
      <h2 id="pos-title" class="h-section title" v-reveal="1">
        <span v-for="l in p.title" :key="l" class="tl">{{ l }}</span>
      </h2>

      <div class="two">
        <!-- DESIGN -->
        <article class="block design" v-reveal="0">
          <CategoryTag cat="design" />
          <h3>{{ p.design.headline }}</h3>
          <p class="text">{{ p.design.text }}</p>
          <ul class="tags"><li v-for="t in p.design.tags" :key="t" class="label">{{ t }}</li></ul>
          <div class="think">
            <p class="label muted">I think about</p>
            <p>{{ p.design.thinkAbout.join(' · ') }}</p>
          </div>
          <RouterLink :to="{ path: '/work', query: { category: 'design' } }" class="link-arrow">Design projects <span class="arr">→</span></RouterLink>
        </article>

        <!-- BUILD -->
        <article class="block build" v-reveal="1">
          <CategoryTag cat="build" />
          <h3>{{ p.build.headline }}</h3>
          <p class="text">{{ p.build.text }}</p>
          <ul class="tags"><li v-for="t in p.build.tags" :key="t" class="label">{{ t }}</li></ul>
          <div class="think">
            <p class="label muted">Idea → Design → Working product</p>
            <p>{{ p.statement }}</p>
          </div>
          <RouterLink :to="{ path: '/work', query: { category: 'build' } }" class="link-arrow">Build projects <span class="arr">→</span></RouterLink>
        </article>
      </div>

      <!-- DESIGN & BUILD: the bridge -->
      <article class="bridge" v-reveal="1">
        <div class="bar" aria-hidden="true"><i class="a" /><i class="b" /></div>
        <div class="bgrid">
          <div>
            <CategoryTag cat="design-build" />
            <h3>{{ p.both.headline }}</h3>
          </div>
          <div>
            <p class="text">{{ p.both.text }}</p>
            <ul class="tags"><li v-for="t in p.both.tags" :key="t" class="label">{{ t }}</li></ul>
            <RouterLink :to="{ path: '/work', query: { category: 'design-build' } }" class="link-arrow">Design &amp; Build projects <span class="arr">→</span></RouterLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.title { margin: 20px 0 clamp(40px, 6vw, 80px); font-size: clamp(2.5rem, 6vw, 4.8rem); }
.tl { display: block; }
.two { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--line); }
.block { display: flex; flex-direction: column; gap: 20px; padding: 36px 36px 40px 0; }
.block + .block { padding-left: 36px; border-left: 1px solid var(--line); }
.block.design { box-shadow: inset 0 2px 0 -0px var(--primary); }
.block.build { box-shadow: inset 0 2px 0 -0px var(--accent); }
h3 { font-size: clamp(1.9rem, 3.4vw, 2.8rem); letter-spacing: -0.04em; line-height: 1.02; }
.text { max-width: 30em; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tags li { padding: 7px 10px; border: 1px solid var(--line); border-radius: 4px; color: var(--body); }
.think { padding-top: 18px; border-top: 1px solid var(--line); display: flex; flex-direction: column; gap: 6px; color: var(--body); font-size: 0.98rem; }
.link-arrow { align-self: flex-start; color: var(--text); margin-top: auto; }

.bridge { position: relative; border: 1px solid var(--line); border-radius: var(--r); background: var(--surface); padding: clamp(28px, 4vw, 48px); }
.bar { position: absolute; inset: 0 0 auto 0; height: 3px; display: flex; }
.bar i { flex: 1; }
.bar .a { background: var(--primary); }
.bar .b { background: var(--accent); }
.bgrid { display: grid; grid-template-columns: 5fr 6fr; gap: 24px 64px; align-items: start; }
.bgrid > div { display: flex; flex-direction: column; gap: 20px; }

@media (max-width: 899px) {
  .two { grid-template-columns: 1fr; }
  .block, .block + .block { padding: 32px 0; border-left: 0; }
  .block + .block { border-top: 1px solid var(--line); }
  .bgrid { grid-template-columns: 1fr; }
}
</style>
