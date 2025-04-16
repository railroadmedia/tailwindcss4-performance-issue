import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuBaseCard from './MuBaseCard.vue'

describe('MuBaseCard', () => {
  const mountComponent = (slots = {}) => {
    return mount(MuBaseCard, {
      slots,
    })
  }

  it('renders properly', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('has the correct classes applied', () => {
    const wrapper = mountComponent()
    const cardElement = wrapper.find('div')

    expect(cardElement.classes()).toContain('base-card')
  })

  it('renders the default slot content correctly', () => {
    const slotContent = 'Card Content'
    const wrapper = mountComponent({
      default: slotContent,
    })

    expect(wrapper.text()).toContain(slotContent)
  })

  it('renders complex slot content', () => {
    const complexSlot = '<h2 class="card-title">Title</h2><p class="card-text">Description</p>'
    const wrapper = mountComponent({
      default: complexSlot,
    })

    expect(wrapper.find('.card-title').exists()).toBe(true)
    expect(wrapper.find('.card-title').text()).toBe('Title')
    expect(wrapper.find('.card-text').exists()).toBe(true)
    expect(wrapper.find('.card-text').text()).toBe('Description')
  })

  it('applies custom attributes to the root element', () => {
    const wrapper = mount(MuBaseCard, {
      attrs: {
        id: 'custom-card',
        'data-testid': 'base-card',
        class: 'custom-class',
      },
    })

    const cardElement = wrapper.find('div')
    expect(cardElement.attributes('id')).toBe('custom-card')
    expect(cardElement.attributes('data-testid')).toBe('base-card')
    expect(cardElement.classes()).toContain('custom-class')

    // Ensure the original classes are still there
    expect(cardElement.classes()).toContain('base-card')
  })
})
