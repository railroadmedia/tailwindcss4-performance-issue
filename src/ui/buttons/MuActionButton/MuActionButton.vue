<template>
  <button class="action-button" :disabled="disabled">
    <slot />
  </button>
</template>
<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
@reference "@/style.css";

.action-button {
  @apply h-[30px] text-sm font-bebas tracking-wider rounded-full flex items-center bg-mu-3 dark:bg-mu-4 text-mu-10 px-3 cursor-pointer shrink-0 hover:bg-mu-4 hover:dark:bg-mu-5/40;
}
</style>
