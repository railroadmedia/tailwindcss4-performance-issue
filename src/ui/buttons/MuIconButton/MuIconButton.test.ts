import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuIconButton from './MuIconButton.vue'

describe('MuIconButton', () => {
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuIconButton, {
      props: {
        iconName: 'test-icon',
        label: 'Test Button',
        ...props,
      },
      slots,
      global: {
        stubs: {
          SvgIcon: {
            template: '<div class="svg-icon-stub" :class="$attrs.class"></div>',
            props: ['name'],
          },
        },
      },
    })
  }

  it('renders properly with required props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('.svg-icon-stub').exists()).toBe(true)
  })

  it('passes correct props to SvgIcon component', () => {
    const iconName = 'custom-icon'
    const wrapper = mount(MuIconButton, {
      props: {
        iconName,
        label: 'Test Button',
      },
      shallow: true,
    })

    const svgIcon = wrapper.findComponent({ name: 'SvgIcon' })
    expect(svgIcon.props('name')).toBe(iconName)
  })

  it('applies correct class based on size prop', () => {
    // Test small size
    const wrapperSm = mountComponent({ size: 'sm' })
    expect(wrapperSm.find('button').classes()).toContain('icon-button--sm')

    // Test medium size
    const wrapperMd = mountComponent({ size: 'md' })
    expect(wrapperMd.find('button').classes()).toContain('icon-button--md')

    // Test large size
    const wrapperLg = mountComponent({ size: 'lg' })
    expect(wrapperLg.find('button').classes()).toContain('icon-button--lg')

    // Test responsive size
    const wrapperResponsive = mountComponent({ size: 'responsive' })
    expect(wrapperResponsive.find('button').classes()).toContain('icon-button--responsive')
  })

  it('sets the correct aria-label from props', () => {
    const label = 'Custom Aria Label'
    const wrapper = mountComponent({ label })
    expect(wrapper.find('button').attributes('aria-label')).toBe(label)
  })

  it('emits click event when clicked', async () => {
    const wrapper = mountComponent()
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('renders slot content correctly', () => {
    const slotContent = 'Slot Text'
    const wrapper = mountComponent({}, { default: slotContent })

    expect(wrapper.find('button').text()).toContain(slotContent)
  })

  it('renders complex slot content', () => {
    const complexSlot = '<span class="custom-slot">Complex Content</span>'
    const wrapper = mountComponent({}, { default: complexSlot })

    expect(wrapper.find('.custom-slot').exists()).toBe(true)
    expect(wrapper.find('.custom-slot').text()).toBe('Complex Content')
  })

  it('adds icon-button class to the button element', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('button').classes()).toContain('icon-button')
  })

  it('sets button type to "button"', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('button').attributes('type')).toBe('button')
  })
})
