<template>
  <div class="filter-group__wrapper">
    <h3 class="filter-group__wrapper--title">{{ $t(title) }}</h3>
    <div class="filter-group__wrapper--content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

const { title } = defineProps<Props>()
</script>

<style scoped>
@reference "@/style.css";

.filter-group__wrapper--title {
  @apply text-lg font-bold border-b border-neutral pb-3 mb-3;
}

.filter-group__wrapper--content {
  @apply flex flex-col gap-2 pr-12;
}
</style>
