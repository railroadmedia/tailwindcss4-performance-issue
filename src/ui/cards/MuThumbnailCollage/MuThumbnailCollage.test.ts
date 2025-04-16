import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuThumbnailCollage from './MuThumbnailCollage.vue'

describe('MuThumbnailCollage', () => {
  const defaultImages = [
    'https://picsum.photos/seed/1/300/200',
    'https://picsum.photos/seed/2/300/200',
    'https://picsum.photos/seed/3/300/200',
    'https://picsum.photos/seed/4/300/200',
  ]

  const mountComponent = (props = {}) => {
    return mount(MuThumbnailCollage, {
      props: {
        images: defaultImages,
        ...props,
      },
      global: {
        mocks: {
          $t: (msg: string) => msg,
        },
      },
    })
  }

  it('renders properly with default props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findAll('.collage-thumbnail__item')).toHaveLength(4)
  })

  it('handles less than 4 images', () => {
    const wrapper = mountComponent({
      images: ['https://picsum.photos/seed/1/300/200', 'https://picsum.photos/seed/2/300/200'],
    })
    const items = wrapper.findAll('.collage-thumbnail__item')

    // Should still have 4 item containers
    expect(items).toHaveLength(4)

    // First two items should have images
    expect(items[0].find('img').exists()).toBe(true)
    expect(items[0].find('img').attributes('src')).toContain('https://picsum.photos/seed/1/300/200')
    expect(items[1].find('img').exists()).toBe(true)
    expect(items[1].find('img').attributes('src')).toContain('https://picsum.photos/seed/2/300/200')

    // Last two items should NOT have images
    expect(items[2].find('img').exists()).toBe(false)
    expect(items[3].find('img').exists()).toBe(false)
  })

  it('displays item count when provided', () => {
    const wrapper = mountComponent({ itemCount: 10 })
    const count = wrapper.find('.collage-thumbnail__count')
    expect(count.exists()).toBe(true)
    expect(count.text()).toContain('10')
  })

  it('applies correct size class', () => {
    const wrapper = mountComponent({ size: 'big' })
    expect(wrapper.classes()).toContain('collage-thumbnail--big')
  })
})
