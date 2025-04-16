import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuSettingsButton from './MuSettingsButton.vue'

describe('MuSettingsButton', () => {
  const mountComponent = (attrs = {}) => {
    return mount(MuSettingsButton, {
      attrs,
      global: {
        stubs: {
          MuIconButton: {
            template: '<button class="mu-icon-button-stub"><slot /></button>',
            props: ['iconName', 'label', 'size'],
          },
        },
      },
    })
  }

  it('renders properly', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent('.mu-icon-button-stub').exists()).toBe(true)
  })

  it('passes the correct default props to MuIconButton', () => {
    const wrapper = mount(MuSettingsButton, {
      shallow: true,
    })

    const iconButton = wrapper.findComponent({ name: 'MuIconButton' })
    expect(iconButton.props('iconName')).toBe('settings')
    expect(iconButton.props('label')).toBe('Open settings')
    expect(iconButton.props('size')).toBe('md')
  })

  it('passes additional attributes to MuIconButton', () => {
    const attrs = {
      class: 'custom-class',
      disabled: true,
      'data-testid': 'settings-button',
    }

    const wrapper = mount(MuSettingsButton, {
      attrs,
      shallow: true,
    })

    const iconButton = wrapper.findComponent({ name: 'MuIconButton' })
    expect(iconButton.attributes('class')).toContain('custom-class')
    expect(iconButton.attributes('disabled')).toBeDefined()
    expect(iconButton.attributes('data-testid')).toBe('settings-button')
  })

  it('handles click events properly', async () => {
    const wrapper = mountComponent()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('passes through event listeners', async () => {
    const wrapper = mountComponent()

    await wrapper.trigger('mouseenter')
    expect(wrapper.emitted('mouseenter')).toBeTruthy()

    await wrapper.trigger('mouseleave')
    expect(wrapper.emitted('mouseleave')).toBeTruthy()
  })
})
