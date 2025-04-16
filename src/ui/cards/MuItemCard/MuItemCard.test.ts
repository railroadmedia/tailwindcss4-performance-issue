import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuItemCard from './MuItemCard.vue'

describe('MuItemCard', () => {
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuItemCard, {
      props: {
        title: 'Example Title',
        size: 'small',
        ...props,
      },
      slots: {
        preview: '<div class="slot-preview">Preview Content</div>',
        meta: '<span class="slot-meta">Meta Content</span>',
        actions: '<button class="slot-actions">Action</button>',
        ...slots,
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })
  }

  it('renders correctly with default props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('item_card')
    expect(wrapper.classes()).toContain('item_card--small')
  })

  it('applies the correct size class based on the size prop', () => {
    const sizes = ['small', 'big', 'responsive']
    const sizeClasses = {
      small: 'item_card--small',
      big: 'item_card--big',
      responsive: 'item_card--responsive',
    }

    sizes.forEach((size) => {
      const wrapper = mountComponent({ size })
      expect(wrapper.classes()).toContain(sizeClasses[size])
      wrapper.unmount()
    })
  })

  it('displays the title correctly', () => {
    const title = 'Unique Title'
    const wrapper = mountComponent({ title })
    const titleElement = wrapper.find('.item_card__title')
    expect(titleElement.exists()).toBe(true)
    expect(titleElement.text()).toBe(title)
  })

  it('renders the "preview" slot content correctly', () => {
    const wrapper = mountComponent()
    const preview = wrapper.find('.slot-preview')
    expect(preview.exists()).toBe(true)
    expect(preview.text()).toBe('Preview Content')
  })

  it('renders the "meta" and "actions" slot contents correctly', () => {
    const wrapper = mountComponent()
    const meta = wrapper.find('.slot-meta')
    const actions = wrapper.find('.slot-actions')
    expect(meta.exists()).toBe(true)
    expect(meta.text()).toBe('Meta Content')
    expect(actions.exists()).toBe(true)
    expect(actions.text()).toBe('Action')
  })
})
