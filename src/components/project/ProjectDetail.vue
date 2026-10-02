<script setup>
import { computed, ref, watch } from 'vue'
import CategoryTag from '../CategoryTag.vue'
import ShotFrame from '../ShotFrame.vue'
import CountUp from '../CountUp.vue'
import StoryBlocks from './StoryBlocks.vue'

const props = defineProps({ project: { type: Object, required: true } })

// Left-column tabs: only the ones this project actually has content for.
const tabs = computed(() => {
  const p = props.project
  return [
    p.challenge && { key: 'challenge', label: 'Challenge' },
    p.result && { key: 'result', label: 'Result' },
    p.process?.length && { key: 'process', label: p.processLabel || 'Process' },
  ].filter(Boolean)
})
const active = ref('')
watch(() => props.project.slug, () => { active.value = tabs.value[0]?.key || '' }, { immediate: true })

const images = computed(() => props.project.images || [])
</script>

<template>
  <section class="pd">
    <div class="wrap layout">
      <!-- left: sticky story -->
      <aside class="story">
        <RouterLink to="/work" class="back link-arrow"><span class="arr back-arr">←</span> Back to work</RouterLink>

        <header class="head rise" style="--i: 0">
          <CategoryTag :cat="project.cat" />
          <h1>{{ project.name }}</h1>
          <p v-if="project.pageHeadline || project.headline" class="headline">{{ project.pageHeadline || project.headline }}</p>
          <p v-else class="headline"><span class="tbc">Add outcome headline</span></p>
          <template v-if="project.intro"><p v-for="t in project.intro" :key="t" class="desc">{{ t }}</p></template>
          <p v-else-if="project.description" class="desc">{{ project.description }}</p>
          <p v-else class="desc"><span class="tbc">Add one-sentence description</span></p>
        </header>

        <ul class="tags rise" style="--i: 1"><li v-for="t in project.pageTags || project.tags" :key="t">{{ t }}</li></ul>

        <dl class="meta rise" style="--i: 2">
          <div><dt class="label muted">Role</dt><dd>{{ project.role }}</dd></div>
          <div v-if="project.year"><dt class="label muted">Year</dt><dd>{{ project.year }}</dd></div>
          <div v-if="project.platform"><dt class="label muted">Platform</dt><dd>{{ project.platform }}</dd></div>
          <div v-if="project.company"><dt class="label muted">Company</dt><dd>{{ project.company }}</dd></div>
        </dl>

        <div v-if="!project.story && tabs.length" class="tabs rise" style="--i: 3">
          <div class="tablist" role="tablist" aria-label="Project details">
            <button
              v-for="t in tabs" :key="t.key" role="tab" class="tab label" :aria-selected="active === t.key"
              :id="`tab-${t.key}`" :aria-controls="`panel-${t.key}`" @click="active = t.key"
            >{{ t.label }}</button>
          </div>

          <div v-for="t in tabs" :key="t.key" v-show="active === t.key" :id="`panel-${t.key}`" role="tabpanel" :aria-labelledby="`tab-${t.key}`" class="panel">
            <p v-if="t.key === 'challenge'">{{ project.challenge }}</p>
            <template v-else-if="t.key === 'result'">
              <p>{{ project.result }}</p>
              <ul v-if="project.metrics?.length" class="metrics">
                <li v-for="m in project.metrics" :key="m.label">
                  <b><CountUp :to="m.to" :decimals="m.decimals || 0" :prefix="m.prefix || ''" :suffix="m.suffix || ''" /></b>
                  <span class="label muted">{{ m.label }}</span>
                </li>
              </ul>
            </template>
            <ul v-else class="list"><li v-for="s in project.process" :key="s">{{ s }}</li></ul>
          </div>
        </div>

        <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="visit link-arrow rise" style="--i: 4" data-cursor="OPEN">
          Visit site <span class="arr">↗</span>
        </a>
      </aside>

      <!-- right: long-form story (when a project has one) -->
      <div v-if="project.story" class="shots">
        <figure v-if="project.cover" class="shot full rise" style="--i: 3">
          <img :src="project.cover.src" :alt="project.cover.alt" :width="project.cover.w" :height="project.cover.h" decoding="async" />
        </figure>
        <div v-else class="shot full rise" style="--i: 3"><ShotFrame :name="project.name" label="hero screenshot" ratio="16 / 10" /></div>
        <StoryBlocks class="story-col" :sections="project.story" :name="project.name" />
      </div>

      <!-- right: screenshots -->
      <div v-else class="shots">
        <template v-if="images.length">
          <figure v-for="(im, i) in images" :key="im.src" class="shot" :class="im.span" v-reveal>
            <img :src="im.src" :alt="im.alt" :width="im.w" :height="im.h" :loading="i === 0 ? 'eager' : 'lazy'" decoding="async" />
          </figure>
        </template>
        <template v-else>
          <!-- no assets yet: a single clear placeholder instead of a wall of empty boxes -->
          <div class="shot full"><ShotFrame :name="project.name" label="screenshots" ratio="16 / 10" /></div>
          <div class="shot full"><ShotFrame :name="project.name" label="screenshots" ratio="16 / 10" /></div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pd { padding: calc(var(--nav-h) + 28px) 0 clamp(56px, 8vw, 112px); }
.layout { display: grid; grid-template-columns: minmax(300px, 4fr) 8fr; column-gap: clamp(32px, 4vw, 64px); align-items: start; }

.story { position: sticky; top: calc(var(--nav-h) + 24px); max-height: calc(100svh - var(--nav-h) - 48px); overflow-y: auto; display: flex; flex-direction: column; gap: 28px; padding-right: 4px; scrollbar-width: thin; }
.back { color: var(--muted); padding-bottom: 20px; border-bottom: 1px solid var(--line); }
.back:hover { color: var(--text); }
.back:hover .back-arr { transform: translateX(-5px); }
.head { display: flex; flex-direction: column; gap: 14px; }
h1 { font-size: clamp(2.2rem, 3.6vw, 3.4rem); line-height: 0.98; letter-spacing: -0.045em; text-transform: uppercase; font-weight: 800; overflow-wrap: anywhere; }
.headline { font-size: clamp(1.2rem, 1.7vw, 1.5rem); line-height: 1.15; letter-spacing: -0.03em; font-weight: 600; color: var(--text); }
.desc { color: var(--muted); font-size: 1rem; }
.tags { display: flex; flex-direction: column; gap: 2px; }
.tags li { font-size: 0.95rem; color: var(--text); padding: 3px 0 3px 12px; border-left: 2px solid var(--line); }
.meta { display: grid; gap: 10px; }
.meta > div { display: grid; grid-template-columns: 72px 1fr; gap: 12px; align-items: baseline; }
.meta dd { font-size: 0.95rem; color: var(--text); line-height: 1.35; }

.tabs { display: flex; flex-direction: column; gap: 16px; }
.tablist { display: flex; gap: 18px; border-bottom: 1px solid var(--line); }
.tab { color: var(--muted); padding: 8px 0 10px; margin-bottom: -1px; border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s; }
.tab:hover { color: var(--text); }
.tab[aria-selected='true'] { color: var(--text); border-bottom-color: var(--accent); }
.panel { font-size: 0.98rem; line-height: 1.55; color: var(--body); display: flex; flex-direction: column; gap: 18px; }
.list { display: flex; flex-direction: column; gap: 6px; }
.list li { padding-left: 14px; position: relative; }
.list li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 6px; height: 1px; background: var(--accent); }
.metrics { display: flex; flex-wrap: wrap; gap: 20px 28px; padding-top: 4px; }
.metrics li { display: flex; flex-direction: column; gap: 4px; }
.metrics b { font-size: 2rem; letter-spacing: -0.04em; line-height: 1; font-weight: 700; color: var(--accent); }
.visit { color: var(--text); align-self: flex-start; padding-bottom: 4px; border-bottom: 1px solid var(--text); }
.visit:hover { color: var(--accent); border-bottom-color: var(--accent); }

.shots { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.shot { margin: 0; border: 1px solid var(--line); border-radius: var(--r); overflow: hidden; background: var(--surface); }
.shot.full { grid-column: 1 / -1; }
.shot img { width: 100%; height: auto; display: block; }
.shot :deep(.shot) { border: 0; border-radius: 0; }
.story-col { grid-column: 1 / -1; }

@media (max-width: 899px) {
  .layout { grid-template-columns: 1fr; row-gap: 40px; }
  .story { position: static; max-height: none; overflow: visible; }
  .shots { gap: 14px; }
}
@media (max-width: 519px) { .shots { grid-template-columns: 1fr; } }
</style>
