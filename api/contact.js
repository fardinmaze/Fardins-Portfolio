// POST /api/contact  ->  emails the message to the site owner through Resend.
// Runs as a Vercel serverless function in production and via a dev middleware (vite.config.js) locally.
//
// Environment variables
//   RESEND_API_KEY        required. If missing the endpoint answers 503 and the form shows a mailto fallback.
//   CONTACT_TO_EMAIL      optional. Where messages go. Defaults to the address already public on the site.
//   CONTACT_FROM_EMAIL    optional. Defaults to Resend's shared sender, which can only deliver to the email
//                         address the Resend account was created with. Verify a domain to lift that limit.

const DEFAULT_TO = 'mazumder.mdfardin@gmail.com'
const LIMITS = { name: 120, email: 200, message: 4000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const clean = (v, max) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max)
const oneLine = (v, max) => clean(v, max).replace(/\s+/g, ' ') // no newlines: keeps header-style fields safe
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = null }
  }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, error: 'invalid_body' })

  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (clean(body.company, 50)) return res.status(200).json({ ok: true })

  const name = oneLine(body.name, LIMITS.name)
  const email = oneLine(body.email, LIMITS.email)
  const message = clean(body.message, LIMITS.message)

  const fields = {}
  if (name.length < 2) fields.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email)) fields.email = 'Please enter a valid email address.'
  if (message.length < 10) fields.message = 'Please write a little more (at least 10 characters).'
  if (Object.keys(fields).length) return res.status(422).json({ ok: false, error: 'validation', fields })

  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(503).json({ ok: false, error: 'not_configured' })

  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>'

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}\n`,
        html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
      }),
    })
    if (!r.ok) {
      console.error('Resend rejected the message:', r.status, await r.text().catch(() => ''))
      return res.status(502).json({ ok: false, error: 'send_failed' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact send error:', err)
    return res.status(502).json({ ok: false, error: 'send_failed' })
  }
}
