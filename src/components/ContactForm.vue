<script setup>
import { reactive, ref, nextTick } from 'vue'
import { profile } from '../data/content'

const form = reactive({ name: '', email: '', message: '', company: '' }) // `company` is the honeypot
const errors = reactive({ name: '', email: '', message: '' })
const status = ref('idle') // idle | sending | sent | error | unavailable
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate() {
  errors.name = form.name.trim().length < 2 ? 'Please enter your name.' : ''
  errors.email = EMAIL_RE.test(form.email.trim()) ? '' : 'Please enter a valid email address.'
  errors.message = form.message.trim().length < 10 ? 'Please write a little more (at least 10 characters).' : ''
  return !errors.name && !errors.email && !errors.message
}

async function submit() {
  if (status.value === 'sending') return
  if (!validate()) {
    await nextTick() // wait for aria-invalid to reach the DOM, then move focus to the first problem
    document.querySelector('.field [aria-invalid="true"]')?.focus()
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.ok) {
      status.value = 'sent'
      return
    }
    if (res.status === 422 && data.fields) {
      Object.assign(errors, { name: '', email: '', message: '' }, data.fields)
      status.value = 'idle'
      return
    }
    status.value = res.status === 503 ? 'unavailable' : 'error'
  } catch {
    status.value = 'error'
  }
}

function reset() {
  Object.assign(form, { name: '', email: '', message: '', company: '' })
  status.value = 'idle'
}
</script>

<template>
  <div class="cf">
    <div v-if="status === 'sent'" class="done" role="status">
      <p class="label accent">Message sent</p>
      <h3>Thanks, {{ form.name.trim().split(' ')[0] }}.</h3>
      <p>Your message is in my inbox. I'll reply to {{ form.email.trim() }}.</p>
      <button type="button" class="link-arrow" @click="reset">Send another <span class="arr">→</span></button>
    </div>

    <form v-else novalidate @submit.prevent="submit" aria-label="Contact form">
      <div class="field">
        <label for="cf-name" class="label">Name</label>
        <input id="cf-name" v-model="form.name" name="name" type="text" autocomplete="name" required maxlength="120"
          :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'cf-name-err' : undefined" />
        <p v-if="errors.name" id="cf-name-err" class="err">{{ errors.name }}</p>
      </div>

      <div class="field">
        <label for="cf-email" class="label">Email</label>
        <input id="cf-email" v-model="form.email" name="email" type="email" autocomplete="email" required maxlength="200"
          :aria-invalid="!!errors.email" :aria-describedby="errors.email ? 'cf-email-err' : undefined" />
        <p v-if="errors.email" id="cf-email-err" class="err">{{ errors.email }}</p>
      </div>

      <div class="field">
        <label for="cf-message" class="label">Message</label>
        <textarea id="cf-message" v-model="form.message" name="message" rows="6" required maxlength="4000"
          :aria-invalid="!!errors.message" :aria-describedby="errors.message ? 'cf-message-err' : undefined" />
        <p v-if="errors.message" id="cf-message-err" class="err">{{ errors.message }}</p>
      </div>

      <!-- honeypot: hidden from people and assistive tech, bots fill it in -->
      <div class="hp" aria-hidden="true">
        <label>Company <input v-model="form.company" name="company" type="text" tabindex="-1" autocomplete="off" /></label>
      </div>

      <div class="actions">
        <button class="btn btn-accent" type="submit" :disabled="status === 'sending'" data-cursor="SEND">
          {{ status === 'sending' ? 'Sending…' : 'Send message' }} <span class="arr">↗</span>
        </button>
        <p class="note muted">Goes straight to my inbox.</p>
      </div>

      <p v-if="status === 'error'" class="alert" role="alert">
        Something went wrong and your message was not sent. Please try again, or email
        <a :href="`mailto:${profile.email}`" class="ulink">{{ profile.email }}</a> directly.
      </p>
      <p v-if="status === 'unavailable'" class="alert" role="alert">
        The form is not connected to email yet. Please email
        <a :href="`mailto:${profile.email}`" class="ulink">{{ profile.email }}</a> directly.
      </p>
    </form>
  </div>
</template>

<style scoped>
form { display: flex; flex-direction: column; gap: 28px; }
.field { display: flex; flex-direction: column; gap: 10px; }
.field .label { color: var(--muted); }
input, textarea {
  width: 100%; font: inherit; font-size: clamp(1.15rem, 1.8vw, 1.5rem); letter-spacing: -0.01em; color: var(--text);
  background: transparent; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; padding: 10px 0 14px;
  transition: border-color 0.25s;
}
textarea { resize: vertical; min-height: 9em; line-height: 1.4; }
input::placeholder, textarea::placeholder { color: var(--muted); }
input:hover, textarea:hover { border-bottom-color: var(--primary); }
input:focus-visible, textarea:focus-visible { outline: 0; border-bottom-color: var(--accent); box-shadow: 0 1px 0 var(--accent); }
[aria-invalid='true'] { border-bottom-color: #ff6b5e; }
.err { color: #ff8a80; font-size: 0.9rem; }

.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 4px; }
.btn { padding: 18px 26px; font-size: 13px; }
.btn:disabled { opacity: 0.6; cursor: progress; transform: none; }
.note { font-size: 0.9rem; }
.alert { padding: 14px 16px; border: 1px solid var(--line); border-left: 3px solid #ff6b5e; border-radius: 4px; color: var(--text); font-size: 1rem; }
.ulink { text-decoration: underline; text-underline-offset: 3px; }
.ulink:hover { color: var(--accent); }

.done { display: flex; flex-direction: column; gap: 16px; padding: clamp(24px, 4vw, 40px); border: 1px solid var(--line); border-radius: var(--r); background: var(--surface); }
.done h3 { font-size: clamp(2rem, 4vw, 3rem); text-transform: uppercase; }
.done .link-arrow { align-self: flex-start; color: var(--text); }
</style>
