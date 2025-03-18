<script setup lang="ts">
import { ref } from 'vue'
import { IftaLabel, Select, InputMask, Button } from 'primevue'
import { type WayToGetCode } from './enter-code.types'
import { defaultWayToGetCode, waysToGetCode } from './enter-code.consts'
import { checkCode, sendCode } from '@/api'
import CodeReenterTimer from '../code-reenter-timer/code-reenter-timer.vue'

const props = defineProps({
  phoneNumber: String,
  sessionId: String
})

const emits = defineEmits<{
  back: []
}>()

const code = ref<string>('')

const selectedWayToGetCode = ref<WayToGetCode>(defaultWayToGetCode)

const isTimerOn = ref<boolean>(false)
const isSendVisible = ref<boolean>(true)

const submitCode = async () => {
  if (!props.sessionId) return

  const response = await checkCode(props.sessionId, code.value)
  if (!response?.success) {
    isTimerOn.value = true
    isSendVisible.value = false
  }
}

const switchOffTimer = () => {
  isTimerOn.value = false
  isSendVisible.value = true
}

const sendAgain = async () => {
  if (!props.sessionId) return

  await sendCode(props.sessionId, selectedWayToGetCode.value.value)
}

const goBack = () => {
  emits('back')
}
</script>

<template>
  <h2 class="title">{{ $t('registrationForm.enterCode') }}</h2>
  <p class="subtitle">{{ $t('registrationForm.sentToNumber') }} {{ phoneNumber }}</p>
  <IftaLabel>
    <Select
      v-model="selectedWayToGetCode"
      :options="waysToGetCode"
      optionLabel="name"
      class="way-select"
      id="way"
    >
      <template #value="slotProps">
        <div class="selected-value">
          {{ slotProps.value.name }}
        </div>
      </template>
      <template #option="slotProps">
        <div class="select-option">
          {{ slotProps.option.name }}
        </div>
      </template>
    </Select>
    <label for="way" class="way-label">{{ $t('registrationForm.wayToGetCode') }} </label>
  </IftaLabel>
  <div class="input-mask-wrapper">
    <InputMask
      v-model="code"
      mask="9999"
      :placeholder="$t('registrationForm.enterCode')"
      class="phone-input"
    />
    <CodeReenterTimer
      v-if="isTimerOn"
      :timerOn="isTimerOn"
      class="timer"
      @timer-off="switchOffTimer"
    />
    <p v-if="isSendVisible" class="send-again" @click="sendAgain">Отправить</p>
  </div>
  <div class="buttons-container">
    <Button
      icon="pi pi-arrow-left"
      iconPos="left"
      label="Назад"
      class="back-button"
      @click="goBack"
    />
    <Button label="$t('registrationForm.continue')" class="continue-button" @click="submitCode" />
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
}

.phone-input {
  width: 440px;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0;
}

.buttons-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.continue-button-wrapper {
  flex-grow: 1;
}

.continue-button {
  width: 50%;
  height: 36px;
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

.back-button {
  width: 50%;
  height: 36px;
  background-color: white;
  color: black;
  border: none;
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
.way-select {
  width: 440px;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0;
}

.selected-value,
.select-option {
  display: flex;
  align-items: center;
  gap: 12px;
}

.select-option {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  height: 32px;
  width: 100%;
  padding: 0 8px;
}

.options-right-block {
  font-weight: bold;
}

.way-label {
  position: absolute;
  top: 0px;
  left: 10px;
  background-color: white;
  padding: 0 5px;
  color: #94a3b8;
}

.input-mask-wrapper {
  position: relative;
}

.timer {
  position: absolute;
  right: 10px;
  top: 2px;
}

.send-again {
  position: absolute;
  right: 10px;
  top: 12px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>

<style>
/** Не лучший вариант редактирования библиотечных стилей, :deep не сработал.
PrimeVue дает инструмент редактирования стилей через создание пресета,
не успел реализовать */

.way-select > .p-select {
  height: 36px;
}

.way-select > span.p-select-label.p-placeholder,
.way-select > span.p-select-label {
  padding: 0;
}
</style>
