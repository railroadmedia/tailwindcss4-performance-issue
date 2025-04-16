import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuTabButton from './MuTabButton.vue'

describe('MuTabButton', () => {
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuTabButton, {
      props: {
        selectedTab: false,
        isCircle: false,
        to: '/test-route',
        ...props,
      },
      slots: {
        default: '<span>Tab Content</span>',
        ...slots,
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a :href="to" class="router-link-stub"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
  }

  it('renders properly with initial props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('a.router-link-stub').exists()).toBe(true)
  })

  it('renders the slot content correctly', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('a').text()).toContain('Tab Content')
  })

  it('applies the correct class when selectedTab is true', () => {
    const wrapper = mountComponent({ selectedTab: true })
    expect(wrapper.find('a').classes()).toContain('tab-button--selected')
  })

  it('does not apply the selected class when selectedTab is false', () => {
    const wrapper = mountComponent({ selectedTab: false })
    expect(wrapper.find('a').classes()).not.toContain('tab-button--selected')
  })

  it('applies the correct class when isCircle is true', () => {
    const wrapper = mountComponent({ isCircle: true })
    expect(wrapper.find('a').classes()).toContain('tab-button--circle')
  })

  it('does not apply the circle class when isCircle is false', () => {
    const wrapper = mountComponent({ isCircle: false })
    expect(wrapper.find('a').classes()).not.toContain('tab-button--circle')
  })

  it('passes the "to" prop correctly to the RouterLink', () => {
    const testRoute = '/custom-route'
    const wrapper = mountComponent({ to: testRoute })
    expect(wrapper.find('a').attributes('href')).toBe(testRoute)
  })

  it('applies default "to" prop value when not specified', () => {
    const wrapper = mountComponent({ to: undefined })
    expect(wrapper.find('a').attributes('href')).toBe('')
  })

  it('combines selectedTab and isCircle classes correctly', () => {
    const wrapper = mountComponent({ selectedTab: true, isCircle: true })
    const classes = wrapper.find('a').classes()
    expect(classes).toContain('tab-button--selected')
    expect(classes).toContain('tab-button--circle')
  })

  it('renders custom slot content', () => {
    const customContent = '<div class="custom-content">Custom Tab</div>'
    const wrapper = mountComponent({}, { default: customContent })
    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toBe('Custom Tab')
  })
})
