<script setup>
import { profile } from '../data/content'
import ContactForm from '../components/ContactForm.vue'
</script>

<template>
  <section class="cp" aria-labelledby="contact-title">
    <div class="wrap">
      <p class="label accent rise" style="--i: 0">Have an idea?</p>
      <h1 id="contact-title" class="title" v-split="'tilt-lines'">
        <span class="tl">Let's build</span>
        <span class="tl">something useful.</span>
      </h1>

      <div class="grid body">
        <aside class="side" v-reveal>
          <dl class="info">
            <div>
              <dt class="label muted">Email</dt>
              <dd><a class="ulink" :href="`mailto:${profile.email}`">{{ profile.email }}</a></dd>
            </div>
            <div>
              <dt class="label muted">Call</dt>
              <dd><a class="ulink" :href="profile.calendly" target="_blank" rel="noopener">Book 15 minutes ↗</a></dd>
            </div>
          </dl>
        </aside>

        <div class="formcol" v-reveal="1">
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cp { padding: calc(var(--nav-h) + clamp(48px, 7vw, 96px)) 0 clamp(80px, 10vw, 140px); }
.title { margin: 24px 0 clamp(48px, 7vw, 96px); font-size: clamp(2.9rem, 9.4vw, 8.2rem); line-height: 0.92; letter-spacing: -0.05em; text-transform: uppercase; font-weight: 800; }
.tl { display: block; }
.body { row-gap: 56px; align-items: start; border-top: 1px solid var(--line); padding-top: clamp(32px, 4vw, 56px); }
.side { grid-column: 1 / span 4; }
.formcol { grid-column: 6 / span 7; }
.info { display: flex; flex-direction: column; gap: 32px; }
.info dd { margin-top: 6px; font-size: 1.15rem; }
.ulink { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size 0.3s var(--ease), color 0.2s; padding-bottom: 2px; }
.ulink:hover { color: var(--accent); background-size: 100% 1px; }
@media (max-width: 899px) { .side, .formcol { grid-column: 1 / -1; } }
</style>
