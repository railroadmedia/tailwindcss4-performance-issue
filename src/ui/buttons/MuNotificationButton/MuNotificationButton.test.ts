import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuNotificationButton from './MuNotificationButton.vue'

describe('MuNotificationButton', () => {
  const mountComponent = (props = {}, attrs = {}) => {
    return mount(MuNotificationButton, {
      props: {
        indicator: false,
        ...props,
      },
      attrs,
      global: {
        stubs: {
          MuIconButton: {
            template: `
              <button class="mu-icon-button-stub" :class="$attrs.class">
                <slot />
              </button>
            `,
            props: ['iconName', 'label', 'size'],
          },
        },
      },
    })
  }

  it('renders properly with required props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.mu-icon-button-stub').exists()).toBe(true)
  })

  it('passes correct props to MuIconButton component', () => {
    const wrapper = mount(MuNotificationButton, {
      props: {
        indicator: false,
      },
      shallow: true,
    })

    const iconButton = wrapper.findComponent({ name: 'MuIconButton' })
    expect(iconButton.props('iconName')).toBe('notification')
    expect(iconButton.props('label')).toBe('Open notifications')
    expect(iconButton.props('size')).toBe('md')
    expect(iconButton.attributes('class')).toContain('relative')
  })

  it('shows indicator when indicator prop is true', () => {
    const wrapper = mountComponent({ indicator: true })
    expect(wrapper.find('.icon-button__indicator').exists()).toBe(true)
  })

  it('hides indicator when indicator prop is false', () => {
    const wrapper = mountComponent({ indicator: false })
    expect(wrapper.find('.icon-button__indicator').exists()).toBe(false)
  })

  it('passes additional attributes to MuIconButton', () => {
    const attrs = {
      id: 'notification-btn',
      disabled: true,
      'data-testid': 'notification-button',
    }

    const wrapper = mount(MuNotificationButton, {
      props: {
        indicator: false,
      },
      attrs,
      shallow: true,
    })

    const iconButton = wrapper.findComponent({ name: 'MuIconButton' })
    expect(iconButton.attributes('id')).toBe('notification-btn')
    expect(iconButton.attributes('disabled')).toBeDefined()
    expect(iconButton.attributes('data-testid')).toBe('notification-button')
  })

  it('correctly combines the relative class with custom classes', () => {
    const wrapper = mount(MuNotificationButton, {
      props: {
        indicator: false,
      },
      attrs: {
        class: 'custom-class',
      },
      shallow: true,
    })

    const iconButton = wrapper.findComponent({ name: 'MuIconButton' })
    const classes = iconButton.attributes('class')
    expect(classes).toContain('relative')
    expect(classes).toContain('custom-class')
  })

  it('handles click events properly', async () => {
    const wrapper = mountComponent()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('updates indicator when props change', async () => {
    const wrapper = mountComponent({ indicator: false })
    expect(wrapper.find('.icon-button__indicator').exists()).toBe(false)

    await wrapper.setProps({ indicator: true })
    expect(wrapper.find('.icon-button__indicator').exists()).toBe(true)
  })
})
