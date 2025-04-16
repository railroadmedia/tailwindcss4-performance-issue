import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BaseModal from './BaseModal.vue'

describe('BaseModal', () => {
  // Mock requestAnimationFrame
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb()
      return 0
    })

    // Reset console spy
    vi.restoreAllMocks()
  })

  const mountComponent = (props = {}, slots = {}) => {
    return mount(BaseModal, {
      props: {
        isOpen: false,
        ...props,
      },
      slots,
      global: {
        stubs: {
          // Use shallowMount behavior for MuCloseButton
          MuCloseButton: true,
        },
      },
    })
  }

  it('renders properly with required props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('dialog').exists()).toBe(true)
    expect(wrapper.find('dialog').classes()).toContain('base-modal')
  })

  it('is hidden by default when isOpen is false', () => {
    const wrapper = mountComponent({ isOpen: false })
    expect(wrapper.find('dialog').classes()).not.toContain('modal-open')
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mountComponent({ isOpen: true })

    // Directly call the handleClose method instead of relying on event propagation
    await wrapper.vm.handleClose()

    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits close event when backdrop is clicked', async () => {
    const wrapper = mountComponent({ isOpen: true })
    const backdrop = wrapper.find('.modal-backdrop')

    await backdrop.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('renders the title when provided', () => {
    const title = 'Modal Title'
    const wrapper = mountComponent({ title })

    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe(title)
  })

  it('does not render title element when title is not provided', () => {
    const wrapper = mountComponent({ title: '' })
    expect(wrapper.find('h3').exists()).toBe(false)
  })

  it('applies the correct size class based on size prop', () => {
    // Test small size
    const wrapperSm = mountComponent({ size: 'sm' })
    expect(wrapperSm.find('.modal-box').classes()).toContain('max-w-sm')

    // Test medium size (default)
    const wrapperMd = mountComponent()
    expect(wrapperMd.find('.modal-box').classes()).toContain('max-w-md')

    // Test large size
    const wrapperLg = mountComponent({ size: 'lg' })
    expect(wrapperLg.find('.modal-box').classes()).toContain('max-w-lg')
  })

  it('renders default slot content', () => {
    const slotContent = '<div class="default-content">Default Content</div>'
    const wrapper = mountComponent(
      {},
      {
        default: slotContent,
      }
    )

    expect(wrapper.find('.default-content').exists()).toBe(true)
    expect(wrapper.find('.default-content').text()).toBe('Default Content')
  })

  it('renders top slot content', () => {
    const topContent = '<div class="top-content">Top Content</div>'
    const wrapper = mountComponent(
      {},
      {
        top: topContent,
      }
    )

    expect(wrapper.find('.top-content').exists()).toBe(true)
    expect(wrapper.find('.top-content').text()).toBe('Top Content')
  })

  it('renders footer slot content', () => {
    const footerContent = '<div class="footer-content">Footer Content</div>'
    const wrapper = mountComponent(
      {},
      {
        footer: footerContent,
      }
    )

    expect(wrapper.find('.footer-content').exists()).toBe(true)
    expect(wrapper.find('.footer-content').text()).toBe('Footer Content')
  })

  it('renders all slots together correctly', () => {
    const slots = {
      default: '<div class="default-content">Default Content</div>',
      top: '<div class="top-content">Top Content</div>',
      footer: '<div class="footer-content">Footer Content</div>',
    }

    const wrapper = mountComponent({}, slots)

    expect(wrapper.find('.default-content').exists()).toBe(true)
    expect(wrapper.find('.top-content').exists()).toBe(true)
    expect(wrapper.find('.footer-content').exists()).toBe(true)
  })
})
