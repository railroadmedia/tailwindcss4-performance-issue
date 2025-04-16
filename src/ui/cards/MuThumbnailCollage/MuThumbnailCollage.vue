<template>
  <div :class="['collage-thumbnail', `collage-thumbnail--${size}`]">
    <div class="collage-thumbnail__grid">
      <div v-for="(image, index) in displayImages" :key="index" class="collage-thumbnail__item">
        <img
          v-if="image"
          :src="getOptimizedImageUrl(image)"
          :alt="$t('Playlist item thumbnail')"
          class="object-cover w-full h-full"
        />
        <div v-if="itemCount && index === 3" class="collage-thumbnail__count">
          <div class="collage-thumbnail__count-overlay" />
          <span class="collage-thumbnail__count-text"> +{{ itemCount }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  images: string[]
  itemCount?: number
  size?: 'small' | 'big' | 'responsive'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  itemCount: 0,
})

const displayImages = computed(() => {
  const availableImages = props.images || []
  return [...availableImages, ...Array(4).fill('')].slice(0, 4)
})

const getOptimizedImageUrl = (url: string) => {
  if (!url) return ''
  return `${url}?w=500`
}
</script>

<style scoped>
@reference "@/style.css";

.collage-thumbnail {
  @apply relative rounded-[2px] overflow-hidden;
}

.collage-thumbnail--small {
  @apply w-[146px] h-[82px];
}

.collage-thumbnail--big {
  @apply w-[322px] h-[182px];
}

.collage-thumbnail--responsive {
  @apply w-full aspect-[23/13];
}

.collage-thumbnail__grid {
  @apply grid grid-cols-2 grid-rows-2 w-full h-full;
}

.collage-thumbnail__item {
  @apply relative overflow-hidden bg-base-300;
}

.collage-thumbnail__item:nth-child(4) img {
  @apply blur-[3px];
}

.collage-thumbnail__count {
  @apply absolute inset-0 flex items-center justify-center;
}

.collage-thumbnail__count-overlay {
  @apply absolute inset-0 bg-black/50;
}

.collage-thumbnail__count-text {
  @apply relative z-10 text-white text-sm font-medium;
}
</style>
