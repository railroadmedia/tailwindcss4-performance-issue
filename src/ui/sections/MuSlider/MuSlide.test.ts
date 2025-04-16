import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuSlide from './MuSlide.vue'

describe('MuSlide', () => {
  it('renders with correct class and style', () => {
    const wrapper = mount(MuSlide, {
      global: {
        provide: {
          slideWidth: 200,
        },
      },
      slots: {
        default: '<p>Test Content</p>',
      },
    })
    expect(wrapper.classes()).toContain('slide')
    const style = wrapper.attributes('style')
    expect(style).toContain('width: 200px')
    expect(style).toContain('transition: transform 0.5s')
  })

  it('renders slot content', () => {
    const wrapper = mount(MuSlide, {
      global: {
        provide: {
          slideWidth: 300,
        },
      },
      slots: {
        default: '<div class="slot-content">Hello</div>',
      },
    })
    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.find('.slot-content').text()).toBe('Hello')
  })
})
