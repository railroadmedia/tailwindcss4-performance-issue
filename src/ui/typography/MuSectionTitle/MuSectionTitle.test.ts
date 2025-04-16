import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MuSectionTitle from './MuSectionTitle.vue'

describe('MuSectionTitle', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(MuSectionTitle)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders an h3 element', () => {
    const wrapper = shallowMount(MuSectionTitle)
    expect(wrapper.element.tagName).toBe('H3')
  })

  it('renders the slot content', () => {
    const wrapper = shallowMount(MuSectionTitle, {
      slots: {
        default: 'Section Title',
      },
    })
    expect(wrapper.text()).toBe('Section Title')
  })

  it('has the correct classes', () => {
    const wrapper = shallowMount(MuSectionTitle)
    expect(wrapper.classes()).toContain('font-extrabold')
    expect(wrapper.classes()).toContain('text-base')
    expect(wrapper.classes()).toContain('sm:text-lg')
  })
})
