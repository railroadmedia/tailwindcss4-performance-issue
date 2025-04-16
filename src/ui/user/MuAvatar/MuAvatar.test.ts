import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MuAvatar from './MuAvatar.vue'

describe('MuAvatar', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(MuAvatar, {
      props: {
        imageUrl: 'test-image.jpg',
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct image', () => {
    const wrapper = shallowMount(MuAvatar, {
      props: {
        imageUrl: 'test-image.jpg',
        alt: 'custom-alt',
      },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('test-image.jpg')
    expect(img.attributes('alt')).toBe('custom-alt')
  })

  it('applies the default size', () => {
    const wrapper = shallowMount(MuAvatar, {
      props: {
        imageUrl: 'test-image.jpg',
      },
    })
    const container = wrapper.find('.rounded-full')
    expect(container.attributes('style')).toBe('width: 100px;')
  })

  it('applies a custom size', () => {
    const wrapper = shallowMount(MuAvatar, {
      props: {
        imageUrl: 'test-image.jpg',
        size: '200px',
      },
    })
    const container = wrapper.find('.rounded-full')
    expect(container.attributes('style')).toBe('width: 200px;')
  })

  it('shows online status when online prop is true', () => {
    const wrapper = shallowMount(MuAvatar, {
      props: {
        imageUrl: 'test-image.jpg',
        online: true,
      },
    })
    expect(wrapper.classes()).toContain('mu-avatar--online')
  })

  it('does not show online status when online prop is false', () => {
    const wrapper = shallowMount(MuAvatar, {
      props: {
        imageUrl: 'test-image.jpg',
        online: false,
      },
    })
    expect(wrapper.classes()).not.toContain('mu-avatar--online')
  })

  it('renders badge slot content when provided', () => {
    const wrapper = shallowMount(MuAvatar, {
      props: {
        imageUrl: 'test-image.jpg',
      },
      slots: {
        badge: '<div class="test-badge">Badge</div>',
      },
    })
    expect(wrapper.find('.mu-avatar__badge-container').exists()).toBe(true)
    expect(wrapper.find('.test-badge').exists()).toBe(true)
  })

  it('does not render badge container when no badge slot is provided', () => {
    const wrapper = shallowMount(MuAvatar, {
      props: {
        imageUrl: 'test-image.jpg',
      },
    })
    expect(wrapper.find('.mu-avatar__badge-container').exists()).toBe(false)
  })
})
