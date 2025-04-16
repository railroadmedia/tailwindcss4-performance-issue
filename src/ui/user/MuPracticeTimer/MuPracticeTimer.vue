<template>
  <div
    class="practice-timer"
    :class="{
      'practice-timer--started': isStarted,
      'practice-timer--completed': isCompleted,
    }"
  >
    <div class="radial-progress" role="progressbar" :aria-valuenow="progressValue">
      <div class="practice-timer__time-container">
        <div class="practice-timer__time-top">
          <slot name="top"></slot>
        </div>
        <div class="practice-timer__time">{{ formattedTime }}</div>
        <div class="practice-timer__time-bottom">
          <slot name="bottom"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDateFormat } from '@vueuse/core'

interface Props {
  goalTime: string | number
  currentTime?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  goalTime: '15:00',
  currentTime: '00:00',
})

const TIME_REGEX = /^(\d{1,3}):([0-5][0-9])$/

const validateTimeFormat = (time: string): boolean => {
  return TIME_REGEX.test(time)
}

const timeToSeconds = (time: string): number => {
  if (!validateTimeFormat(time)) {
    console.warn(`Invalid time format: ${time}. Expected format: MM:SS`)
    return 0
  }

  const [minutes, seconds] = time.split(':').map((str) => parseInt(str.padStart(2, '0'), 10))
  return minutes * 60 + seconds
}

const formattedTime = computed(() => {
  if (!props.currentTime || timeToSeconds(props.currentTime.toString()) === 0) {
    return '00:00'
  }

  const [minutes, seconds] = props.currentTime
    .toString()
    .split(':')
    .map((str) => parseInt(str.padStart(2, '0'), 10))

  const date = new Date(0)
  date.setMinutes(minutes)
  date.setSeconds(seconds)

  return useDateFormat(date, minutes < 10 ? 'm:ss' : 'mm:ss').value
})

const progressValue = computed(() => {
  const { currentTime, goalTime } = props
  const isValid = (t?: string) => t && validateTimeFormat(t)
  if (![currentTime, goalTime].every(isValid)) return 0

  const currentTotal = timeToSeconds(currentTime.toString())
  const goalTotal = timeToSeconds(goalTime.toString())

  if (goalTotal === 0) return 0
  return Math.floor((currentTotal / goalTotal) * 100)
})

const normalizedProgressValue = computed(() => {
  return progressValue.value === 0
    ? 0
    : progressValue.value % 100 === 0
      ? 100
      : progressValue.value % 100
})

const isStarted = computed(() => {
  const currentTimeInSeconds = props.currentTime ? timeToSeconds(props.currentTime.toString()) : 0
  return currentTimeInSeconds > 0
})

const isCompleted = computed(() => {
  return progressValue.value >= 100
})

defineExpose({
  progressValue,
})
</script>

<style>
@reference '@/style.css';

.practice-timer {
  @apply flex items-center justify-center;

  --practice-tracker-primary-color: #ffae00;
  --practice-tracker-primary-stop-color: #d97700;

  .radial-progress {
    --value: v-bind(normalizedProgressValue);
    --size: 180px;
    --thickness: 15px;

    @apply text-[var(--practice-tracker-primary-color)] relative flex flex-col items-center justify-center;

    &:before {
      background:
        radial-gradient(farthest-side, currentColor 98%, #0000) top/var(--thickness)
          var(--thickness) no-repeat,
        conic-gradient(currentColor var(--radialprogress), #0000 0),
        conic-gradient(var(--color-mu-4) 100%, #0000 0);
    }
  }

  &.practice-timer--completed {
    .radial-progress {
      &:before {
        @apply transition-transform duration-300 ease-linear;

        background:
          radial-gradient(farthest-side, currentColor 98%, #0000) top/var(--thickness)
            var(--thickness) no-repeat,
          conic-gradient(
            currentColor 0%,
            var(--practice-tracker-primary-stop-color) 0%,
            #0000 20%,
            #0000 0
          ),
          conic-gradient(currentColor 100%, #0000 0);
        transform: rotate(calc(var(--value) * 1turn / 100));
      }
    }
  }
}

.practice-timer__time-container {
  @apply flex flex-col items-center justify-center gap-2;
  @apply w-[140px] h-[140px] rounded-full pb-1;
  @apply bg-mu-1 shadow-[0_1px_4px_rgba(0,0,0,0.1)];
}

.practice-timer__time-top {
  @apply text-mu-4;
}

.practice-timer__time {
  @apply text-4xl font-extrabold text-mu-10;
}

.practice-timer__time-bottom {
  @apply text-xs font-semibold text-mu-8;
}
</style>
