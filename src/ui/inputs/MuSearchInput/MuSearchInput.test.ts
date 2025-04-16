import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import MuSearchInput from './MuSearchInput.vue'

describe('MuSearchInput.vue', () => {
  const factory = (props = {}) => {
    return mount(MuSearchInput, {
      props,
      global: {
        stubs: {
          MagnifyingGlassIcon: {
            name: 'MagnifyingGlassIcon',
            template: `<div class="magnifying-glass-icon-stub"></div>`,
          },
        },
      },
    })
  }

  it('renders a form with the correct action attribute', () => {
    const wrapper = factory({ searchFormUrl: '/search' })
    const form = wrapper.find('form')
    expect(form.attributes('action')).toBe('/search')
  })

  it('emits search event when the left icon is clicked and input has a value', async () => {
    const wrapper = factory({ searchFormUrl: '/search' })
    await wrapper.setProps({ modelValue: 'hello' })

    const leftIcon = wrapper.find('.mu-search-input__left-icon')
    await leftIcon.trigger('click')
    await flushPromises()

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['hello'])
  })

  it('does not emit search event when the left icon is clicked and input is empty', async () => {
    const wrapper = factory({ searchFormUrl: '/search' })

    const leftIcon = wrapper.find('.mu-search-input__left-icon')
    await leftIcon.trigger('click')
    await flushPromises()

    expect(wrapper.emitted('search')).toBeFalsy()
  })
})
