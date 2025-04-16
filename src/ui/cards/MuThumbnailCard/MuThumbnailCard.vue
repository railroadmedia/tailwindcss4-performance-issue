<template>
  <router-link :to="item.url" class="w-full">
    <div class="relative w-full pb-[56.25%]">
      <img
        :src="thumbnailImage"
        class="absolute top-0 left-0 w-full h-full object-cover rounded"
        :alt="item.title"
      />
    </div>
    <div class="flex flex-col gap-1 pt-3">
      <h4 class="font-bold">{{ item.title }}</h4>
      <p class="text-neutral-300 text-sm">{{ item.difficulty_string }} | {{ whatever }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: {
      title: String,
      thumbnail: String,
      difficulty_string: String,
      url: String,
    },
    required: true,
  },
  whatever: {
    type: String,
    default: 'default value',
  },
})

const thumbnailImage = computed(() => {
  return `${props.item.thumbnail}?w=500`
})
</script>
