import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import MuTimePicker from './MuTimePicker.vue'

// Mock MuIconButton component
vi.mock('@/ui/buttons/MuIconButton/MuIconButton.vue', () => ({
  default: {
    name: 'MuIconButton',
    props: ['iconName', 'type', 'size'],
    template: '<button class="mu-icon-button"><slot /></button>',
  },
}))

describe('MuTimePicker', () => {
  it('renders properly with default values', () => {
    const wrapper = mount(MuTimePicker)
    expect(wrapper.find('.mu-time-picker').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.vm.modelValue).toBe('0:00')
  })

  it('emits update:modelValue when time is changed', async () => {
    const wrapper = mount(MuTimePicker, {
      props: {
        modelValue: '1:30',
      },
    })

    // Using mocked button instead of original icon button
    await wrapper.findAll('.mu-icon-button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2:00'])
  })

  it('handles keyboard arrow controls', async () => {
    const wrapper = mount(MuTimePicker, {
      props: {
        modelValue: '1:00',
      },
    })

    const minutesInput = wrapper.find('input:first-child')
    await minutesInput.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2:00'])

    await minutesInput.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual(['1:00'])
  })

  it('validates input values', async () => {
    const wrapper = mount(MuTimePicker)

    const minutesInput = wrapper.find('input:first-child')
    await minutesInput.setValue('61')
    expect(wrapper.vm.minutes).toBe(0)

    const secondsInput = wrapper.find('input:last-child')
    await secondsInput.setValue('61')
    expect(wrapper.vm.seconds).toBe(0)
  })

  it('respects step prop when incrementing/decrementing', async () => {
    const wrapper = mount(MuTimePicker, {
      props: {
        modelValue: '1:00',
        step: 15,
      },
    })

    // Using mocked button instead of original icon button
    await wrapper.findAll('.mu-icon-button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1:15'])
  })
})
