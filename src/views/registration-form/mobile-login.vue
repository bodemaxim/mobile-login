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
  <div class="wrapper">
    <div class="registration-form">
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
      <div class="footer-wrapper">
        <div class="footer">
          <LocaleSelect />
          <div class="footer-right">
            <div>
              <a href="#">{{ $t('registrationForm.terms') }}</a>
            </div>
            <div>
              <a href="#">{{ $t('registrationForm.privacy') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  max-width: calc(100% - 20px);
  margin: 0 auto;
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
  /* Вы можете изменить 600px на нужное вам значение */
  .footer {
    flex-direction: column; /* Изменяем направление на столбик */
    align-items: flex-start; /* Выравниваем элементы по началу (слева) */
    justify-content: flex-start; /* Выравниваем элементы по началу (сверху) */
  }
}

.footer-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}
</style>
