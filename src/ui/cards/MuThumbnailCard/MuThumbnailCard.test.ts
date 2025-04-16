import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuThumbnailCard from './MuThumbnailCard.vue'

describe('MuThumbnailCard', () => {
  const defaultItem = {
    title: 'Test Course',
    thumbnail: 'https://example.com/image.jpg',
    difficulty_string: 'Beginner',
    url: '/courses/test-course',
  }

  const mountComponent = (props = {}) => {
    return mount(MuThumbnailCard, {
      props: {
        item: defaultItem,
        ...props,
      },
      global: {
        stubs: {
          'router-link': {
            template: '<a :href="to" class="router-link-stub"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
  }

  it('renders properly with required props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('h4').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('uses the computed thumbnailImage property', () => {
    const wrapper = mountComponent()
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(`${defaultItem.thumbnail}?w=500`)
  })

  it('sets the correct alt text on the image', () => {
    const wrapper = mountComponent()
    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe(defaultItem.title)
  })

  it('displays the correct title', () => {
    const wrapper = mountComponent()
    const title = wrapper.find('h4')
    expect(title.text()).toBe(defaultItem.title)
  })

  it('displays the correct difficulty string', () => {
    const wrapper = mountComponent()
    const text = wrapper.find('p')
    expect(text.text()).toContain(defaultItem.difficulty_string)
  })

  it('displays the default "whatever" value when not provided', () => {
    const wrapper = mountComponent()
    const text = wrapper.find('p')
    expect(text.text()).toContain('default value')
  })

  it('displays a custom "whatever" value when provided', () => {
    const customWhatever = 'Custom Value'
    const wrapper = mountComponent({ whatever: customWhatever })
    const text = wrapper.find('p')
    expect(text.text()).toContain(customWhatever)
  })

  it('links to the correct URL', () => {
    const wrapper = mountComponent()
    const link = wrapper.find('a.router-link-stub')
    expect(link.attributes('href')).toBe(defaultItem.url)
  })

  it('formats content with pipes correctly', () => {
    const wrapper = mountComponent()
    const text = wrapper.find('p')
    expect(text.text()).toBe(`${defaultItem.difficulty_string} | default value`)
  })

  it('handles custom item properties', () => {
    const customItem = {
      title: 'Custom Title',
      thumbnail: 'https://example.com/custom.jpg',
      difficulty_string: 'Advanced',
      url: '/custom-url',
    }

    const wrapper = mountComponent({ item: customItem })

    expect(wrapper.find('h4').text()).toBe(customItem.title)
    expect(wrapper.find('img').attributes('src')).toBe(`${customItem.thumbnail}?w=500`)
    expect(wrapper.find('p').text()).toContain(customItem.difficulty_string)
    expect(wrapper.find('a.router-link-stub').attributes('href')).toBe(customItem.url)
  })
})
