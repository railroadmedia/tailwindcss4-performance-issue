import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import MuTextInput from './MuTextInput.vue'

describe('MuTextInput.vue', () => {
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuTextInput, {
      props,
      slots,
    })
  }

  it('renders a label when labelValue is provided', () => {
    const wrapper = mountComponent({ labelValue: 'Test Label', id: 'test' })
    const label = wrapper.find('#test-label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Test Label')
  })

  it('does not render a label when labelValue is empty', () => {
    const wrapper = mountComponent({ labelValue: '' })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('sets the initial value from props', () => {
    const wrapper = mountComponent({ initialValue: 'Hello World' })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('Hello World')
  })

  it('displays the info message when provided', () => {
    const wrapper = mountComponent({ infoMessage: 'Info text' })
    const infoMessage = wrapper.find('.text-input__message')
    expect(infoMessage.exists()).toBe(true)
    expect(infoMessage.text()).toBe('Info text')
  })

  it('applies disabled attribute and styles when disabled prop is true', () => {
    const wrapper = mountComponent({ disabled: true, labelValue: 'Label' })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
    const label = wrapper.find('.text-input__label')
    expect(label.classes()).toContain('text-input__label--disabled')
  })

  it('renders left icon slot when showLeftIcon is true', () => {
    const wrapper = mountComponent(
      { showLeftIcon: true },
      {
        leftIcon: '<span class="fake-icon">Icon</span>',
      }
    )
    const leftIcon = wrapper.find('.text-input__left-icon')
    expect(leftIcon.exists()).toBe(true)
    expect(leftIcon.html()).toContain('fake-icon')
  })

  it('emits onFocus when input is focused', async () => {
    const wrapper = mountComponent()
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper.emitted().onFocus).toBeTruthy()
  })

  it('emits onEnter when Enter key is pressed', async () => {
    const wrapper = mountComponent()
    const input = wrapper.find('input')
    await input.trigger('keypress', {
      key: 'Enter',
      preventDefault: () => {},
    })
    expect(wrapper.emitted().onEnter).toBeTruthy()
  })

  it('emits onChange when input value changes', async () => {
    const wrapper = mountComponent({ initialValue: 'Initial' })
    const input = wrapper.find('input')
    await input.setValue('New Value')
    await nextTick()
    expect(wrapper.emitted().onChange).toBeTruthy()
    const emitted = wrapper.emitted().onChange
    expect(emitted[emitted.length - 1]).toEqual(['New Value'])
  })

  it('clears the input when clear button is clicked', async () => {
    const wrapper = mountComponent({ initialValue: 'Clear me' })
    await nextTick()
    const clearButton = wrapper.find('.text-input__clear-button')
    expect(wrapper.find('input').element.value).toBe('Clear me')
    await clearButton.trigger('click', { preventDefault: () => {} })
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('')
    const emitted = wrapper.emitted().onChange
    expect(emitted[emitted.length - 1]).toEqual([''])
  })
})
