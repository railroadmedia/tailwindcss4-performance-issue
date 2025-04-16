import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import MuTextarea from './MuTextarea.vue'

describe('MuTextarea', () => {
  beforeEach(() => {
    // Reset mocks between tests
    vi.clearAllMocks()
  })

  const mountComponent = (props = {}) => {
    return mount(MuTextarea, {
      props: {
        modelValue: '',
        ...props,
      },
    })
  }

  it('renders properly with required props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('textarea').classes()).toContain('form-textarea')
  })

  it('binds all props correctly to the textarea element', () => {
    const props = {
      modelValue: 'test content',
      name: 'comments',
      placeholder: 'Enter comments',
      disabled: true,
      required: true,
      rows: 5,
      maxLength: 200,
    }

    const wrapper = mountComponent(props)
    const textarea = wrapper.find('textarea')

    expect(textarea.element.value).toBe(props.modelValue)
    expect(textarea.attributes('name')).toBe(props.name)
    expect(textarea.attributes('placeholder')).toBe(props.placeholder)
    expect(textarea.attributes('disabled')).toBeDefined()
    expect(textarea.attributes('required')).toBeDefined()
    expect(textarea.attributes('rows')).toBe(props.rows.toString())
    expect(textarea.attributes('maxlength')).toBe(props.maxLength.toString())
  })

  it('emits update:modelValue event on input', async () => {
    const wrapper = mountComponent()
    const textarea = wrapper.find('textarea')
    const newValue = 'New Textarea Content'

    await textarea.setValue(newValue)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([newValue])
  })

  it('applies error class when error prop is provided', () => {
    const wrapper = mountComponent({ error: 'This field is invalid' })
    const textarea = wrapper.find('textarea')

    expect(textarea.classes()).toContain('form-textarea--error')
  })

  it('does not apply error class when error prop is empty', () => {
    const wrapper = mountComponent({ error: '' })
    const textarea = wrapper.find('textarea')

    expect(textarea.classes()).not.toContain('form-textarea--error')
  })

  it('uses default rows value when not specified', () => {
    const wrapper = mountComponent()
    const textarea = wrapper.find('textarea')

    expect(textarea.attributes('rows')).toBe('3')
  })

  it('auto-resizes when autoResize is true', async () => {
    // Mock scrollHeight
    const mockScrollHeight = 100
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get: function () {
        return mockScrollHeight
      },
    })

    const wrapper = mountComponent({ autoResize: true })
    const textarea = wrapper.find('textarea')

    // Wait for onMounted to execute
    await nextTick()

    expect(textarea.element.style.height).toBe(`${mockScrollHeight}px`)

    // Reset mock to avoid affecting other tests
    delete Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight')
  })

  it('calls adjustHeight when modelValue changes and autoResize is true', async () => {
    // Mock scrollHeight
    const mockScrollHeight = 120
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get: function () {
        return mockScrollHeight
      },
    })

    const wrapper = mountComponent({
      modelValue: 'Initial text',
      autoResize: true,
    })

    await nextTick()

    // Change the modelValue
    await wrapper.setProps({ modelValue: 'Updated with more content' })
    await nextTick()

    expect(wrapper.find('textarea').element.style.height).toBe(`${mockScrollHeight}px`)

    // Reset mock
    delete Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight')
  })

  it('does not auto-resize when autoResize is false', async () => {
    const wrapper = mountComponent({ autoResize: false })
    const textarea = wrapper.find('textarea')

    await nextTick()

    expect(textarea.element.style.height).toBe('')
  })

  it('adjusts height on input when autoResize is true', async () => {
    // Mock scrollHeight
    const mockScrollHeight = 150
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get: function () {
        return mockScrollHeight
      },
    })

    const wrapper = mountComponent({ autoResize: true })
    const textarea = wrapper.find('textarea')

    await textarea.setValue('New input with lots of content to test auto-resize')
    await nextTick()

    expect(textarea.element.style.height).toBe(`${mockScrollHeight}px`)

    // Reset mock
    delete Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight')
  })

  it('correctly updates with new prop values', async () => {
    const wrapper = mountComponent({ modelValue: 'initial value' })
    expect(wrapper.find('textarea').element.value).toBe('initial value')

    await wrapper.setProps({ modelValue: 'updated value' })
    expect(wrapper.find('textarea').element.value).toBe('updated value')
  })
})
