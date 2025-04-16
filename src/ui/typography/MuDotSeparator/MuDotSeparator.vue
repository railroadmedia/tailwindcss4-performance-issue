<template>
  <span class="dot-separator" :class="[`dot-separator--${color}`, `dot-separator--${size}`]"
    >•</span
  >
</template>

<script setup lang="ts">
type DotSeparatorColor = 'primary' | 'default' | 'muted'
type DotSeparatorSize = 'xs' | 'sm' | 'md' | 'lg'

interface DotSeparatorProps {
  color?: DotSeparatorColor
  size?: DotSeparatorSize
}

const props = withDefaults(defineProps<DotSeparatorProps>(), {
  color: 'primary',
  size: 'xs',
})
</script>

<style scoped>
@reference "@/style.css";

.dot-separator {
  @apply font-medium;
}

.dot-separator--primary {
  @apply text-[#53A3EE];
}

.dot-separator--default {
  @apply text-mu-10 dark:text-mu-1;
}

.dot-separator--muted {
  @apply text-mu-7;
}

.dot-separator--xs {
  @apply text-xs;
}

.dot-separator--sm {
  @apply text-sm;
}

.dot-separator--md {
  @apply text-base;
}

.dot-separator--lg {
  @apply text-lg;
}
</style>
