<template>
  <dialog :class="['base-modal', { 'modal-open': isVisible }]">
    <div
      :class="[
        'base-modal__box modal-box',
        {
          'max-w-sm': size === 'sm',
          'max-w-md': size === 'md',
          'max-w-lg': size === 'lg',
        },
      ]"
      :style="{ scale }"
    >
      <!-- Modal Header -->
      <header class="base-modal__header">
        <div class="base-modal__header-content">
          <h3 v-if="title" class="base-modal__header-title">{{ title }}</h3>
          <MuCloseButton class="base-modal__header-close-btn" @click="handleClose" />
        </div>
      </header>

      <!-- Modal Content -->
      <div class="base-modal__content">
        <div v-if="$slots.top" class="base-modal__content-top">
          <slot name="top" />
          <!-- Fixed top content -->
        </div>
        <div class="base-modal__content-body">
          <slot />
          <!-- Scrollable content -->
        </div>
        <div v-if="$slots.footer" class="base-modal__content-footer">
          <slot name="footer" />
          <!-- Fixed bottom content -->
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop" @click="handleClose">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MuCloseButton from '@/ui/buttons/MuCloseButton/MuCloseButton.vue'

interface Props {
  isOpen?: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg'
  scale?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  title: '',
  scale: 1,
})

const emit = defineEmits(['close'])
const isVisible = ref(false)

// Watch for isOpen changes
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      // When opening, use double requestAnimationFrame for smooth animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isVisible.value = true
        })
      })
    } else {
      // When closing, immediately set isVisible to false
      isVisible.value = false
    }
  },
  { immediate: true }
)

const handleClose = () => {
  emit('close')
}
</script>

<style>
@reference "@/style.css";

.base-modal {
  @apply modal modal-bottom sm:modal-middle;
}

.base-modal__box {
  @apply flex flex-col max-h-[calc(100vh-3rem)] p-0 bg-mu-1;
  transition:
    translate 0.3s ease-out,
    scale 0.2s ease-out,
    opacity 0.2s ease-out 0.05s,
    box-shadow 0.3s ease-out;
}

.base-modal__header {
  @apply flex-none pt-8 px-8;
}

.base-modal__header-content {
  @apply flex items-center justify-between relative;
}

.base-modal__header-title {
  @apply font-extrabold text-lg mb-2 mr-8 empty:hidden;
}

.base-modal__header-close-btn {
  @apply absolute -right-2 -top-2;
}

.base-modal__content {
  @apply flex flex-col flex-1 min-h-0 pb-8; /* min-h-0 is crucial here */
}

.base-modal__content-top {
  @apply flex-none px-8;
}

.base-modal__content-body {
  @apply flex-1 overflow-y-auto min-h-0 px-8;
}

.base-modal__content-footer {
  @apply flex-none px-8;
}

/* TODO: Incapsulate in a UI component */
.btn-modal {
  @apply btn rounded-full w-full text-base tracking-wider font-bebas;

  --btn-color: var(--color-mu-10);
  --btn-fg: var(--color-mu-1);
  --btn-border: var(--color-mu-10);
  --btn-shadow: #0000;

  &:is(:disabled, [disabled], .btn-disabled) {
    &:not(.btn-link, .btn-ghost) {
      @apply bg-mu-10/70 text-mu-1/70;
    }
  }
}

/* TODO: Incapsulate in a UI component */
.btn-modal-outline {
  @apply btn btn-outline rounded-full w-full text-base tracking-wider font-bebas;

  --btn-fg: var(--color-mu-10);
  --btn-border: var(--color-mu-10);
  --btn-shadow: #0000;

  &:is(:disabled, [disabled], .btn-disabled) {
    @apply text-mu-10/70 border-mu-10/70;
  }
}
</style>
