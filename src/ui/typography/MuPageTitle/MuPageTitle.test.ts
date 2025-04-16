import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MuPageTitle from './MuPageTitle.vue'

describe('MuPageTitle', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(MuPageTitle)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders an h1 element', () => {
    const wrapper = shallowMount(MuPageTitle)
    expect(wrapper.element.tagName).toBe('H1')
  })

  it('renders the slot content', () => {
    const wrapper = shallowMount(MuPageTitle, {
      slots: {
        default: 'Test Title',
      },
    })
    expect(wrapper.text()).toBe('Test Title')
  })

  it('applies the correct size classes', () => {
    // Default size (base)
    const defaultWrapper = shallowMount(MuPageTitle)
    expect(defaultWrapper.classes()).toContain('page-title-base')

    // Small size
    const smallWrapper = shallowMount(MuPageTitle, {
      props: {
        size: 'sm',
      },
    })
    expect(smallWrapper.classes()).toContain('page-title-sm')

    // Large size
    const largeWrapper = shallowMount(MuPageTitle, {
      props: {
        size: 'lg',
      },
    })
    expect(largeWrapper.classes()).toContain('page-title-lg')
  })

  it('applies the correct margin classes', () => {
    // Default margin
    const defaultWrapper = shallowMount(MuPageTitle)
    expect(defaultWrapper.classes()).toContain('mb-4')

    // Custom margin
    const customMarginWrapper = shallowMount(MuPageTitle, {
      attrs: {
        class: 'mb-8',
      },
    })
    expect(customMarginWrapper.classes()).toContain('mb-8')
  })

  it('combines size and custom class correctly', () => {
    const wrapper = shallowMount(MuPageTitle, {
      props: {
        size: 'lg',
      },
      attrs: {
        class: 'mb-8',
      },
    })

    expect(wrapper.classes()).toContain('page-title-lg')
    expect(wrapper.classes()).toContain('mb-8')
  })
})
