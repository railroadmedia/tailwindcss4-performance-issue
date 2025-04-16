import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuActionButton from './MuActionButton.vue'

describe('MuActionButton.vue', () => {
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuActionButton, {
      props,
      slots: {
        default: 'Click me',
        ...slots,
      },
    })
  }

  it('renders correctly with default props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('action-button')
    expect(wrapper.text()).toBe('Click me')
  })

  it('disables the button when disabled prop is true', () => {
    const wrapper = mountComponent({ disabled: true })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('renders slot content correctly', () => {
    const wrapper = mountComponent({}, { default: 'Custom Text' })
    expect(wrapper.text()).toBe('Custom Text')
  })
})
