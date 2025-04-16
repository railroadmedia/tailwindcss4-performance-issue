import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuCheckBox from './MuCheckBox.vue'

describe('MuCheckBox', () => {
  // Default props for testing
  const defaultProps = {
    modelValue: false,
    label: 'Test Label',
    name: 'test-checkbox',
  }

  it('renders properly with default props', () => {
    const wrapper = mount(MuCheckBox, {
      props: defaultProps,
    })

    // Check if component renders
    expect(wrapper.exists()).toBe(true)

    // Check if label text is rendered
    expect(wrapper.text()).toContain('Test Label')

    // Check if input has correct attributes
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('name')).toBe('test-checkbox')
    expect(input.element.checked).toBe(false)
  })

  it('renders correctly when checked', () => {
    const wrapper = mount(MuCheckBox, {
      props: {
        ...defaultProps,
        modelValue: true,
      },
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect(input.element.checked).toBe(true)
  })

  it('emits update:modelValue event when clicked', async () => {
    const wrapper = mount(MuCheckBox, {
      props: defaultProps,
    })

    const input = wrapper.find('input[type="checkbox"]')

    // Simulate checkbox click
    await input.setValue(true)

    // Check if correct event was emitted
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])

    // Simulate unchecking
    await input.setValue(false)
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false])
  })

  it('updates when v-model changes externally', async () => {
    const wrapper = mount(MuCheckBox, {
      props: defaultProps,
    })

    // Change props
    await wrapper.setProps({ modelValue: true })

    const input = wrapper.find('input[type="checkbox"]')
    expect(input.element.checked).toBe(true)
  })

  it('works with empty name prop', () => {
    const wrapper = mount(MuCheckBox, {
      props: {
        modelValue: false,
        label: 'Test Label',
      },
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect(input.attributes('name')).toBe('')
  })

  it('preserves class bindings', () => {
    const wrapper = mount(MuCheckBox, {
      props: defaultProps,
    })

    const input = wrapper.find('input[type="checkbox"]')
    expect(input.classes()).toContain('checkbox__input')
  })

  it('handles rapid changes correctly', async () => {
    const wrapper = mount(MuCheckBox, {
      props: defaultProps,
    })

    const input = wrapper.find('input[type="checkbox"]')

    // Simulate multiple rapid changes
    await input.setValue(true)
    await input.setValue(false)
    await input.setValue(true)

    const emittedEvents = wrapper.emitted('update:modelValue')
    expect(emittedEvents?.length).toBe(3)
    expect(emittedEvents?.[2]).toEqual([true])
  })
})
