import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuItemCardHorizontal from './MuItemCardHorizontal.vue'

describe('MuItemCardHorizontal', () => {
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuItemCardHorizontal, {
      props: {
        title: 'Test Title',
        ...props,
      },
      slots,
      global: {
        stubs: {
          RouterLink: {
            template: '<a :href="to" class="router-link-stub"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
  }

  it('renders properly with required props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.item_card_horizontal').exists()).toBe(true)
    expect(wrapper.find('.item_card_horizontal__title').text()).toBe('Test Title')
  })

  it('applies the correct size class', () => {
    // Test small size
    const wrapperSm = mountComponent({ size: 'sm' })
    expect(wrapperSm.find('.item_card_horizontal--sm').exists()).toBe(true)

    // Test medium size (default)
    const wrapperMd = mountComponent()
    expect(wrapperMd.find('.item_card_horizontal--md').exists()).toBe(true)

    // Test large size
    const wrapperLg = mountComponent({ size: 'lg' })
    expect(wrapperLg.find('.item_card_horizontal--lg').exists()).toBe(true)
  })

  it('renders RouterLink when url is provided', () => {
    const url = '/test-url'
    const wrapper = mountComponent({ url })

    const link = wrapper.find('a.router-link-stub')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe(url)
    expect(link.text()).toBe('Test Title')
  })

  it('renders span when url is not provided', () => {
    const wrapper = mountComponent({ url: undefined })

    expect(wrapper.find('a.router-link-stub').exists()).toBe(false)
    const span = wrapper.find('span.item_card_horizontal__title')
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('Test Title')
  })

  it('renders preview slot content', () => {
    const previewContent = '<div class="preview-content">Preview</div>'
    const wrapper = mountComponent(
      {},
      {
        preview: previewContent,
      }
    )

    expect(wrapper.find('.item_card_horizontal__preview').exists()).toBe(true)
    expect(wrapper.find('.preview-content').exists()).toBe(true)
    expect(wrapper.find('.preview-content').text()).toBe('Preview')
  })

  it('renders meta slot content', () => {
    const metaContent = '<div class="meta-content">Meta Information</div>'
    const wrapper = mountComponent(
      {},
      {
        meta: metaContent,
      }
    )

    expect(wrapper.find('.item_card_horizontal__meta').exists()).toBe(true)
    expect(wrapper.find('.meta-content').exists()).toBe(true)
    expect(wrapper.find('.meta-content').text()).toBe('Meta Information')
  })

  it('renders actions slot content', () => {
    const actionsContent = '<button class="action-button">Action</button>'
    const wrapper = mountComponent(
      {},
      {
        actions: actionsContent,
      }
    )

    expect(wrapper.find('.item_card_horizontal__actions').exists()).toBe(true)
    expect(wrapper.find('.action-button').exists()).toBe(true)
    expect(wrapper.find('.action-button').text()).toBe('Action')
  })

  it('handles multiple slots simultaneously', () => {
    const slots = {
      preview: '<img class="preview-image" src="test.jpg" alt="Test" />',
      meta: '<span class="meta-text">Meta</span>',
      actions: '<button class="action-btn">Click</button>',
    }

    const wrapper = mountComponent({}, slots)

    expect(wrapper.find('.preview-image').exists()).toBe(true)
    expect(wrapper.find('.meta-text').exists()).toBe(true)
    expect(wrapper.find('.action-btn').exists()).toBe(true)
  })

  it('maintains the basic structure for all size variants', () => {
    ;['sm', 'md', 'lg'].forEach((size) => {
      const wrapper = mountComponent({ size })

      expect(wrapper.find('.item_card_horizontal__preview').exists()).toBe(true)
      expect(wrapper.find('.item_card_horizontal__content').exists()).toBe(true)
      expect(wrapper.find('.item_card_horizontal__info').exists()).toBe(true)
      expect(wrapper.find('.item_card_horizontal__title').exists()).toBe(true)
      expect(wrapper.find('.item_card_horizontal__meta').exists()).toBe(true)
      expect(wrapper.find('.item_card_horizontal__actions').exists()).toBe(true)
    })
  })
})
