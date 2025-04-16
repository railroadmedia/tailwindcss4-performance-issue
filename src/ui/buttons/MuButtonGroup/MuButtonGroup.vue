<template>
  <div :class="['join', vertical && 'join-vertical']">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
})
</script>
