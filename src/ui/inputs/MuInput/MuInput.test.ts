import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuInput from './MuInput.vue'

describe('MuInput', () => {
  const mountComponent = (props = {}) => {
    return mount(MuInput, {
      props: {
        modelValue: '',
        ...props,
      },
    })
  }

  it('renders properly with required props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').classes()).toContain('form-input')
  })

  it('binds all props correctly to the input element', () => {
    const props = {
      modelValue: 'test value',
      name: 'username',
      type: 'email',
      placeholder: 'Enter email',
      disabled: true,
      required: true,
      maxLength: 50,
      minLength: 5,
    }

    const wrapper = mountComponent(props)
    const input = wrapper.find('input')

    expect(input.element.value).toBe(props.modelValue)
    expect(input.attributes('name')).toBe(props.name)
    expect(input.attributes('type')).toBe(props.type)
    expect(input.attributes('placeholder')).toBe(props.placeholder)
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('maxlength')).toBe(props.maxLength.toString())
    expect(input.attributes('minlength')).toBe(props.minLength.toString())
  })

  it('emits update:modelValue event on input', async () => {
    const wrapper = mountComponent()
    const input = wrapper.find('input')
    const newValue = 'New Input Value'

    await input.setValue(newValue)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([newValue])
  })

  it('applies error class when error prop is provided', () => {
    const wrapper = mountComponent({ error: 'This field is invalid' })
    const input = wrapper.find('input')

    expect(input.classes()).toContain('form-input--error')
  })

  it('does not apply error class when error prop is empty', () => {
    const wrapper = mountComponent({ error: '' })
    const input = wrapper.find('input')

    expect(input.classes()).not.toContain('form-input--error')
  })

  it('uses text type by default', () => {
    const wrapper = mountComponent()
    const input = wrapper.find('input')

    expect(input.attributes('type')).toBe('text')
  })

  it('supports different input types', () => {
    const types = ['text', 'email', 'password', 'number']

    types.forEach((type) => {
      const wrapper = mountComponent({ type })
      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe(type)
    })
  })

  it('disables the input when disabled prop is true', () => {
    const wrapper = mountComponent({ disabled: true })
    const input = wrapper.find('input')

    expect(input.attributes('disabled')).toBeDefined()
  })

  it('handles numeric modelValue', () => {
    const numericValue = 42
    const wrapper = mountComponent({ modelValue: numericValue })
    const input = wrapper.find('input')

    expect(input.element.value).toBe(numericValue.toString())
  })

  it('correctly updates with new prop values', async () => {
    const wrapper = mountComponent({ modelValue: 'initial value' })
    expect(wrapper.find('input').element.value).toBe('initial value')

    await wrapper.setProps({ modelValue: 'updated value' })
    expect(wrapper.find('input').element.value).toBe('updated value')
  })

  it('handles empty props correctly', () => {
    const wrapper = mountComponent({
      name: '',
      placeholder: '',
      maxLength: undefined,
      minLength: undefined,
    })

    const input = wrapper.find('input')
    expect(input.attributes('name')).toBe('')
    expect(input.attributes('placeholder')).toBe('')
    expect(input.attributes('maxlength')).toBeUndefined()
    expect(input.attributes('minlength')).toBeUndefined()
  })
})
