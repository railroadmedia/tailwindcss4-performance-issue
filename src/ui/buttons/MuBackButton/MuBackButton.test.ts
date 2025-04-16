import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuBackButton from './MuBackButton.vue'

describe('MuBackButton', () => {
  const mountComponent = (attrs = {}) => {
    return mount(MuBackButton, {
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
    const wrapper = mount(MuBackButton, {
      shallow: true,
    })

    const iconButton = wrapper.findComponent({ name: 'MuIconButton' })
    expect(iconButton.props('iconName')).toBe('arrow-left')
    expect(iconButton.props('label')).toBe('Back')
    expect(iconButton.props('size')).toBe('md')
  })

  it('passes additional attributes to MuIconButton', () => {
    const attrs = {
      class: 'custom-class',
      disabled: true,
      'data-testid': 'back-button',
    }

    const wrapper = mount(MuBackButton, {
      attrs,
      shallow: true,
    })

    const iconButton = wrapper.findComponent({ name: 'MuIconButton' })
    expect(iconButton.attributes('class')).toContain('custom-class')
    expect(iconButton.attributes('disabled')).toBeDefined()
    expect(iconButton.attributes('data-testid')).toBe('back-button')
  })

  it('handles click events properly', async () => {
    const wrapper = mountComponent()
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('combines default and custom classes correctly', () => {
    const wrapper = mountComponent({ class: 'additional-class' })
    const iconButton = wrapper.findComponent('.mu-icon-button-stub')

    const classes = iconButton.attributes('class')
    expect(classes).toContain('mu-icon-button-stub')
    expect(classes).toContain('additional-class')
  })

  it('passes through event listeners', async () => {
    const wrapper = mountComponent()

    await wrapper.trigger('mouseenter')
    expect(wrapper.emitted('mouseenter')).toBeTruthy()

    await wrapper.trigger('mouseleave')
    expect(wrapper.emitted('mouseleave')).toBeTruthy()
  })
})
