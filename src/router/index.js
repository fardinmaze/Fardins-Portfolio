import { createRouter, createWebHistory } from 'vue-router'
import { bySlug, CATEGORIES } from '../data/projects'

const SITE = 'Fardin Mazumder'
const HOME_DESC = 'Product Analyst & Designer working across product strategy, UX/UI design, and AI-assisted product development.'

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/HomePage.vue'), meta: { title: `${SITE} — Product Analyst & Designer`, description: HOME_DESC } },
  { path: '/contact', name: 'contact', component: () => import('../pages/ContactPage.vue'), meta: { title: `Contact — ${SITE}`, description: 'Get in touch with Fardin Mazumder, Product Analyst & Designer. Send a message or book a call.' } },
  { path: '/work', name: 'work', component: () => import('../pages/WorkIndexPage.vue'), meta: { title: `Work — ${SITE}`, description: 'Design, Build, and Design & Build projects by Fardin Mazumder, Product Analyst & Designer.' } },
  {
    path: '/work/:slug',
    name: 'project',
    component: () => import('../pages/ProjectPage.vue'),
    beforeEnter: (to) => (bySlug(to.params.slug) ? true : { name: 'notfound', params: { pathMatch: to.path.slice(1).split('/') }, replace: true }),
  },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('../pages/NotFoundPage.vue'), meta: { title: `Page not found — ${SITE}`, description: HOME_DESC } },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 68, behavior: 'smooth' }
    if (to.name === from.name && to.name === 'work') return false // keep position when filtering
    return { top: 0 }
  },
})

function setTag(selector, create, attrs, content) {
  let el = document.head.querySelector(selector)
  if (!el) { el = document.createElement(create); Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v)); document.head.appendChild(el) }
  el.setAttribute(content.attr, content.value)
}

export function setMeta({ title, description }) {
  document.title = title
  const url = window.location.origin + window.location.pathname
  setTag('meta[name="description"]', 'meta', { name: 'description' }, { attr: 'content', value: description })
  setTag('meta[property="og:title"]', 'meta', { property: 'og:title' }, { attr: 'content', value: title })
  setTag('meta[property="og:description"]', 'meta', { property: 'og:description' }, { attr: 'content', value: description })
  setTag('meta[property="og:url"]', 'meta', { property: 'og:url' }, { attr: 'content', value: url })
  setTag('meta[name="twitter:title"]', 'meta', { name: 'twitter:title' }, { attr: 'content', value: title })
  setTag('meta[name="twitter:description"]', 'meta', { name: 'twitter:description' }, { attr: 'content', value: description })
  setTag('link[rel="canonical"]', 'link', { rel: 'canonical' }, { attr: 'href', value: url })
}

router.afterEach((to) => {
  if (to.name === 'project') {
    const p = bySlug(to.params.slug)
    if (!p) return
    setMeta({
      title: `${p.name}${p.headline ? ` — ${p.headline}` : ''} · ${SITE}`,
      description: p.description || `${p.name}: a ${CATEGORIES[p.cat].label} project by ${SITE}, Product Analyst & Designer.`,
    })
  } else if (to.meta?.title) {
    setMeta(to.meta)
  }
})
