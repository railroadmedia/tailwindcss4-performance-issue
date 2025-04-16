import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SlideProgressIndicator from './SlideProgressIndicator.vue'

describe('SlideProgressIndicator', () => {
  it('renders correct number of dots based on totalSlides prop', () => {
    const wrapper = mount(SlideProgressIndicator, {
      props: {
        totalSlides: 5,
        currentSlide: 0,
      },
    })
    const dots = wrapper.findAll('.slide-progress-indicator__dot')
    expect(dots).toHaveLength(5)
  })

  it('applies active class to current slide dot', () => {
    const wrapper = mount(SlideProgressIndicator, {
      props: {
        totalSlides: 3,
        currentSlide: 1,
      },
    })
    const dots = wrapper.findAll('.slide-progress-indicator__dot')
    expect(dots[1].classes()).toContain('slide-progress-indicator__dot--active')
    expect(dots[0].classes()).not.toContain('slide-progress-indicator__dot--active')
    expect(dots[2].classes()).not.toContain('slide-progress-indicator__dot--active')
  })

  it('renders with correct base classes', () => {
    const wrapper = mount(SlideProgressIndicator, {
      props: {
        totalSlides: 2,
        currentSlide: 0,
      },
    })
    expect(wrapper.classes()).toContain('slide-progress-indicator')
  })
})
