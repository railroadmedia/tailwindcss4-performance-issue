<template>
  <RouterLink
    :to="to"
    class="tab-button"
    :class="[selectedTab && 'tab-button--selected', isCircle && 'tab-button--circle']"
  >
    <slot />
  </RouterLink>
</template>

<script setup>
defineProps({
  selectedTab: {
    type: Boolean,
    default: false,
  },
  isCircle: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
@reference "@/style.css";

.tab-button {
  @apply btn rounded-full px-7 h-9 border-mu-6 text-base-content hover:bg-transparent hover:border-base-content btn-outline;
}

.tab-button--selected {
  @apply bg-base-content border-base-content text-white dark:bg-white dark:text-base-300 hover:bg-base-content hover:text-white dark:hover:text-black;
}

.tab-button--circle {
  @apply btn-circle;
}
</style>
