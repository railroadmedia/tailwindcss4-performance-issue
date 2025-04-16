<template>
  <div class="mu-pill-group">
    <MuPill
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :icon="option.icon"
      :selected="modelValue === option.value"
      :disabled="disabled"
      @select="handleSelect(option.value)"
    />
  </div>
</template>

<script setup lang="ts">
import MuPill from './MuPill.vue'

export interface PillOption {
  value: string
  label: string
  icon?: string
}

interface Props {
  modelValue: string
  options: PillOption[]
  disabled?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleSelect = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<style>
@reference "@/style.css";

.mu-pill-group {
  @apply flex flex-wrap gap-2 justify-center;
}
</style>
