import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import '../style.css'
import { router } from '@/infrastructure/router'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {},
    es: {},
  },
  missing: (locale, key) => key,
})

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(i18n)


app.mount('#app')
