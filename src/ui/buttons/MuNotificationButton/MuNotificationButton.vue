<template>
  <MuIconButton
    icon-name="notification"
    label="Open notifications"
    size="md"
    class="relative"
    v-bind="$attrs"
  >
    <span v-if="indicator" class="icon-button__indicator" />
  </MuIconButton>
</template>

<script setup lang="ts">
import MuIconButton from '../MuIconButton/MuIconButton.vue'

defineProps<{
  indicator: boolean
  size?: 'sm' | 'md'
}>()
</script>

<style>
@reference "@/style.css";

.icon-button__indicator {
  @apply absolute top-[5px] right-[6px] w-3 h-3 border-2 border-white bg-red-500 rounded-full;
}
</style>
