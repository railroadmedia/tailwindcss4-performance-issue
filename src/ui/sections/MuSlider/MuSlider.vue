<template>
  <div ref="sliderContainer" class="slider group/slider">
    <div
      v-if="showNavigation && showLeftButton"
      class="slider__button-wrapper slider__button-wrapper--left"
      :class="[useDynamicSizes ? (!showRightButton ? 'w-[150px]' : 'w-[79px]') : 'w-18']"
      :style="navigationButtonStyles"
    >
      <button @click="handleClickLeft" class="slider__button">
        <ChevronLeftIcon class="w-[24px] text-black" />
      </button>
    </div>
    <div
      v-if="showNavigation && showRightButton"
      class="slider__button-wrapper slider__button-wrapper--right"
      :class="[useDynamicSizes ? (!showLeftButton ? 'w-[150px]' : 'w-[79px]') : 'w-18']"
      :style="navigationButtonStyles"
    >
      <button @click="handleClickRight" class="slider__button">
        <ChevronRightIcon class="w-[24px] text-black" />
      </button>
    </div>
    <div
      ref="scrollWrapper"
      class="slider__scroll-wrapper"
      :style="{
        scrollPaddingLeft: scrollPaddingLeft,
        scrollPaddingRight: scrollPaddingRight,
      }"
      @scroll="onScroll"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, defineEmits } from 'vue'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { useSlider } from './useSlider.js'

const props = defineProps({
  slidesPerView: {
    type: Number,
    default: 1,
  },
  useDynamicSizes: {
    type: Boolean,
    default: false,
  },
  slideWidth: {
    type: Number,
    default: 300,
  },
  navigationButtonStyles: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['click-left', 'click-right', 'onScroll'])
const sliderContainer = ref(null)

const {
  scrollWrapper,
  showLeftButton,
  showRightButton,
  scrollPaddingLeft,
  calculatedSlideWidth,
  scrollAmount,
  scrollLeft,
  scrollRight,
  onScroll,
  scrollPaddingRight,
  showNavigation,
} = useSlider(props, emit, sliderContainer)

const handleClickLeft = () => {
  if (props.useDynamicSizes) {
    scrollLeft()
  } else {
    scrollWrapper.value.scrollBy({ left: -scrollAmount.value, behavior: 'smooth' })
  }
  emit('click-left')
}

const handleClickRight = () => {
  if (props.useDynamicSizes) {
    scrollRight()
  } else {
    scrollWrapper.value.scrollBy({ left: scrollAmount.value, behavior: 'smooth' })
  }
  emit('click-right')
}

provide('slideWidth', calculatedSlideWidth)
</script>

<style scoped>
@reference "@/style.css";

/* Hide scrollbar for Chrome, Safari and Opera */
.slider::-webkit-scrollbar {
  display: none;
}

.slider {
  @apply w-full h-full overflow-hidden relative;
}

.slider__button-wrapper {
  @apply h-full absolute flex items-center z-20 bg-gradient-to-l;
}

.slider__button-wrapper--left {
  @apply left-0 pl-6 justify-start from-transparent to-mu-3;
}

.slider__button-wrapper--right {
  @apply right-0 pr-6 justify-end from-mu-3 to-transparent;
}

.slider__button {
  @apply hidden group-hover/slider:flex w-10 h-10 bg-white rounded-full cursor-pointer justify-center items-center;
}

.slider__scroll-wrapper {
  /* before it was PX-6 for everything, verify greg's changes are not breaking slider centering stuff */
  @apply h-full w-full flex gap-4 overflow-x-scroll snap-x snap-mandatory px-4 sm:px-6;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  transition: scroll-padding-left 0.3s ease-in-out;
}
</style>
