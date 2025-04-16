<template>
  <label class="radio-button">
    <input
      type="radio"
      :name="name"
      class="radio-button__input"
      :value="value"
      :checked="modelValue === value"
      @change="updateValue"
    />
    <span class="radio-button__label">
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  name?: string
  label: string
  value: string | number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  name: 'radio-button',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
@reference "@/style.css";

.radio-button {
  @apply flex gap-2;
}

.radio-button__input {
  @apply appearance-none w-5 h-5 rounded-full border border-mu-6 transition-all duration-100;
}

.radio-button__input:checked {
  @apply border-warning border-6 shadow-none bg-none relative;
}

.radio-button__input:checked::after {
  @apply content-none;
}

.radio-button__label {
  @apply self-center cursor-pointer;
}
</style>
