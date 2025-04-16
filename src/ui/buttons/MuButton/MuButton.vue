<template>
  <button :class="`btn ${type}-btn`" :aria-label="label">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  label: '',
})
</script>

<style scoped>
@reference "@/style.css";

.btn {
  @apply flex items-center justify-center px-[35px] text-base h-10 uppercase rounded-3xl font-bebas font-normal tracking-wider;
}

.primary-btn {
  @apply text-mu-1 bg-mu-10;
}

.secondary-btn {
  @apply border border-mu-10 text-mu-10 dark:bg-transparent;
}
</style>
