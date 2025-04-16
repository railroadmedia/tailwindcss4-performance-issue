<template>
  <a
    class="thumbnail"
    :class="{ 'thumbnail--clickable': !!url }"
    :href="url"
    @click.prevent="handleClick"
  >
    <div v-if="!isLoaded || hasError" class="thumbnail__skeleton skeleton"></div>
    <picture>
      <source v-if="isIntersecting" :srcset="thumbnailImage" />
      <img
        ref="imageRef"
        class="thumbnail__image"
        :src="isIntersecting ? thumbnailImage : ''"
        :alt="title"
        :class="{ 'thumbnail__image--loaded': isLoaded && !hasError }"
        @load="onImageLoaded"
        @error="onImageError"
      />
    </picture>
    <div
      v-if="pillText"
      class="thumbnail__pill"
      :class="{ 'thumbnail__pill--extra-small': size === 'extra-small' }"
    >
      {{ pillText }}
    </div>
    <slot name="overlay" />
    <div v-if="progress" class="thumbnail__progress_bar" :style="{ width: `${progress}%` }" />
  </a>
</template>

<script setup>
import { computed, useSlots, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const imageRef = ref(null)
const isLoaded = ref(false)
const hasError = ref(false)
const isIntersecting = ref(false)
let observer = null

const props = defineProps({
  imgUrl: String,
  url: {
    type: String,
    default: '',
  },
  pillText: String,
  brand: String,
  progress: Number,
  title: String,
  size: {
    type: String,
    default: null,
  },
  imageWidth: {
    type: Number,
    default: 500,
  },
})

const slots = useSlots()

onMounted(() => {
  if (window.IntersectionObserver) {
    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        isIntersecting.value = entry.isIntersecting
      },
      { threshold: 0.1 }
    )

    if (imageRef.value) {
      observer.observe(imageRef.value)
    }
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    isIntersecting.value = true
  }
})

onUnmounted(() => {
  if (observer && imageRef.value) {
    observer.unobserve(imageRef.value)
    observer = null
  }
})

const thumbnailImage = computed(() => `${props.imgUrl}?w=${props.imageWidth}`)

const showCustomOverlay = computed(() => slots.overlay)

const onImageLoaded = () => {
  isLoaded.value = true
  hasError.value = false
}

const onImageError = () => {
  isLoaded.value = true
  hasError.value = true
}

const handleClick = (event) => {
  if (props.url) {
    // Only handle left clicks - let browser handle right clicks and middle clicks naturally
    if (event.button === 0 && !event.ctrlKey && !event.metaKey) {
      router.push(props.url)
    }
  }
}
</script>

<style scoped>
@reference "@/style.css";

.thumbnail {
  @apply flex rounded-[5px] overflow-hidden relative object-cover w-full aspect-video;
}

.thumbnail--clickable {
  @apply cursor-pointer;
}

.thumbnail__pill {
  @apply bg-[#0C1524]/80 py-1 px-2 rounded-[20px] text-[10px] leading-none text-white absolute bottom-2 right-2 flex items-center justify-center;
}

.thumbnail__pill--extra-small {
  @apply right-1 bottom-[6px] text-white rounded-[20px] font-semibold px-[6px];
}

.thumbnail__progress_bar {
  @apply h-[4px] bg-primary absolute bottom-0;
}

.thumbnail__skeleton {
  @apply inset-0 absolute w-full h-full bg-base-200 rounded-[5px];
}

.thumbnail__image {
  @apply inset-0 object-cover absolute w-full h-full;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.thumbnail__image--loaded {
  opacity: 1;
}
</style>
