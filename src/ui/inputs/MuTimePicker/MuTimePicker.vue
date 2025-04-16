<template>
  <div class="mu-time-picker">
    <MuIconButton
      iconName="minus-sign"
      type="outline"
      class="mu-time-picker__btn"
      @click="decrementTime"
      aria-label="Decrease time"
    />

    <div class="mu-time-picker__time-container">
      <input
        ref="minutesInput"
        type="text"
        :value="minutes"
        :class="['mu-time-picker__input', { 'mu-time-picker__input--single': minutes < 10 }]"
        @input="handleMinutesInput"
        @keydown="handleKeyDown($event, 'minutes')"
        @focus="selectOnFocus"
        @click="selectOnFocus"
        maxlength="2"
      />
      <span class="mu-time-picker__separator">:</span>
      <input
        ref="secondsInput"
        type="text"
        :value="formatTwoDigits(seconds)"
        class="mu-time-picker__input"
        @input="handleSecondsInput"
        @keydown="handleKeyDown($event, 'seconds')"
        @focus="selectOnFocus"
        @click="selectOnFocus"
        maxlength="2"
      />
    </div>

    <MuIconButton
      iconName="plus-sign"
      type="outline"
      size="md"
      class="mu-time-picker__btn"
      @click="incrementTime"
      aria-label="Increase time"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MuIconButton from '@/ui/buttons/MuIconButton/MuIconButton.vue'

interface Props {
  modelValue?: string
  step?: number
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '0:00',
  step: 30,
})

const emit = defineEmits<Emits>()

const minutesInput = ref<HTMLInputElement | null>(null)
const secondsInput = ref<HTMLInputElement | null>(null)

const minutes = ref(parseInt(props.modelValue.split(':')[0]) || 0)
const seconds = ref(parseInt(props.modelValue.split(':')[1]) || 0)

const formatTwoDigits = (num: number): string => num.toString().padStart(2, '0')

const emitUpdate = () => {
  const timeString = `${minutes.value}:${formatTwoDigits(seconds.value)}`
  emit('update:modelValue', timeString)
  emit('change', timeString)
}

const updateTime = (totalSeconds: number) => {
  const maxSeconds = 60 * 60 // 60 minutes
  totalSeconds = Math.max(0, Math.min(totalSeconds, maxSeconds))

  minutes.value = Math.floor(totalSeconds / 60)
  seconds.value = totalSeconds % 60

  emitUpdate()
}

const getTotalSeconds = (): number => minutes.value * 60 + seconds.value

const incrementTime = () => updateTime(getTotalSeconds() + props.step)
const decrementTime = () => updateTime(getTotalSeconds() - props.step)

const handleMinutesInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  const num = parseInt(value)

  if (!isNaN(num) && num >= 0 && num <= 60) {
    minutes.value = num
    emitUpdate()
  }
}

const handleSecondsInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  const num = parseInt(value)

  if (!isNaN(num) && num >= 0 && num < 60) {
    seconds.value = num
    emitUpdate()
  }
}

const handleKeyDown = (event: KeyboardEvent, field: 'minutes' | 'seconds') => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault()
    const delta = event.key === 'ArrowUp' ? 1 : -1

    if (field === 'minutes') {
      updateTime(getTotalSeconds() + delta * 60)
    } else {
      updateTime(getTotalSeconds() + delta)
    }
  }
}

const selectOnFocus = (event: FocusEvent) => {
  const input = event.target as HTMLInputElement
  setTimeout(() => {
    input.select()
  }, 0)
}

watch(
  () => props.modelValue,
  (newValue) => {
    const [mins, secs] = newValue.split(':').map(Number)
    minutes.value = mins || 0
    seconds.value = secs || 0
  }
)

defineExpose({
  minutes,
  seconds,
})
</script>

<style>
@reference '@/style.css';

.mu-time-picker {
  @apply inline-flex items-center justify-between gap-4 bg-mu-2 rounded-full px-6 py-6;
}

.mu-time-picker__btn {
  @apply w-10 h-10 p-2;
}

.mu-time-picker__time-container {
  @apply flex items-center justify-center font-extrabold text-4xl;
}

.mu-time-picker__input {
  @apply w-[2ch] bg-transparent text-center focus:outline-none;
}

.mu-time-picker__input--single {
  @apply w-[1ch];
}

.mu-time-picker__separator {
  @apply mx-0.5;
}
</style>
