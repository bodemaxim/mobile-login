<script setup lang="ts">
import { ref } from 'vue'
import { Select } from 'primevue'
import { useI18n } from 'vue-i18n'
import { localesList, defaultLocale } from '@/locales/consts'
import type { Locale } from '@/locales/types'

const selectedLanguage = ref<Locale>(defaultLocale)
const languages = ref<Locale[]>(localesList)

const { locale } = useI18n()

const switchLocale = () => {
  locale.value = selectedLanguage.value.value
}
</script>

<template>
  <Select
    v-model="selectedLanguage"
    :options="languages"
    optionLabel="name"
    @update:model-value="switchLocale"
  />
</template>
