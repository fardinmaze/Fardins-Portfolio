<script setup>
import { computed } from 'vue'
import ShotFrame from '../ShotFrame.vue'
import CountUp from '../CountUp.vue'

const props = defineProps({
  project: { type: Object, required: true },
  def: { type: Object, required: true },
  n: { type: String, required: true },
})

const toArr = (v) => (v == null ? [] : Array.isArray(v) ? v : [v])
const paras = computed(() => toArr(props.project.content?.[props.def.key]))
const facts = computed(() => props.project.facts?.[props.def.key] || [])
const supplied = computed(() => props.project.visuals?.[props.def.key] || []) // [{ src, alt }]
const prob = computed(() => props.project.content?.problem || {})

const PROBLEM = [
  ['problem', 'The problem', 'Add: what was not working.'],
  ['opportunity', 'The opportunity', 'Add: why it was worth solving.'],
  ['challenge', 'The challenge', 'Add: what made it difficult.'],
]

// A visual slot: a supplied asset wins, otherwise a labelled placeholder
const asset = (i) => supplied.value[i] || {}
</script>

<template>
  <section :id="def.key" class="ps" :class="`k-${def.kind}`" :aria-labelledby="`h-${def.key}`">
    <div class="wrap">
      <header class="sh grid">
        <p class="num label accent idx">{{ n }}</p>
        <h2 :id="`h-${def.key}`" class="title" v-split="'lines'">{{ def.title }}</h2>
      </header>

      <!-- text -->
      <div v-if="def.kind === 'text'" class="body grid" v-reveal>
        <div class="txt">
          <p v-for="(t, i) in paras" :key="i" class="para">{{ t }}</p>
          <p v-if="!paras.length" class="para"><span class="tbc">[{{ def.prompt }}]</span></p>
          <ul v-if="facts.length" class="facts">
            <li v-for="f in facts" :key="f">{{ f }}</li>
          </ul>
        </div>
      </div>

      <!-- problem / opportunity / challenge -->
      <div v-else-if="def.kind === 'problem'" class="triple" v-reveal>
        <div v-for="[k, label, prompt] in PROBLEM" :key="k" class="tcell">
          <h3 class="label muted">{{ label }}</h3>
          <p v-if="prob[k]" class="para">{{ prob[k] }}</p>
          <p v-else class="para"><span class="tbc">[{{ prompt }}]</span></p>
        </div>
      </div>

      <!-- visual: full-bleed or two-up -->
      <template v-else-if="def.kind === 'visual'">
        <div v-if="paras.length" class="body grid"><div class="txt"><p v-for="(t, i) in paras" :key="i" class="para">{{ t }}</p></div></div>
        <div v-if="def.layout === 'full'" class="bleed vis-full" v-reveal>
          <ShotFrame v-bind="asset(0)" :name="project.name" :label="def.visuals[0]" ratio="21 / 9" />
        </div>
        <div v-else class="vis-two" v-reveal>
          <ShotFrame v-for="(v, i) in def.visuals" :key="i" v-bind="asset(i)" :name="project.name" :label="v" ratio="4 / 3" />
        </div>
      </template>

      <!-- process flow: horizontal on desktop, vertical on mobile -->
      <template v-else-if="def.kind === 'flow'">
        <ol class="flow" v-reveal>
          <li v-for="(s, i) in def.steps" :key="s"><i aria-hidden="true" /><span class="num label muted">0{{ i + 1 }}</span><span class="step">{{ s }}</span></li>
        </ol>
        <div class="body grid">
          <div class="txt">
            <p v-for="(t, i) in paras" :key="i" class="para">{{ t }}</p>
            <p v-if="!paras.length" class="para"><span class="tbc">[{{ def.prompt }}]</span></p>
          </div>
        </div>
      </template>

      <!-- before / after -->
      <template v-else-if="def.kind === 'compare'">
        <div class="vis-two" v-reveal>
          <figure v-for="(v, i) in def.visuals" :key="v" class="cmp">
            <ShotFrame v-bind="asset(i)" :name="project.name" :label="v.toLowerCase() + ' view'" ratio="4 / 3" />
            <figcaption class="label muted">{{ v }}</figcaption>
          </figure>
        </div>
        <div class="body grid">
          <div class="txt">
            <p v-for="(t, i) in paras" :key="i" class="para">{{ t }}</p>
            <p v-if="!paras.length" class="para"><span class="tbc">[{{ def.prompt }}]</span></p>
          </div>
        </div>
      </template>

      <!-- outcome: metrics are only shown if the project has verified ones -->
      <div v-else-if="def.kind === 'outcome'" class="body" v-reveal>
        <ul v-if="project.metrics?.length" class="metrics">
          <li v-for="m in project.metrics" :key="m.label">
            <b><CountUp :to="m.to" :decimals="m.decimals || 0" :prefix="m.prefix || ''" :suffix="m.suffix || ''" /></b>
            <span class="label muted">{{ m.label }}</span>
          </li>
        </ul>
        <p v-for="(t, i) in paras" :key="i" class="para">{{ t }}</p>
        <p v-if="!paras.length && !project.metrics?.length" class="para"><span class="tbc">[Add validated outcome here]</span></p>
        <p v-else-if="!paras.length" class="para"><span class="tbc">[Add what these numbers measure and how they were collected]</span></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ps { padding-block: clamp(48px, 7vw, 100px); border-top: 1px solid var(--line); }
.sh { align-items: baseline; margin-bottom: clamp(28px, 4vw, 56px); }
.idx { grid-column: 1 / span 1; }
.title { grid-column: 2 / span 11; font-size: clamp(2rem, 4.4vw, 3.4rem); text-transform: uppercase; }

.body { align-items: start; }
.txt { grid-column: 2 / span 7; display: flex; flex-direction: column; gap: 16px; }
.para { max-width: 34em; }
.facts { margin-top: 8px; border-top: 1px solid var(--line); }
.facts li { padding: 12px 0; border-bottom: 1px solid var(--line); color: var(--body); }

.triple { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--line); }
.tcell { padding: 24px 24px 0 0; display: flex; flex-direction: column; gap: 12px; }
.tcell + .tcell { padding-left: 24px; border-left: 1px solid var(--line); }

.vis-full { margin-top: 8px; }
.body + .vis-full { margin-top: 36px; }
.vis-two { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.cmp { display: flex; flex-direction: column; gap: 10px; }

.flow { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; border-top: 1px solid var(--line); margin-bottom: 40px; }
.flow li { position: relative; padding: 22px 12px 0 0; display: flex; flex-direction: column; gap: 6px; }
.flow i { position: absolute; top: -5px; left: 0; width: 9px; height: 9px; background: var(--bg); border: 1px solid var(--accent); }
.step { color: var(--text); font-weight: 600; letter-spacing: -0.02em; font-size: 1.05rem; line-height: 1.2; }

.metrics { display: flex; flex-wrap: wrap; gap: clamp(32px, 7vw, 96px); margin-bottom: 28px; padding-left: calc(100% / 12 + 2px); }
.metrics li { display: flex; flex-direction: column; gap: 10px; }
.metrics b { font-size: clamp(3.4rem, 9vw, 7rem); letter-spacing: -0.05em; line-height: 0.9; font-weight: 800; color: var(--text); }
.k-outcome .body > .para { margin-left: calc(100% / 12 + 2px); }

@media (max-width: 899px) {
  .idx { grid-column: 1 / -1; }
  .title { grid-column: 1 / -1; }
  .txt { grid-column: 1 / -1; }
  .triple { grid-template-columns: 1fr; }
  .tcell, .tcell + .tcell { padding: 20px 0; border-left: 0; }
  .tcell + .tcell { border-top: 1px solid var(--line); }
  .vis-two { grid-template-columns: 1fr; }
  .flow { grid-auto-flow: row; border-top: 0; border-left: 1px solid var(--line); margin-left: 4px; }
  .flow li { padding: 0 0 22px 22px; }
  .flow i { top: 4px; left: -5px; }
  .metrics { padding-left: 0; }
  .k-outcome .body > .para { margin-left: 0; }
}
</style>
