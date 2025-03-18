<script setup lang="ts">
import { InputText, Button } from 'primevue'
import { createSession } from '@/api'
import CountrySelect from '../country-select/country-select.vue'
import type { Country } from '../country-select/country-select.types'
import type { CreateSessionResponse } from '@/api/types'

const model = defineModel<string>()

const emits = defineEmits<{
  continuePressed: [value: CreateSessionResponse | null]
}>()

const onPressContinue = async () => {
  let phone = ''
  if (model.value) phone = model.value.toString()

  const response = await createSession(phone)
  emits('continuePressed', response)
}

const onCountrySelect = (value: Country) => {
  model.value = value.dial_code
}
</script>

<template>
  <h2 class="title">{{ $t('registrationForm.title') }}</h2>
  <p class="subtitle">{{ $t('registrationForm.subtitle') }}</p>
  <CountrySelect @value="onCountrySelect" />
  <InputText
    v-model="model"
    :placeholder="$t('registrationForm.phonePlaceholder')"
    class="phone-input"
  />
  <Button
    :label="$t('registrationForm.continueButtonLabel')"
    class="continue-button"
    @click="onPressContinue"
  />
</template>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
}

.registration-form {
  display: flex;
  flex-direction: column;
  height: 594px;
  width: 500px;
  margin: 0 auto;
  border: solid lightgrey 1px;
  border-radius: 5px;
  padding: 30px;
}

.logo {
  height: 40px;
  width: 300px;
  background-color: lightgrey;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title,
.subtitle {
  margin: 8px auto;
}

.country-select {
  width: 440px;
  max-width: 100%;
}

.phone-input {
  width: 440px;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0;
}

.continue-button {
  width: 100%;
  background-color: rgb(0, 94, 255);
  color: white;
  border: none;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 8px 0;
}

.continue-button:hover {
  background-color: blue;
  color: white;
}

.bottom,
.bottom-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin: 16px 0;
}

.bottom {
  justify-content: space-between;
}
</style>
