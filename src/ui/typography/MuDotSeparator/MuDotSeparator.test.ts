import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuDotSeparator from './MuDotSeparator.vue'

describe('MuDotSeparator', () => {
  const mountComponent = (props = {}) => {
    return mount(MuDotSeparator, {
      props,
    })
  }

  it('renders properly', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('span').exists()).toBe(true)
    expect(wrapper.text()).toBe('•')
  })

  it('applies the default color and size classes when no props are provided', () => {
    const wrapper = mountComponent()
    const dotElement = wrapper.find('span')

    expect(dotElement.classes()).toContain('dot-separator--primary')
    expect(dotElement.classes()).toContain('dot-separator--xs')
  })

  it('applies the correct color class based on color prop', () => {
    // Test primary color
    const primaryWrapper = mountComponent({ color: 'primary' })
    expect(primaryWrapper.find('span').classes()).toContain('dot-separator--primary')

    // Test default color
    const defaultWrapper = mountComponent({ color: 'default' })
    expect(defaultWrapper.find('span').classes()).toContain('dot-separator--default')

    // Test muted color
    const mutedWrapper = mountComponent({ color: 'muted' })
    expect(mutedWrapper.find('span').classes()).toContain('dot-separator--muted')
  })

  it('applies the correct size class based on size prop', () => {
    // Test xs size
    const xsWrapper = mountComponent({ size: 'xs' })
    expect(xsWrapper.find('span').classes()).toContain('dot-separator--xs')

    // Test sm size
    const smWrapper = mountComponent({ size: 'sm' })
    expect(smWrapper.find('span').classes()).toContain('dot-separator--sm')

    // Test md size
    const mdWrapper = mountComponent({ size: 'md' })
    expect(mdWrapper.find('span').classes()).toContain('dot-separator--md')

    // Test lg size
    const lgWrapper = mountComponent({ size: 'lg' })
    expect(lgWrapper.find('span').classes()).toContain('dot-separator--lg')
  })

  it('applies both color and size classes correctly when both props are provided', () => {
    const wrapper = mountComponent({
      color: 'muted',
      size: 'lg',
    })

    const dotElement = wrapper.find('span')
    expect(dotElement.classes()).toContain('dot-separator--muted')
    expect(dotElement.classes()).toContain('dot-separator--lg')
  })

  it('has the base dot-separator class regardless of props', () => {
    // Try with different combinations of props
    const combinations = [
      {},
      { color: 'primary', size: 'xs' },
      { color: 'default', size: 'sm' },
      { color: 'muted', size: 'md' },
      { color: 'primary', size: 'lg' },
    ]

    combinations.forEach((props) => {
      const wrapper = mountComponent(props)
      expect(wrapper.find('span').classes()).toContain('dot-separator')
    })
  })
})
