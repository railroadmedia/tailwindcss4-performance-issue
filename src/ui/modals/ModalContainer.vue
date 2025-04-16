<template>
  <Teleport to="body">
    <TransitionGroup name="modal">
      <div
        v-for="(modal, index) in activeModals"
        :key="modal.id"
        class="modal-wrapper"
        :style="{ zIndex: modal.zIndex }"
      >
        <component
          :is="modal.component"
          v-bind="{
            ...modal.props,
            scale: calculateScale(index),
          }"
          v-on="modal.events"
        />
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { useModalStore } from '@/application/composables/useModalManager'

const BASE_SCALE = 1
const SCALE_STEP = 0.03
const MIN_SCALE = 0.88

const { activeModals } = useModalStore()

const calculateScale = (index: number) => {
  const reverseIndex = activeModals.length - 1 - index
  return Math.max(BASE_SCALE - reverseIndex * SCALE_STEP, MIN_SCALE)
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
