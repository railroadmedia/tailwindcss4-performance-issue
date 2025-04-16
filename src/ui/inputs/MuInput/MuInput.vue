<template>
  <input
    :type="type"
    :value="modelValue"
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :maxlength="maxLength"
    :minlength="minLength"
    class="form-input"
    :class="{ 'form-input--error': error }"
    @input="updateValue"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  name?: string
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
  required?: boolean
  maxLength?: number
  minLength?: number
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  name: '',
  placeholder: '',
  disabled: false,
  required: false,
  maxLength: undefined,
  minLength: undefined,
  error: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style>
@reference "@/style.css";

.form-input {
  @apply input w-full rounded-lg bg-mu-1;

  &:focus,
  &:focus-within {
    @apply outline-hidden;
  }
}

.form-input--error {
  @apply input-error;
}
</style>
