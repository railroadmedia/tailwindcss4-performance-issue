import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuFilterGroupWrapper from './MuFilterGroupWrapper.vue'

describe('MuFilterGroupWrapper', () => {
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuFilterGroupWrapper, {
      props: {
        title: 'Filter Group',
        ...props,
      },
      slots: {
        default: '<div class="test-filter-item">Test Filter Item</div>',
        ...slots,
      },
      global: {
        mocks: {
          $t: (key) => key, // Mock translation function to return the key
        },
      },
    })
  }

  it('renders properly with required props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.filter-group__wrapper').exists()).toBe(true)
  })

  it('displays the title correctly', () => {
    const title = 'Categories'
    const wrapper = mountComponent({ title })

    const titleElement = wrapper.find('.filter-group__wrapper--title')
    expect(titleElement.exists()).toBe(true)
    expect(titleElement.text()).toBe(title)
  })

  it('translates the title using $t', () => {
    const title = 'filters.categories'
    // Mock $t to return a specific translation
    const wrapper = mount(MuFilterGroupWrapper, {
      props: { title },
      global: {
        mocks: {
          $t: (key) => (key === 'filters.categories' ? 'Categories' : key),
        },
      },
    })

    expect(wrapper.find('.filter-group__wrapper--title').text()).toBe('Categories')
  })

  it('renders slot content correctly', () => {
    const slotContent = '<div class="custom-filter">Custom Filter Option</div>'
    const wrapper = mountComponent({}, { default: slotContent })

    const contentWrapper = wrapper.find('.filter-group__wrapper--content')
    expect(contentWrapper.exists()).toBe(true)
    expect(wrapper.find('.custom-filter').exists()).toBe(true)
    expect(wrapper.find('.custom-filter').text()).toBe('Custom Filter Option')
  })

  it('applies the correct CSS classes', () => {
    const wrapper = mountComponent()

    expect(wrapper.find('.filter-group__wrapper').exists()).toBe(true)
    expect(wrapper.find('.filter-group__wrapper--title').exists()).toBe(true)
    expect(wrapper.find('.filter-group__wrapper--content').exists()).toBe(true)
  })

  it('renders multiple slot items correctly', () => {
    const multipleSlotContent = `
      <div class="filter-item-1">Item 1</div>
      <div class="filter-item-2">Item 2</div>
      <div class="filter-item-3">Item 3</div>
    `
    const wrapper = mountComponent({}, { default: multipleSlotContent })

    expect(wrapper.find('.filter-item-1').exists()).toBe(true)
    expect(wrapper.find('.filter-item-2').exists()).toBe(true)
    expect(wrapper.find('.filter-item-3').exists()).toBe(true)
    expect(wrapper.find('.filter-item-1').text()).toBe('Item 1')
    expect(wrapper.find('.filter-item-2').text()).toBe('Item 2')
    expect(wrapper.find('.filter-item-3').text()).toBe('Item 3')
  })
})
