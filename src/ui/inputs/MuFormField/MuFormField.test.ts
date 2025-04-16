import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuFormField from './MuFormField.vue'

describe('MuFormField', () => {
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuFormField, {
      props,
      slots: {
        default: '<input type="text" class="test-input" />',
        ...slots,
      },
      global: {
        mocks: {
          $t: (key) => key, // Mock translation function to return the key
        },
      },
    })
  }

  it('renders properly with default props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.form-field').exists()).toBe(true)
    expect(wrapper.find('.form-field__content').exists()).toBe(true)
  })

  it('renders slot content correctly', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.test-input').exists()).toBe(true)
  })

  it('does not render label when label prop is empty', () => {
    const wrapper = mountComponent({ label: '' })
    expect(wrapper.find('.form-field__label').exists()).toBe(false)
  })

  it('renders label when label prop is provided', () => {
    const label = 'Field Label'
    const wrapper = mountComponent({ label })

    expect(wrapper.find('.form-field__label').exists()).toBe(true)
    expect(wrapper.find('.label-text').text()).toBe(label)
  })

  it('translates the label using $t', () => {
    const label = 'field.label.key'
    const wrapper = mountComponent({ label })

    expect(wrapper.find('.label-text').text()).toBe(label)
  })

  it('shows required asterisk when required prop is true', () => {
    const wrapper = mountComponent({ label: 'Test Label', required: true })

    expect(wrapper.find('.text-error').exists()).toBe(true)
    expect(wrapper.find('.text-error').text()).toBe('*')
  })

  it('does not show required asterisk when required prop is false', () => {
    const wrapper = mountComponent({ label: 'Test Label', required: false })
    expect(wrapper.find('.text-error').exists()).toBe(false)
  })

  it('does not render error message when error prop is empty', () => {
    const wrapper = mountComponent({ error: '' })
    expect(wrapper.find('.form-field__error').exists()).toBe(false)
  })

  it('renders error message when error prop is provided', () => {
    const error = 'This field is required'
    const wrapper = mountComponent({ error })

    expect(wrapper.find('.form-field__error').exists()).toBe(true)
    expect(wrapper.find('.form-field__error').text()).toBe(error)
  })

  it('does not render description when description prop is empty', () => {
    const wrapper = mountComponent({ description: '' })
    expect(wrapper.find('.form-field__description').exists()).toBe(false)
  })

  it('renders description when description prop is provided', () => {
    const description = 'Enter your full name'
    const wrapper = mountComponent({ description })

    expect(wrapper.find('.form-field__description').exists()).toBe(true)
    expect(wrapper.find('.form-field__description').text()).toBe(description)
  })

  it('applies the correct CSS classes', () => {
    const wrapper = mountComponent({
      label: 'Test Label',
      error: 'Test Error',
      description: 'Test Description',
    })

    expect(wrapper.find('.form-field').classes()).toContain('form-field')
    expect(wrapper.find('.form-field__label').classes()).toContain('form-field__label')
    expect(wrapper.find('.form-field__error').classes()).toContain('form-field__error')
    expect(wrapper.find('.form-field__description').classes()).toContain('form-field__description')
  })

  it('renders all elements when all props are provided', () => {
    const props = {
      label: 'Test Label',
      error: 'Test Error',
      description: 'Test Description',
      required: true,
    }

    const wrapper = mountComponent(props)

    expect(wrapper.find('.form-field__label').exists()).toBe(true)
    expect(wrapper.find('.text-error').exists()).toBe(true)
    expect(wrapper.find('.form-field__error').exists()).toBe(true)
    expect(wrapper.find('.form-field__description').exists()).toBe(true)
  })

  it('renders custom slot content', () => {
    const customInput = '<select class="custom-select"><option>Option 1</option></select>'
    const wrapper = mountComponent({}, { default: customInput })

    expect(wrapper.find('.custom-select').exists()).toBe(true)
  })
})
