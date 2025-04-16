import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import MuPill from './MuPill.vue'

vi.mock('@/ui/typography/MuSvgIconV2/MuSvgIconV2.vue', () => ({
  default: {
    name: 'MuSvgIconV2',
    template: '<span class="mock-icon" />',
  },
}))

describe('MuPill', () => {
  it('renders correctly with label only', () => {
    const wrapper = mount(MuPill, {
      props: {
        label: 'Test Label',
      },
    })

    expect(wrapper.text()).toContain('Test Label')
    expect(wrapper.find('.mu-pill__icon').exists()).toBe(false)
    expect(wrapper.classes()).toContain('mu-pill')
    expect(wrapper.props('selected')).toBe(false)
    expect(wrapper.props('disabled')).toBe(false)
  })

  it('renders with icon when provided', () => {
    const wrapper = mount(MuPill, {
      props: {
        label: 'Test Label',
        icon: 'test-icon',
      },
    })

    expect(wrapper.find('.mu-pill__icon').exists()).toBe(true)
  })

  it('emits select event when clicked', async () => {
    const wrapper = mount(MuPill, {
      props: {
        label: 'Test Label',
      },
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('applies correct classes when selected', () => {
    const wrapper = mount(MuPill, {
      props: {
        label: 'Test Label',
        selected: true,
      },
    })

    expect(wrapper.classes()).toContain('mu-pill--selected')
  })

  it('handles disabled state correctly', async () => {
    const wrapper = mount(MuPill, {
      props: {
        label: 'Test Label',
        disabled: true,
      },
    })

    expect(wrapper.classes()).toContain('mu-pill--disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
  })
})
