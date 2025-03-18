<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { format, addSeconds, startOfMinute } from 'date-fns'

defineProps({
  timerOn: Boolean
})

const emits = defineEmits<{
  timerOff: []
}>()

const initialTime = 30
const remainingTime = ref(initialTime)
const remainingTimeText = ref('0:30')
const isRunning = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const formatTime = (time: number): string => {
  const date = startOfMinute(new Date(0))
  const updatedDate = addSeconds(date, time)
  return format(updatedDate, 'm:ss')
}

const startTimer = () => {
  if (isRunning.value) return

  isRunning.value = true
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
      remainingTimeText.value = formatTime(remainingTime.value)
    } else {
      clearInterval(timer!)
      isRunning.value = false
      emits('timerOff')
    }
  }, 1000)
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  isRunning.value = false
  remainingTime.value = initialTime
  console.log('stop')
}

onMounted(() => startTimer())

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <p>{{ remainingTimeText }}</p>
</template>
