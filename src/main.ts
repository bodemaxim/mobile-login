import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import 'primeicons/primeicons.css'
import Aura from '@primeuix/themes/aura'
import './assets/base.css'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
})

app.mount('#app')
