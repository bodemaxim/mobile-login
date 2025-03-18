import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import i18n from './locales/i18n'
import 'primeicons/primeicons.css'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.use(PrimeVue, {
  // Default theme configuration
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
