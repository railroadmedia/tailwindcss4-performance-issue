import { ref, computed, onMounted, nextTick } from 'vue'
import { useBreakpoints } from '@vueuse/core'
import { muBreakpoints } from '@/shared/constants/breakpoints'

export function useSlider(props, emit, sliderContainer) {
  const gapSize = 16

  const scrollWrapper = ref(null)
  const showLeftButton = ref(false)
  const showRightButton = ref(false)
  const forceBothButtonPadding = ref(false)
  const breakpoints = useBreakpoints(muBreakpoints)
  const isSmallScreen = breakpoints.smaller('sm')

  const scrollPaddingLeft = computed(() => {
    if (isSmallScreen.value) return '16px'
    if (!props.useDynamicSizes) return '24px'
    return (showLeftButton.value && showRightButton.value) || forceBothButtonPadding.value
      ? '95px'
      : '24px'
  })

  const scrollPaddingRight = computed(() => {
    return isSmallScreen.value ? '16px' : '24px'
  })

  const calculatedSlideWidth = computed(() => {
    if (!props.useDynamicSizes) return props.slideWidth || 300
    if (!sliderContainer.value) return 300
    if (props.slidesPerView === 1) return 300
    return (
      (sliderContainer.value.clientWidth - 174 - props.slidesPerView * gapSize) /
      props.slidesPerView
    )
  })

  const scrollAmount = computed(() => {
    if (!props.useDynamicSizes) return (props.slideWidth || 300) + gapSize
    return calculatedSlideWidth.value
      ? (calculatedSlideWidth.value + gapSize) * props.slidesPerView + 79
      : 300
  })

  const scrollLeft = () => {
    if (!scrollWrapper.value) return
    const { scrollLeft: sLeft, clientWidth, scrollWidth } = scrollWrapper.value
    if (sLeft + clientWidth >= scrollWidth) {
      forceBothButtonPadding.value = true
      nextTick(() => {
        scrollWrapper.value.scrollBy({ left: -scrollAmount.value, behavior: 'smooth' })
      })
      return
    }
    scrollWrapper.value.scrollBy({ left: -scrollAmount.value, behavior: 'smooth' })
  }

  const scrollRight = () => {
    if (!scrollWrapper.value) return
    if (scrollWrapper.value.scrollLeft === 0) {
      forceBothButtonPadding.value = true
      nextTick(() => {
        scrollWrapper.value.scrollBy({ left: scrollAmount.value, behavior: 'smooth' })
      })
      return
    }
    scrollWrapper.value.scrollBy({ left: scrollAmount.value, behavior: 'smooth' })
  }

  const updateButtonVisibility = () => {
    if (!scrollWrapper.value) return
    const { scrollLeft: sLeft, clientWidth, scrollWidth } = scrollWrapper.value
    showLeftButton.value = sLeft > 0
    showRightButton.value = sLeft + clientWidth < scrollWidth
    if (props.useDynamicSizes) {
      forceBothButtonPadding.value = false
    }
  }

  const onScroll = () => {
    updateButtonVisibility()
    emit('onScroll', scrollWrapper.value)
  }

  onMounted(() => {
    nextTick(() => {
      updateButtonVisibility()
    })
  })

  return {
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
    showNavigation: !isSmallScreen.value,
  }
}
