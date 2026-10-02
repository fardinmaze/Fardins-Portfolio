<script setup>
import { profile } from '../data/content'
</script>

<template>
  <section id="contact" class="section rule cta" aria-labelledby="contact-title">
    <div class="wrap">
      <p class="label accent" v-reveal>Have an idea?</p>
      <h2 id="contact-title" class="title" v-reveal="1">
        <span class="tl">Let's build</span>
        <span class="tl">something useful.</span>
      </h2>

      <div class="row" v-reveal="2">
        <a :href="`mailto:${profile.email}`" class="btn btn-accent big" data-cursor="OPEN">Start a conversation <span class="arr">↗</span></a>
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
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta { padding-bottom: clamp(80px, 10vw, 140px); }
.title { margin: 24px 0 clamp(48px, 7vw, 96px); font-size: clamp(2.9rem, 9.4vw, 8.2rem); line-height: 0.92; letter-spacing: -0.05em; text-transform: uppercase; font-weight: 800; }
.tl { display: block; }
.row { display: flex; flex-wrap: wrap; gap: 40px 64px; align-items: flex-end; justify-content: space-between; }
.big { padding: 20px 28px; font-size: 13px; }
.info { display: flex; gap: 56px; flex-wrap: wrap; }
.info dd { margin-top: 6px; font-size: 1.15rem; }
.ulink { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size 0.3s var(--ease), color 0.2s; padding-bottom: 2px; }
.ulink:hover { color: var(--accent); background-size: 100% 1px; }
</style>
