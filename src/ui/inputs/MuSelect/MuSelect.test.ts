import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuSelect from './MuSelect.vue'

describe('MuSelect', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  const mountComponent = (props = {}) => {
    return mount(MuSelect, {
      props: {
        modelValue: '',
        options: defaultOptions,
        ...props,
      },
    })
  }

  it('renders properly with required props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('select').classes()).toContain('form-select')
  })

  it('binds all props correctly to the select element', () => {
    const props = {
      modelValue: 'option2',
      name: 'country',
      disabled: true,
      required: true,
    }

    const wrapper = mountComponent(props)
    const select = wrapper.find('select')

    expect(select.element.value).toBe(props.modelValue)
    expect(select.attributes('name')).toBe(props.name)
    expect(select.attributes('disabled')).toBeDefined()
    expect(select.attributes('required')).toBeDefined()
  })

  it('renders options correctly', () => {
    const wrapper = mountComponent()
    const options = wrapper.findAll('option')

    // No placeholder, so options count should match defaultOptions length
    expect(options.length).toBe(defaultOptions.length)

    defaultOptions.forEach((option, index) => {
      expect(options[index].attributes('value')).toBe(option.value.toString())
      expect(options[index].text()).toBe(option.label)
    })
  })

  it('renders placeholder option when provided', () => {
    const placeholder = 'Select an option'
    const wrapper = mountComponent({ placeholder })
    const options = wrapper.findAll('option')

    // Should have placeholder + default options
    expect(options.length).toBe(defaultOptions.length + 1)

    // First option should be the placeholder
    expect(options[0].attributes('value')).toBe('')
    expect(options[0].attributes('disabled')).toBeDefined()
    expect(options[0].attributes('selected')).toBeDefined()
    expect(options[0].text()).toBe(placeholder)
  })

  it('emits update:modelValue event on change', async () => {
    const wrapper = mountComponent()
    const select = wrapper.find('select')
    const newValue = 'option3'

    await select.setValue(newValue)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([newValue])
  })

  it('applies error class when error prop is provided', () => {
    const wrapper = mountComponent({ error: 'This field is invalid' })
    const select = wrapper.find('select')

    expect(select.classes()).toContain('form-select--error')
  })

  it('does not apply error class when error prop is empty', () => {
    const wrapper = mountComponent({ error: '' })
    const select = wrapper.find('select')

    expect(select.classes()).not.toContain('form-select--error')
  })

  it('supports numeric option values', () => {
    const numericOptions = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
    ]

    const wrapper = mountComponent({
      options: numericOptions,
      modelValue: 2,
    })

    const select = wrapper.find('select')
    const options = wrapper.findAll('option')

    expect(select.element.value).toBe('2')
    expect(options.length).toBe(numericOptions.length)

    numericOptions.forEach((option, index) => {
      expect(options[index].attributes('value')).toBe(option.value.toString())
      expect(options[index].text()).toBe(option.label)
    })
  })

  it('works with empty options array', () => {
    const wrapper = mountComponent({ options: [] })
    const options = wrapper.findAll('option')

    expect(options.length).toBe(0)
  })

  it('correctly updates when new options are provided', async () => {
    const wrapper = mountComponent()

    const newOptions = [
      { value: 'new1', label: 'New Option 1' },
      { value: 'new2', label: 'New Option 2' },
    ]

    await wrapper.setProps({ options: newOptions })

    const options = wrapper.findAll('option')
    expect(options.length).toBe(newOptions.length)

    newOptions.forEach((option, index) => {
      expect(options[index].attributes('value')).toBe(option.value.toString())
      expect(options[index].text()).toBe(option.label)
    })
  })

  it('correctly updates when modelValue changes', async () => {
    const wrapper = mountComponent({ modelValue: 'option1' })
    expect(wrapper.find('select').element.value).toBe('option1')

    await wrapper.setProps({ modelValue: 'option2' })
    expect(wrapper.find('select').element.value).toBe('option2')
  })
})
