<template>
  <label class="checkbox-wrapper">
    <div class="custom-checkbox">
      <input
        type="checkbox"
        :name="name"
        class="checkbox__input"
        :checked="modelValue"
        @change="updateValue"
      />
      <div class="checkbox__box">
        <CheckIcon v-if="modelValue" class="checkbox__icon" />
      </div>
    </div>
    <span class="checkbox__label">
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid/index.js'

interface Props {
  modelValue: boolean
  name?: string
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  name: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<style scoped>
@reference "@/style.css";

.checkbox-wrapper {
  @apply flex gap-2 items-center;
}

.custom-checkbox {
  @apply relative;
}

.checkbox__input {
  @apply absolute w-0 h-0 opacity-0;
}

.checkbox__box {
  @apply w-5 h-5 rounded border border-mu-6 flex items-center justify-center bg-transparent transition-colors cursor-pointer;
}

.checkbox__input:checked ~ .checkbox__box {
  @apply bg-warning border-warning;
}

.checkbox__icon {
  @apply w-4 h-4 text-white;
}

.checkbox__label {
  @apply cursor-pointer;
}
</style>
