import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// Serves /api/contact during `npm run dev` with the same handler Vercel runs in production.
function devApi(env) {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        let raw = ''
        req.on('data', (c) => { raw += c; if (raw.length > 1e5) req.destroy() })
        req.on('end', async () => {
          Object.assign(process.env, env)
          try { req.body = raw ? JSON.parse(raw) : {} } catch { req.body = null }
          res.status = (code) => { res.statusCode = code; return res }
          res.json = (obj) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)) }
          try {
            const { default: handler } = await server.ssrLoadModule('/api/contact.js')
            await handler(req, res)
          } catch (e) {
            console.error(e)
            res.status(500).json({ ok: false, error: 'server_error' })
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // reads .env / .env.local so the key works locally
  return { plugins: [vue(), devApi(env)] }
})
