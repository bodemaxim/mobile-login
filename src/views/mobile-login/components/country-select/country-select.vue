<script setup lang="ts">
import { ref } from 'vue'
import { IftaLabel, Select } from 'primevue'
import { countriesData, defaultCountry } from './country-select.consts'
import type { Country } from './country-select.types'

const selectedCountry = ref<Country>(defaultCountry)
const countries = ref<Country[]>(countriesData)

const emits = defineEmits<{
  value: [country: Country]
}>()

const update = (modelValue: Country) => {
  emits('value', modelValue)
}
</script>

<template>
  <IftaLabel class="country-select">
    <Select
      v-model="selectedCountry"
      :options="countries"
      filter
      :filter-placeholder="$t('registrationForm.countrySearchPlaceholder')"
      optionLabel="name"
      :placeholder="$t('registrationForm.countrySelectPlaceholder')"
      class="country-input"
      id="country"
      @update:model-value="update"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="value">
          <img
            :alt="slotProps.value.name"
            :src="`images/country-flags/${slotProps.value.code.toLowerCase()}.svg`"
            style="width: 18px"
          />
          <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="option">
          <div class="option-left-block">
            <img
              :alt="slotProps.option.name"
              :src="`images/country-flags/${slotProps.option.code.toLowerCase()}.svg`"
              style="width: 18px"
            />
            <div>{{ slotProps.option.name }}</div>
          </div>
          <p class="options-right-block">{{ slotProps.option.dial_code }}</p>
        </div>
      </template>
    </Select>
    <label for="country" class="country-label"
      >{{ $t('registrationForm.countrySelectLabel') }}
    </label>
  </IftaLabel>
</template>

<style scoped>
.country-input {
  width: 440px;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0;
}

.value,
.option-left-block {
  display: flex;
  align-items: center;
  gap: 12px;
  line-height: 18px;
  padding: 0;
  margin: 0;
}

.option {
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

.country-label {
  color: #94a3b8;
  position: absolute;
  background-color: white;
  top: 0px;
  left: 10px;
  padding: 2px;
}
</style>

<style>
/** Не лучший вариант редактирования библиотечных стилей, :deep не сработал.
PrimeVue дает инструмент редактирования стилей через создание пресета,
не успел реализовать */

.country-input > .p-select {
  height: 36px;
}

.country-input > span.p-select-label.p-placeholder,
.country-input > span.p-select-label {
  padding: 0;
}
</style>
