<template>
  <textarea
    ref="textareaRef"
    :value="modelValue"
    :name="name"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :rows="rows"
    :maxlength="maxLength"
    class="form-textarea"
    :class="{ 'form-textarea--error': error }"
    @input="updateValue"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  modelValue: string
  name?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  rows?: number
  maxLength?: number
  autoResize?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  placeholder: '',
  disabled: false,
  required: false,
  rows: 3,
  maxLength: undefined,
  autoResize: false,
  error: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const updateValue = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  if (props.autoResize) {
    adjustHeight()
  }
}

const adjustHeight = () => {
  if (!textareaRef.value || !props.autoResize) return
  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`
}

watch(
  () => props.modelValue,
  () => {
    if (props.autoResize) {
      adjustHeight()
    }
  }
)

onMounted(() => {
  if (props.autoResize) {
    adjustHeight()
  }
})
</script>

<style>
@reference "@/style.css";

.form-textarea {
  @apply textarea w-full rounded-lg bg-mu-1;

  &:focus,
  &:focus-within {
    @apply outline-hidden;
  }
}

.form-textarea--error {
  @apply textarea-error;
}
</style>
