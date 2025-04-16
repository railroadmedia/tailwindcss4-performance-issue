<template>
  <div
    class="slide"
    :style="{
      width: `${slideWidth}px !important`,
      transition: 'transform 0.5s',
    }"
  >
    <slot />
  </div>
</template>

<script setup>
import { inject } from 'vue'

const slideWidth = inject('slideWidth')
</script>

<style scoped>
@reference "@/style.css";

.slide {
  @apply flex h-auto snap-start last:snap-end shrink-0;
}
</style>
