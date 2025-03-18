import { createI18n } from 'vue-i18n'
import enUS from './en-US'
import ruRU from './ru-RU'

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    ...enUS,
    ...ruRU
  }
})

export default i18n
