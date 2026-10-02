<script setup>
import { CATEGORIES, SPINE } from '../../data/projects'

defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <section class="ov section-tight rule" aria-labelledby="ov-title">
    <div class="wrap">
      <div class="grid">
        <div class="main" v-reveal>
          <h2 id="ov-title" class="label accent">Overview</h2>
          <p v-if="project.content.overview" class="lead">{{ project.content.overview }}</p>
          <p v-else class="lead"><span class="tbc">Add: what the product is and why it exists.</span></p>
        </div>

        <dl class="side" v-reveal="1">
          <div>
            <dt class="label muted">My role</dt>
            <dd>
              {{ project.role }}
              <span v-if="project.roleNote" class="tbc note">{{ project.roleNote }}</span>
              <span v-else class="tbc note">Add: what you personally did</span>
            </dd>
          </div>
          <div>
            <dt class="label muted">Platform</dt>
            <dd><template v-if="project.platform">{{ project.platform }}</template><span v-else class="tbc">Add platform</span></dd>
          </div>
          <div v-if="project.timeline">
            <dt class="label muted">Timeline</dt>
            <dd>{{ project.timeline }}</dd>
          </div>
          <div>
            <dt class="label muted">Scope</dt>
            <dd><ul class="tags"><li v-for="t in project.tags" :key="t" class="label">{{ t }}</li></ul></dd>
          </div>
        </dl>
      </div>

      <!-- DESIGN & BUILD pages carry the full narrative as a spine -->
      <ol v-if="project.cat === 'design-build'" class="spine" aria-label="Project narrative" v-reveal="1">
        <li v-for="(s, i) in SPINE" :key="s"><i aria-hidden="true" :class="i < 2 ? 'a' : i < 3 ? 'ab' : 'b'" /><span class="label">{{ s }}</span></li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.ov { padding-block: clamp(48px, 7vw, 96px); }
.main { grid-column: 1 / span 7; }
.lead { margin-top: 20px; font-size: clamp(1.3rem, 2.3vw, 1.9rem); line-height: 1.25; letter-spacing: -0.02em; color: var(--text); font-weight: 500; max-width: 26em; }
.side { grid-column: 9 / span 4; border-top: 1px solid var(--line); }
.side > div { padding: 14px 0; border-bottom: 1px solid var(--line); }
.side dd { margin-top: 6px; color: var(--text); font-size: 1rem; line-height: 1.4; }
.note { display: block; margin-top: 8px; width: fit-content; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tags li { padding: 5px 9px; border: 1px solid var(--line); border-radius: 4px; color: var(--body); }

.spine { display: grid; grid-template-columns: repeat(5, 1fr); margin-top: clamp(40px, 6vw, 72px); border-top: 1px solid var(--line); }
.spine li { position: relative; padding: 22px 12px 0 0; }
.spine i { position: absolute; top: -5px; left: 0; width: 9px; height: 9px; display: block; }
.spine .a { background: var(--primary); }
.spine .b { background: var(--accent); }
.spine .ab { background: linear-gradient(90deg, var(--primary) 50%, var(--accent) 50%); }
.spine span { color: var(--text); }
@media (max-width: 899px) {
  .main, .side { grid-column: 1 / -1; }
  .side { margin-top: 36px; }
  .spine { grid-template-columns: 1fr; border-top: 0; border-left: 1px solid var(--line); margin-left: 4px; }
  .spine li { padding: 0 0 20px 22px; }
  .spine i { top: 4px; left: -5px; }
}
</style>
