<template>
  <form class="mu-search-input" method="GET" ref="formRef" :action="searchFormUrl" @submit.prevent>
    <MuTextInput
      class="mu-search-input__input"
      :initialValue="modelValue"
      :showClearButton="true"
      :placeholder="placeholder"
      inputName="term"
      :id="id"
      @onChange="handleChange"
      @onEnter="handleSubmitSearch"
      @onFocus="handleFocus"
    >
      <!-- Search Icon -->
      <template #leftIcon>
        <div class="mu-search-input__left-icon" @click="handleIconClick">
          <MagnifyingGlassIcon class="h-6 w-6 text-mu-10" />
        </div>
      </template>
    </MuTextInput>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MuTextInput from '@/ui/inputs/MuTextInput/MuTextInput.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

interface Props {
  type?: 'mobile' | 'desktop'
  modelValue?: string
  searchFormUrl?: string
  placeholder?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'mobile',
  modelValue: '',
  searchFormUrl: '/',
  placeholder: 'Search',
  id: 'sidebar-search',
})

const emit = defineEmits(['search', 'update:modelValue', 'onFocus'])
const formRef = ref(null)

const handleChange = (val) => {
  emit('update:modelValue', val)
}

const handleSubmitSearch = () => {
  emit('search', props.modelValue)
}

const handleFocus = () => {
  emit('onFocus')
}

const handleIconClick = () => {
  if (props.modelValue.trim().length) {
    handleSubmitSearch()
  }
}
</script>

<style>
@reference "@/style.css";

.mu-search-input__left-icon {
  @apply cursor-pointer;
}
</style>
