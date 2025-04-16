<template>
  <div ref="dropdownComponentRef" @click="isOpen ? closeDropdown() : openDropdown()">
    <button
      type="button"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      :aria-label="label"
      class="cursor-pointer"
      :popovertarget="`popover-${uid}`"
      :style="`anchor-name: --anchor-${uid}`"
    >
      <slot></slot>
    </button>
    <ul
      v-if="isOpen"
      class="dropdown dropdown-open menu"
      :class="dropdownPosition"
      popover
      :id="`popover-${uid}`"
      role="menu"
      :style="`position-anchor: --anchor-${uid}`"
    >
      <slot name="options" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface DropdownOption {
  label: string
  icon: string
  action: string
}

const props = defineProps({
  label: {
    type: String,
    default: 'dropdown',
  },
  options: {
    type: Array as () => DropdownOption[],
    default: () => [],
  },
  dropdownPosition: {
    type: String,
    default: 'dropdown-end',
    validator: (value: string) =>
      ['dropdown-start', 'dropdown-center', 'dropdown-end'].includes(value),
  },
})

const isOpen = ref(false)
const dropdownComponentRef = ref(null)
const { uid } = getCurrentInstance()

const addEventListeners = () => {
  const dropdownEl = dropdownComponentRef.value

  if (!dropdownEl) return

  const closestCarousel = dropdownEl.closest('.carousel') // Find the nearest carousel

  document.querySelector('main')?.addEventListener('scroll', closeDropdown)
  closestCarousel?.addEventListener('scroll', closeDropdown) // Attach to the closest one
  window.addEventListener('resize', closeDropdown)
  document.addEventListener('visibilitychange', closeDropdown)
}

const removeEventListeners = () => {
  const dropdownEl = dropdownComponentRef.value

  if (!dropdownEl) return

  const closestCarousel = dropdownEl.closest('.carousel')

  document.querySelector('main')?.removeEventListener('scroll', closeDropdown)
  closestCarousel?.removeEventListener('scroll', closeDropdown) // Remove only from the closest one
  window.removeEventListener('resize', closeDropdown)
  document.removeEventListener('visibilitychange', closeDropdown)
}

const emit = defineEmits(['onActionClick'])

const openDropdown = () => {
  isOpen.value = true
  addEventListeners()
}

const closeDropdown = () => {
  removeEventListeners()
  isOpen.value = false
}

onClickOutside(dropdownComponentRef, closeDropdown)
</script>

<style scoped>
@reference "@/style.css";

.menu {
  @apply w-52 px-0 shadow bg-mu-1 dark:bg-mu-2 rounded-lg border-0 mt-2;
}
</style>
