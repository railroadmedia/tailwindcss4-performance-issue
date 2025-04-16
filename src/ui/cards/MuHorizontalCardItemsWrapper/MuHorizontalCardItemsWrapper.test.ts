import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MuHorizontalCardItemsWrapper from './MuHorizontalCardItemsWrapper.vue'

describe('MuHorizontalCardItemsWrapper', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(MuHorizontalCardItemsWrapper)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('horizontal-card-items-wrapper')
  })

  it('renders the content section without header by default', () => {
    const wrapper = shallowMount(MuHorizontalCardItemsWrapper)
    const content = wrapper.find('.horizontal-card-items-wrapper__content')

    expect(content.exists()).toBe(true)
    expect(content.classes()).not.toContain('has-header')
    expect(wrapper.find('.horizontal-card-items-wrapper__header').exists()).toBe(false)
  })

  it('renders the header when title slot is provided', () => {
    const wrapper = shallowMount(MuHorizontalCardItemsWrapper, {
      slots: {
        title: 'Test Title',
      },
    })

    const header = wrapper.find('.horizontal-card-items-wrapper__header')
    expect(header.exists()).toBe(true)

    const title = wrapper.find('.horizontal-card-items-wrapper__title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Test Title')

    const content = wrapper.find('.horizontal-card-items-wrapper__content')
    expect(content.classes()).toContain('has-header')
  })

  it('renders the actions slot in header', () => {
    const wrapper = shallowMount(MuHorizontalCardItemsWrapper, {
      slots: {
        title: 'Test Title',
        actions: '<button>Action</button>',
      },
    })

    const header = wrapper.find('.horizontal-card-items-wrapper__header')
    expect(header.exists()).toBe(true)
    expect(header.html()).toContain('<button>Action</button>')
  })

  it('adds has-header class when only actions slot is provided', () => {
    const wrapper = shallowMount(MuHorizontalCardItemsWrapper, {
      slots: {
        actions: '<button>Action</button>',
      },
    })

    const content = wrapper.find('.horizontal-card-items-wrapper__content')
    expect(content.classes()).toContain('has-header')
  })

  it('renders default slot content', () => {
    const wrapper = shallowMount(MuHorizontalCardItemsWrapper, {
      slots: {
        default: '<div class="test-content">Content</div>',
      },
    })

    const content = wrapper.find('.horizontal-card-items-wrapper__content')
    expect(content.html()).toContain('<div class="test-content">Content</div>')
  })
})
