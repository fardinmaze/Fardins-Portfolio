<script setup>
import { computed } from 'vue'
import CountUp from '../CountUp.vue'
import ShotFrame from '../ShotFrame.vue'

const props = defineProps({
  sections: { type: Array, required: true },
  name: { type: String, default: '' },
})

// **bold** inside a string becomes <strong>
const bits = (s) => s.split(/\*\*(.+?)\*\*/g).map((t, i) => ({ t, b: i % 2 === 1 }))
const paras = (s) => s.split('\n\n')
// only titled sections get a number
const numbers = computed(() => {
  let n = 0
  return props.sections.map((s) => (s.title ? String(++n).padStart(2, '0') : ''))
})
</script>

<template>
  <div class="story-blocks">
    <section
      v-for="(s, i) in sections" :key="s.id" :id="s.id" class="sec"
      :aria-labelledby="s.title ? `st-${s.id}` : undefined" :aria-label="s.title ? undefined : s.aria"
    >
      <header v-if="s.title" class="sh">
        <span class="n num label accent">{{ numbers[i] }}</span>
        <h2 :id="`st-${s.id}`" v-split="'lines'">{{ s.title }}</h2>
      </header>

      <div class="blocks">
        <div v-for="(b, j) in s.blocks" :key="j" class="blk" :class="`t-${b.t}`" v-reveal>
          <!-- paragraph -->
          <p v-if="b.t === 'p'" class="p"><template v-for="(x, k) in bits(b.x)" :key="k"><strong v-if="x.b">{{ x.t }}</strong><template v-else>{{ x.t }}</template></template></p>

          <!-- short stacked lines -->
          <ul v-else-if="b.t === 'lines'" class="lines"><li v-for="l in b.x" :key="l">{{ l }}</li></ul>

          <!-- stacked questions -->
          <ul v-else-if="b.t === 'questions'" class="qs"><li v-for="q in b.x" :key="q">{{ q }}</li></ul>

          <!-- bullets -->
          <ul v-else-if="b.t === 'list'" class="list"><li v-for="l in b.x" :key="l">{{ l }}</li></ul>

          <!-- pull statement -->
          <blockquote v-else-if="b.t === 'statement'" class="st" :class="{ big: b.big }">{{ b.x }}</blockquote>

          <!-- feature grid -->
          <div v-else-if="b.t === 'features'" class="features">
            <article v-for="f in b.x" :key="f.h"><h3>{{ f.h }}</h3><p>{{ f.p }}</p></article>
          </div>

          <!-- inline flow -->
          <ol v-else-if="b.t === 'chain'" class="chain"><li v-for="c in b.x" :key="c">{{ c }}</li></ol>

          <!-- items joined by short connector text -->
          <ol v-else-if="b.t === 'connect'" class="connect">
            <li v-for="c in b.x" :key="c.b"><strong>{{ c.b }}</strong><span v-if="c.c" class="conn">{{ c.c }}</span></li>
          </ol>

          <!-- numbered steps -->
          <ol v-else-if="b.t === 'steps'" class="steps">
            <li v-for="st in b.x" :key="st.n"><span class="num label muted">{{ st.n }}</span><h3>{{ st.h }}</h3><p>{{ st.p }}</p></li>
          </ol>

          <!-- product architecture diagram -->
          <figure v-else-if="b.t === 'tree'" class="tree" :aria-label="`${b.root} leads to ${b.branches.join(', ')}, then ${b.then.join(', ')}`">
            <div class="node root" aria-hidden="true">{{ b.root }}</div>
            <div class="stem" aria-hidden="true" />
            <div class="branches" aria-hidden="true"><div v-for="x in b.branches" :key="x" class="node">{{ x }}</div></div>
            <template v-for="x in b.then" :key="x">
              <div class="stem" aria-hidden="true" />
              <div class="node wide" aria-hidden="true">{{ x }}</div>
            </template>
          </figure>

          <!-- metrics -->
          <ul v-else-if="b.t === 'metrics'" class="metrics">
            <li v-for="m in b.x" :key="m.label">
              <b><CountUp :to="m.to" :prefix="m.prefix || ''" :suffix="m.suffix || ''" /></b>
              <span class="label muted">{{ m.label }}</span>
            </li>
          </ul>

          <!-- to-do for the owner -->
          <p v-else-if="b.t === 'tbc'" class="p"><span class="tbc">[{{ b.x }}]</span></p>

          <!-- DESIGN / BUILD -->
          <div v-else-if="b.t === 'pair'" class="pair">
            <article v-for="x in b.x" :key="x.label" class="half" :class="`is-${x.cat}`">
              <p class="label tag"><i aria-hidden="true" />{{ x.label }}</p>
              <h3>{{ x.h }}</h3>
              <p v-for="(t, k) in paras(x.p)" :key="k">{{ t }}</p>
              <ol v-if="x.chain" class="chain small"><li v-for="c in x.chain" :key="c">{{ c }}</li></ol>
            </article>
          </div>

          <!-- screenshots, or a clearly marked placeholder -->
          <div v-else-if="b.t === 'figure'" class="figure">
            <template v-if="b.images">
              <figure v-for="im in b.images" :key="im.src" class="im" :class="im.span">
                <img :src="im.src" :alt="im.alt" :width="im.w" :height="im.h" loading="lazy" decoding="async" />
              </figure>
            </template>
            <div v-else class="im full"><ShotFrame :name="name" :label="b.placeholder" ratio="16 / 10" /></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sec { padding-top: clamp(40px, 5vw, 72px); }
.sh { display: flex; flex-direction: column; gap: 14px; padding-top: 28px; border-top: 1px solid var(--line); margin-bottom: 28px; }
.sh h2 { font-size: clamp(1.8rem, 2.8vw, 2.6rem); line-height: 1.02; letter-spacing: -0.04em; }
.blocks { display: flex; flex-direction: column; gap: 20px; }

.p { max-width: 38em; font-size: 1.1rem; line-height: 1.55; color: var(--body); }
.p strong { color: var(--text); font-weight: 600; }
.lines { display: flex; flex-direction: column; gap: 4px; }
.lines li { font-size: clamp(1.3rem, 2vw, 1.7rem); font-weight: 600; letter-spacing: -0.03em; line-height: 1.2; color: var(--text); }
.qs { max-width: 32em; border-top: 1px solid var(--line); }
.qs li { padding: 12px 0; border-bottom: 1px solid var(--line); font-size: 1.2rem; font-weight: 600; letter-spacing: -0.02em; color: var(--text); }
.list { display: flex; flex-direction: column; gap: 4px; max-width: 34em; }
.list li { position: relative; padding-left: 20px; font-size: 1.05rem; color: var(--text); }
.list li::before { content: ''; position: absolute; left: 0; top: 0.75em; width: 10px; height: 1px; background: var(--accent); }

.st { margin: 8px 0; padding-left: 20px; border-left: 3px solid var(--accent); font-size: clamp(1.5rem, 2.5vw, 2.2rem); font-weight: 600; line-height: 1.12; letter-spacing: -0.035em; color: var(--text); max-width: 22em; }
.st.big { font-size: clamp(2.2rem, 5vw, 4rem); line-height: 0.98; letter-spacing: -0.05em; font-weight: 800; text-transform: uppercase; max-width: 14em; }

.features { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--line); }
.features article { padding: 22px 24px 24px 0; border-bottom: 1px solid var(--line); }
.features article:nth-child(even) { padding-left: 24px; border-left: 1px solid var(--line); }
.features h3 { font-size: 1.25rem; letter-spacing: -0.02em; margin-bottom: 8px; }
.features p { font-size: 0.98rem; color: var(--muted); line-height: 1.5; }

.chain { display: flex; flex-wrap: wrap; gap: 8px 0; align-items: center; }
.chain li { padding: 8px 12px; border: 1px solid var(--line); border-radius: 4px; font-size: 0.95rem; font-weight: 500; color: var(--text); }
.chain li + li { position: relative; margin-left: 28px; }
.chain li + li::before { content: '→'; position: absolute; left: -22px; top: 50%; translate: 0 -50%; color: var(--accent); }
.chain.small li { font-size: 0.85rem; padding: 6px 10px; }

.connect { display: flex; flex-direction: column; border-left: 1px solid var(--line); margin-left: 4px; }
.connect li { position: relative; padding: 0 0 18px 22px; }
.connect li:last-child { padding-bottom: 0; }
.connect li::before { content: ''; position: absolute; left: -5px; top: 0.55em; width: 9px; height: 9px; background: var(--bg); border: 1px solid var(--accent); }
.connect strong { display: block; font-size: 1.2rem; letter-spacing: -0.02em; color: var(--text); }
.conn { display: block; margin-top: 4px; font-size: 0.92rem; color: var(--muted); }

.steps { border-top: 1px solid var(--line); }
.steps li { display: grid; grid-template-columns: 44px 150px 1fr; gap: 16px; align-items: baseline; padding: 16px 0; border-bottom: 1px solid var(--line); }
.steps h3 { font-size: 1.25rem; text-transform: uppercase; letter-spacing: -0.02em; }
.steps p { color: var(--body); font-size: 1rem; }

/* architecture */
.tree { display: flex; flex-direction: column; align-items: center; padding: 28px 16px; border: 1px solid var(--line); border-radius: var(--r); background: var(--surface); }
.node { padding: 10px 16px; border: 1px solid var(--line); border-radius: 4px; background: var(--bg); font-size: 0.95rem; font-weight: 500; color: var(--text); text-align: center; }
.node.root { border-color: var(--accent); color: var(--accent); font-weight: 600; }
.node.wide { min-width: min(100%, 280px); }
.stem { width: 1px; height: 22px; background: var(--primary); }
.branches { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; width: 100%; position: relative; padding-top: 18px; }
.branches::before { content: ''; position: absolute; top: 0; left: 12.5%; right: 12.5%; height: 1px; background: var(--primary); }
.branches .node { position: relative; }
.branches .node::before { content: ''; position: absolute; top: -18px; left: 50%; width: 1px; height: 18px; background: var(--primary); }

.metrics { display: flex; flex-wrap: wrap; gap: 24px clamp(32px, 6vw, 80px); }
.metrics li { display: flex; flex-direction: column; gap: 8px; }
.metrics b { font-size: clamp(3rem, 7vw, 5.5rem); letter-spacing: -0.05em; line-height: 0.9; font-weight: 800; color: var(--accent); }

.pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid var(--line); }
.half { display: flex; flex-direction: column; gap: 14px; padding: 28px 28px 8px 0; }
.half + .half { padding-left: 28px; border-left: 1px solid var(--line); }
.half h3 { font-size: clamp(1.6rem, 2.4vw, 2.1rem); line-height: 1.05; letter-spacing: -0.04em; }
.half p { font-size: 1rem; line-height: 1.55; color: var(--body); }
.tag { display: inline-flex; align-items: center; gap: 8px; color: var(--accent); }
.tag i { width: 8px; height: 8px; display: inline-block; }
.is-design .tag i { border: 1.5px solid var(--accent); }
.is-build .tag i { background: var(--accent); }

.figure { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-block: 12px; }
.im { margin: 0; border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; background: var(--surface); }
.im.full { grid-column: 1 / -1; }
.im img { width: 100%; height: auto; display: block; }
.im :deep(.shot) { border: 0; border-radius: 0; }

@media (max-width: 899px) {
  .features, .pair { grid-template-columns: 1fr; }
  .features article, .features article:nth-child(even) { padding: 20px 0; border-left: 0; }
  .half, .half + .half { padding: 24px 0; border-left: 0; }
  .half + .half { border-top: 1px solid var(--line); }
  .steps li { grid-template-columns: 36px 1fr; }
  .steps p { grid-column: 2; }
  .branches { grid-template-columns: 1fr 1fr; }
  .branches::before, .branches .node::before { display: none; }
  .branches { padding-top: 0; }
}
@media (max-width: 519px) { .figure { grid-template-columns: 1fr; } }
</style>
