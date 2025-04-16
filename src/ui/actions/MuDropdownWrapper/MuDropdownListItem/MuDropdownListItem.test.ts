import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuDropdownListItem from './MuDropdownListItem.vue'

describe('MuDropdownListItem', () => {
  const mountComponent = (slots = {}) => {
    return mount(MuDropdownListItem, {
      slots: {
        default: 'List Item Content',
        ...slots,
      },
    })
  }

  it('renders properly', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the slot content correctly', () => {
    const wrapper = mountComponent()
    expect(wrapper.text()).toContain('List Item Content')
  })

  it('has the correct base classes', () => {
    const wrapper = mountComponent()
    const innerDiv = wrapper.find('div')
    expect(innerDiv.classes()).toContain('flex')
    expect(innerDiv.classes()).toContain('hover:bg-mu-3')
    expect(innerDiv.classes()).toContain('text-base-content')
    expect(innerDiv.classes()).toContain('py-[10px]')
    expect(innerDiv.classes()).toContain('px-4')
    expect(innerDiv.classes()).toContain('rounded-none')
  })

  it('renders complex slot content correctly', () => {
    const wrapper = mount(MuDropdownListItem, {
      slots: {
        default: `
          <span class="icon">🔍</span>
          <span class="text">Search</span>
        `,
      },
    })

    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.find('.text').exists()).toBe(true)
    expect(wrapper.text()).toContain('Search')
  })
})
