import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import MuPillGroup from './MuPillGroup.vue'
import MuPill from './MuPill.vue'

vi.mock('@/ui/typography/MuSvgIconV2/MuSvgIconV2.vue', () => ({
  default: {
    name: 'MuSvgIconV2',
    template: '<span class="mock-icon" />',
  },
}))

describe('MuPillGroup', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', icon: 'icon-test' },
    { value: 'option3', label: 'Option 3' },
  ]

  it('renders correctly with default props', () => {
    const wrapper = mount(MuPillGroup, {
      props: {
        modelValue: 'option1',
        options: defaultOptions,
      },
    })

    expect(wrapper.findAllComponents(MuPill)).toHaveLength(3)
    expect(wrapper.findAllComponents(MuPill)[0].props('selected')).toBe(true)
    expect(wrapper.findAllComponents(MuPill)[0].text()).toBe('Option 1')
  })

  it('emits update:modelValue when pill is selected', async () => {
    const wrapper = mount(MuPillGroup, {
      props: {
        modelValue: 'option1',
        options: defaultOptions,
      },
    })

    await wrapper.findAllComponents(MuPill)[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option2'])
  })

  it('correctly handles disabled state', () => {
    const wrapper = mount(MuPillGroup, {
      props: {
        modelValue: 'option1',
        options: defaultOptions,
        disabled: true,
      },
    })

    const pills = wrapper.findAllComponents(MuPill)
    pills.forEach((pill) => {
      expect(pill.props('disabled')).toBe(true)
    })
  })
})
