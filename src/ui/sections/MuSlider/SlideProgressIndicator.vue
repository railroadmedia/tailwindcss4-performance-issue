<template>
  <div class="slide-progress-indicator">
    <div
      v-for="(_slide, index) in totalSlides"
      :key="index"
      class="slide-progress-indicator__dot"
      :class="{ 'slide-progress-indicator__dot--active': index === currentSlide }"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  totalSlides: Number,
  currentSlide: Number,
})
</script>

<style scoped>
@reference "@/style.css";

.slide-progress-indicator {
  @apply flex gap-2;
}

.slide-progress-indicator__dot {
  @apply bg-transparent border border-mu-4 w-[6px] h-[6px] rounded-full transition-all duration-200;
}

.slide-progress-indicator__dot--active {
  @apply bg-mu-4;
}
</style>
