import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MuDropdownWrapper from './MuDropdownWrapper.vue'

describe('MuDropdownWrapper', () => {
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuDropdownWrapper, {
      props: {
        ...props,
      },
      slots: {
        default: '<span>Toggle Dropdown</span>',
        options:
          '<li><div class="flex p-2">Option 1</div></li><li><div class="flex p-2">Option 2</div></li>',
        ...slots,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })
  }

  it('renders properly with initial props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the slot content correctly', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('button').text()).toContain('Toggle Dropdown')
  })

  it('toggles dropdown when clicked', async () => {
    const wrapper = mountComponent()
    const trigger = wrapper.find('button')

    expect(wrapper.find('ul.dropdown-open').exists()).toBe(false)

    await trigger.trigger('click')
    expect(wrapper.find('ul.dropdown-open').exists()).toBe(true)

    await trigger.trigger('click')
    expect(wrapper.find('ul.dropdown-open').exists()).toBe(false)
  })

  it('renders the options slot correctly when open', async () => {
    const wrapper = mountComponent()
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('ul.dropdown-open').exists()).toBe(true)
    expect(wrapper.find('ul').text()).toContain('Option 1')
    expect(wrapper.find('ul').text()).toContain('Option 2')
  })

  it('closes when clicked outside', async () => {
    const wrapper = mountComponent()
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('ul.dropdown-open').exists()).toBe(true)

    // Simulate the onClickOutside behavior
    await wrapper.vm.closeDropdown()
    expect(wrapper.find('ul.dropdown-open').exists()).toBe(false)
  })
})
