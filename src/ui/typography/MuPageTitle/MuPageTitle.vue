<template>
  <h1 :class="[titleClass, 'mb-4', $attrs.class]">
    <slot />
  </h1>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type TitleSize = 'sm' | 'base' | 'lg'

interface Props {
  size?: TitleSize
}

const props = withDefaults(defineProps<Props>(), {
  size: 'base',
})

const titleClass = computed(() => ({
  'page-title-sm': props.size === 'sm',
  'page-title-base': props.size === 'base',
  'page-title-lg': props.size === 'lg',
}))
</script>

<style scoped>
@reference "@/style.css";

.page-title-sm {
  @apply text-3xl font-extrabold leading-normal;
}

.page-title-base {
  @apply text-[40px] font-extrabold leading-normal;
}

.page-title-lg {
  @apply text-5xl font-extrabold leading-normal;
}
</style>
