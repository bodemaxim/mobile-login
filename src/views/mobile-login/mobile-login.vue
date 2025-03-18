<script setup lang="ts">
import { ref } from 'vue'
import LocaleSelect from '@/components/locale-select/localeSelect.vue'
import EnterPhone from './components/enter-phone/enter-phone.vue'
import EnterCode from './components/enter-code/enter-code.vue'
import { Steps } from './mobile-login.types'
import type { CreateSessionResponse } from '@/api/types'

const step = ref<Steps>(Steps.Step1)
const phone = ref<string>('+7')
const currentSession = ref<CreateSessionResponse | null>(null)

const onContinuePressed = (createSessionResponse: CreateSessionResponse | null) => {
  currentSession.value = createSessionResponse

  if (createSessionResponse) step.value = Steps.Step2
}

const returnToFirstStep = () => {
  step.value = Steps.Step1
}
</script>

<template>
  <div class="mobile-login-wrapper">
    <div class="mobile-login-form">
      <div class="logo">
        <img alt="самый крутой лого" :src="`images/logo.png`" style="height: 60px" />
      </div>
      <EnterPhone
        v-if="step === Steps.Step1"
        v-model="phone"
        @continue-pressed="onContinuePressed"
      />
      <EnterCode
        v-else
        :phone-number="phone"
        :sessionId="currentSession?.data.session_id"
        @back="returnToFirstStep"
      />
      <section class="footer-wrapper">
        <div class="footer">
          <LocaleSelect />
          <div class="footer-right-block">
            <a href="#">{{ $t('registrationForm.terms') }}</a>
            <a href="#">{{ $t('registrationForm.privacy') }}</a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.mobile-login-wrapper {
  width: 100%;
  height: 100%;
}

.mobile-login-form {
  display: flex;
  flex-direction: column;
  height: 594px;
  width: 500px;
  max-width: calc(100% - 20px);
  margin: 30px auto;
  border: solid lightgrey 1px;
  border-radius: 5px;
  padding: 30px;
}

.logo {
  height: 60px;
  width: 300px;
  margin: 0 auto 15px;
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
}

.phone-input {
  width: 440px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0;
}

.enter-phone {
  flex-grow: 1;
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

.footer-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.footer {
  margin-top: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 500px) {
  .footer {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
}

.footer-right-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}
</style>
