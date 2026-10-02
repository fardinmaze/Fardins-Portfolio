<script setup>
// Product visual. Pass `src` + `alt` for a real asset; without it a clearly marked placeholder renders.
defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  index: { type: String, default: '' },
  name: { type: String, default: '' },
  label: { type: String, default: '' },
  ratio: { type: String, default: '16 / 10' },
})
</script>

<template>
  <div class="shot" :style="{ aspectRatio: ratio }">
    <div class="media">
      <img v-if="src" :src="src" :alt="alt" loading="lazy" decoding="async" />
      <div v-else class="ph" role="img" :aria-label="`Placeholder: ${label || 'screenshot'} for ${name}`">
        <span v-if="index" class="big num" aria-hidden="true">{{ index }}</span>
        <span class="tag label" aria-hidden="true"><span class="tbc">Placeholder — add {{ label || 'screenshot' }}</span></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shot { position: relative; overflow: hidden; border: 1px solid var(--line); border-radius: var(--r); background: var(--surface); }
.media { position: absolute; inset: 0; transition: transform 0.7s var(--ease); }
img { width: 100%; height: 100%; object-fit: cover; }
.ph {
  position: absolute; inset: 0;
  background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 48px 48px; background-position: -1px -1px;
}
.big { position: absolute; right: 5%; bottom: 2%; font-size: clamp(6rem, 18vw, 16rem); font-weight: 800; letter-spacing: -0.06em; line-height: 0.8; color: var(--surface-2); }
.tag { position: absolute; left: 20px; top: 20px; }
:global(.hoverable:hover) .media { transform: scale(1.03); }
@media (prefers-reduced-motion: reduce) { .media { transition: none; } :global(.hoverable:hover) .media { transform: none; } }
</style>
