<template>
  <select
    :value="modelValue"
    :name="name"
    :disabled="disabled"
    :required="required"
    class="form-select"
    :class="{ 'form-select--error': error }"
    @change="updateValue"
  >
    <option v-if="placeholder" value="" disabled selected>
      {{ placeholder }}
    </option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface Option {
  value: string | number
  label: string
}

interface Props {
  modelValue: string | number
  name?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  options: Option[]
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  placeholder: '',
  disabled: false,
  required: false,
  error: '',
  options: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<style>
@reference "@/style.css";

.form-select {
  @apply select w-full rounded-lg bg-mu-1;

  &:focus,
  &:focus-within {
    @apply outline-hidden;
  }
}

.form-select--error {
  @apply select-error;
}
</style>
