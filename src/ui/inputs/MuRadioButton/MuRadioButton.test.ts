import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RadioButton from './MuRadioButton.vue'

describe('RadioButton', () => {
  const defaultProps = {
    modelValue: '',
    label: 'Test Option',
    value: 'test',
    name: 'test-radio',
  }

  it('renders properly with default props', () => {
    const wrapper = mount(RadioButton, {
      props: defaultProps,
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Option')

    const input = wrapper.find('input[type="radio"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('name')).toBe('test-radio')
    expect(input.element.checked).toBe(false)
  })

  it('renders correctly when selected', () => {
    const wrapper = mount(RadioButton, {
      props: {
        ...defaultProps,
        modelValue: 'test',
      },
    })

    const input = wrapper.find('input[type="radio"]')
    expect(input.element.checked).toBe(true)
  })

  it('emits update:modelValue event when clicked', async () => {
    const wrapper = mount(RadioButton, {
      props: defaultProps,
    })

    const input = wrapper.find('input[type="radio"]')
    await input.setValue(true)

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test'])
  })

  it('handles numeric values correctly', async () => {
    const wrapper = mount(RadioButton, {
      props: {
        ...defaultProps,
        value: 123,
        modelValue: 0,
      },
    })

    const input = wrapper.find('input[type="radio"]')
    await input.setValue(true)

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['123'])
  })

  it('updates when v-model changes externally', async () => {
    const wrapper = mount(RadioButton, {
      props: defaultProps,
    })

    await wrapper.setProps({ modelValue: 'test' })

    const input = wrapper.find('input[type="radio"]')
    expect(input.element.checked).toBe(true)
  })

  it('works with default name prop', () => {
    const wrapper = mount(RadioButton, {
      props: {
        modelValue: '',
        label: 'Test Option',
        value: 'test',
      },
    })

    const input = wrapper.find('input[type="radio"]')
    expect(input.attributes('name')).toBe('radio-button')
  })

  it('preserves BEM class structure', () => {
    const wrapper = mount(RadioButton, {
      props: defaultProps,
    })

    expect(wrapper.classes()).toContain('radio-button')
    const input = wrapper.find('input')
    expect(input.classes()).toContain('radio-button__input')
    const label = wrapper.find('span')
    expect(label.classes()).toContain('radio-button__label')
  })
})
