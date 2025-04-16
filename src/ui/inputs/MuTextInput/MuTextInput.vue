<template>
  <div :id="`text-input-${id}`" class="text-input">
    <label
      v-if="labelValue"
      :id="`${id}-label`"
      :for="id"
      :class="`text-input__label ${disabled ? `text-input__label--disabled` : ''}`"
      >{{ labelValue }}</label
    >
    <div class="text-input__input-wrapper">
      <input
        v-model="inputValue"
        v-on:keypress.enter.prevent="onEnter"
        :placeholder="placeholder"
        :id="id"
        :class="[
          `text-input__input ${status ? `text-input__input--${status}` : ''}`,
          { 'text-input__input--disabled': disabled },
          { '!pl-12': showLeftIcon },
        ]"
        :name="inputName"
        :type="inputType"
        :disabled="disabled"
        autocomplete="off"
        @focus="() => emit('onFocus')"
      />
      <div v-if="showLeftIcon" class="text-input__left-icon">
        <slot name="leftIcon"></slot>
      </div>
      <div v-if="inputValue.length" class="text-input__clear-button-wrapper">
        <button class="text-input__clear-button" @click="onClear" type="reset">
          <XMarkIcon class="h-full w-full text-mu-10" />
        </button>
      </div>
    </div>
    <div
      v-if="infoMessage && infoMessage.length"
      :class="`text-input__message ${disabled ? `text-input__message--disabled` : ''}`"
    >
      {{ infoMessage }}
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ref, onUpdated, useSlots, computed, watch } from 'vue'
const props = defineProps({
  initialValue: {
    type: String,
    default: '',
  },
  labelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  inputName: {
    type: String,
    default: 'text-input',
  },
  inputType: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    default: 'text-input',
  },
  removeDefaultInputStyles: {
    type: Boolean,
    default: false,
  },
  infoMessage: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: null,
  },
})

const slots = useSlots()

const inputValue = ref('')

watch(
  () => props.initialValue,
  (newValue) => {
    inputValue.value = newValue
  },
  { immediate: true }
)

const showLeftIcon = computed(() => slots.leftIcon)

const emit = defineEmits(['onChange', 'onFocus', 'onEnter'])

const onClear = (e) => {
  e.preventDefault()
  emit('onChange', '')
  inputValue.value = ''
}

const onEnter = (e) => {
  e.preventDefault()
  emit('onEnter')
}

onUpdated(() => {
  emit('onChange', inputValue.value)
})
</script>

<style scoped>
@reference "@/style.css";

.text-input {
  @apply flex w-full flex-col relative;
}

.text-input__label {
  @apply text-sm text-mu-10 pb-2;
}

.text-input__message {
  @apply w-full text-sm/3 text-mu-9 pt-2;
}

.text-input__clear-button {
  @apply h-5 w-5 z-10 cursor-pointer mx-4 text-mu-10;
}

.text-input__left-icon {
  @apply absolute h-full w-10 flex items-center justify-end;
}

.text-input__input-wrapper {
  @apply flex w-full relative;
}

.text-input__clear-button-wrapper {
  @apply absolute right-0 h-full flex items-center justify-center;
}

.text-input__input {
  @apply border-mu-4 bg-mu-1 text-mu-10 placeholder:text-mu-7 h-10 rounded-[10px] py-2 px-4 text-sm/3 w-full border border-mu-4 focus:outline-none active:outline-none focus:ring-transparent focus:border-mu-7;
}

.text-input__input--error {
  @apply !border-error dark:!border-error border focus:outline-none active:outline-none focus:ring-transparent focus:border-error border-error;
}

.text-input__input--success {
  @apply !border-success dark:!border-success border focus:outline-none active:outline-none focus:ring-transparent focus:border-success border-success;
}

.text-input__input--disabled {
  @apply text-mu-6 border-mu-4 bg-mu-4;
}

.text-input__label--disabled {
  @apply text-mu-6;
}

.text-input__message--disabled {
  @apply text-mu-6;
}
</style>
