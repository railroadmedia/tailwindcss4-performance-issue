import { ref, nextTick } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSlider } from './useSlider'

describe('useSlider composable', () => {
  let props
  let sliderContainer
  let emit

  beforeEach(() => {
    props = {
      slidesPerView: 2,
      slideWidth: 300,
      useDynamicSizes: false,
    }
    sliderContainer = ref({ clientWidth: 600 })
    emit = vi.fn()
  })

  it('calculates slide width correctly based on slidesPerView', () => {
    props.useDynamicSizes = true
    const slider = useSlider(props, emit, sliderContainer)

    expect(slider.calculatedSlideWidth.value).toBeLessThan(sliderContainer.value.clientWidth)
    expect(slider.calculatedSlideWidth.value).toBeGreaterThan(0)
  })

  it('adjusts slide width dynamically when useDynamicSizes is true', () => {
    props.useDynamicSizes = true
    const slider = useSlider(props, emit, sliderContainer)

    const initialWidth = slider.calculatedSlideWidth.value

    sliderContainer.value.clientWidth = 800
    expect(slider.calculatedSlideWidth.value).toBeGreaterThan(initialWidth)
  })

  it('calculates scrollAmount dynamically based on slide width', () => {
    props.useDynamicSizes = true
    const slider = useSlider(props, emit, sliderContainer)

    expect(slider.scrollAmount.value).toBeGreaterThan(slider.calculatedSlideWidth.value)
  })

  it('scrollLeft scrolls correctly', async () => {
    const slider = useSlider(props, emit, sliderContainer)
    slider.scrollWrapper.value = {
      scrollLeft: 500,
      clientWidth: 300,
      scrollWidth: 1000,
      scrollBy: vi.fn(),
    }

    slider.scrollLeft()
    await nextTick()

    expect(slider.scrollWrapper.value.scrollBy).toHaveBeenCalledWith(
      expect.objectContaining({ left: expect.any(Number), behavior: 'smooth' })
    )
  })

  it('scrollRight scrolls correctly', async () => {
    const slider = useSlider(props, emit, sliderContainer)
    slider.scrollWrapper.value = {
      scrollLeft: 0,
      clientWidth: 300,
      scrollWidth: 1000,
      scrollBy: vi.fn(),
    }

    slider.scrollRight()
    await nextTick()

    expect(slider.scrollWrapper.value.scrollBy).toHaveBeenCalledWith(
      expect.objectContaining({ left: expect.any(Number), behavior: 'smooth' })
    )
  })

  it('updates button visibility correctly', () => {
    const slider = useSlider(props, emit, sliderContainer)
    slider.scrollWrapper.value = {
      scrollLeft: 0,
      clientWidth: 300,
      scrollWidth: 1000,
    }

    slider.onScroll()
    expect(slider.showLeftButton.value).toBe(false)
    expect(slider.showRightButton.value).toBe(true)

    slider.scrollWrapper.value.scrollLeft = 700
    slider.onScroll()
    expect(slider.showLeftButton.value).toBe(true)
    expect(slider.showRightButton.value).toBe(false)

    slider.scrollWrapper.value.scrollLeft = 300
    slider.onScroll()
    expect(slider.showLeftButton.value).toBe(true)
    expect(slider.showRightButton.value).toBe(true)
  })

  it('emits onScroll event when scrolling', () => {
    const slider = useSlider(props, emit, sliderContainer)
    slider.scrollWrapper.value = {
      scrollLeft: 300,
      clientWidth: 300,
      scrollWidth: 1000,
    }

    slider.onScroll()
    expect(emit).toHaveBeenCalledWith('onScroll', slider.scrollWrapper.value)
  })
})
