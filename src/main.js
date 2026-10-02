import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { vReveal } from './composables/reveal'
import './styles/base.css'

createApp(App).use(router).directive('reveal', vReveal).mount('#app')
