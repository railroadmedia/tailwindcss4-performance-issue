import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import MuThumbnail from './MuThumbnail.vue'
import { useRouter } from 'vue-router'

// Mock the PlayIcon from the heroicons package
vi.mock('@heroicons/vue/24/solid', () => {
  return {
    PlayIcon: defineComponent({
      name: 'PlayIcon',
      template: '<div class="play-icon"></div>',
    }),
  }
})

// Mock the vue-router functionality
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('MuThumbnail', () => {
  // Reset mocks before each test
  beforeEach(() => {
    mockPush.mockReset()

    // Mock IntersectionObserver
    global.IntersectionObserver = class IntersectionObserver {
      constructor(callback) {
        // Store the callback to call it in observe
        this.callback = callback
      }
      observe() {
        // Simulate element being in view immediately
        this.callback([{ isIntersecting: true }])
      }
      unobserve() {}
      disconnect() {}
    }
  })

  // Clean up after tests
  afterEach(() => {
    delete global.IntersectionObserver
  })

  const defaultProps = {
    brand: 'drumeo',
    imgUrl: 'https://picsum.photos/id/237/299/169',
    title: 'Alt Text Title',
    url: '/',
  }
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuThumbnail, {
      props: {
        ...defaultProps,
        ...props,
      },
      slots,
      global: {
        stubs: {
          RouterLink: defineComponent({
            name: 'RouterLink',
            template: '<a><slot /></a>',
          }),
          // Stub for MuThumbnailStatusIcon component
          MuThumbnailStatusIcon: defineComponent({
            name: 'MuThumbnailStatusIcon',
            props: ['status', 'size'],
            template: '<div class="mu-thumbnail-status-icon"></div>',
          }),
          // No need to stub PlayIcon here because it's now mocked via vi.mock above.
        },
      },
    })
  }

  it('renders properly with initial props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
  })

  it('renders with no progress bar by default', () => {
    const wrapper = mountComponent()
    const progressBar = wrapper.find('.thumbnail__progress_bar')
    expect(progressBar.exists()).toBe(false)
  })

  it('renders with no pill by default', () => {
    const wrapper = mountComponent()
    const pill = wrapper.find('.thumbnail__pill')
    expect(pill.exists()).toBe(false)
  })

  it('applies extra-small class to pill when size is extra-small', () => {
    const pillText = '1:23'
    const wrapper = mountComponent({ pillText, size: 'extra-small' })
    const pill = wrapper.find('.thumbnail__pill')
    expect(pill.exists()).toBe(true)
    expect(pill.classes()).toContain('thumbnail__pill--extra-small')
  })

  it('renders with pill when pillText is provided', () => {
    const pillText = '1:23'
    const wrapper = mountComponent({ pillText })
    const pill = wrapper.find('.thumbnail__pill')
    expect(pill.exists()).toBe(true)
    expect(pill.text()).toBe(pillText)
  })

  it('renders with progress bar when progress is provided', () => {
    const progressValue = 25
    const wrapper = mountComponent({ progress: progressValue })
    const progressBar = wrapper.find('.thumbnail__progress_bar')
    expect(progressBar.exists()).toBe(true)
    expect(progressBar.attributes('style')).toContain(`width: ${progressValue}%`)
  })

  it('renders image with correct src and alt attributes', async () => {
    const { imgUrl, title } = defaultProps
    const wrapper = mountComponent()

    // Wait for the Vue rendering to update after IntersectionObserver
    await wrapper.vm.$nextTick()

    const img = wrapper.find('img.thumbnail__image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(`${imgUrl}?w=500`)
    expect(img.attributes('alt')).toBe(title)
  })

  it('renders image with custom width when imageWidth prop is provided', async () => {
    const { imgUrl } = defaultProps
    const customWidth = 800
    const wrapper = mountComponent({ imageWidth: customWidth })

    // Wait for the Vue rendering to update after IntersectionObserver
    await wrapper.vm.$nextTick()

    const img = wrapper.find('img.thumbnail__image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(`${imgUrl}?w=${customWidth}`)
  })

  it('renders as clickable anchor when url is provided', () => {
    const wrapper = mountComponent()
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('thumbnail--clickable')
    expect(wrapper.attributes('href')).toBe(defaultProps.url)
  })

  it('handles left click to navigate when url is provided', async () => {
    const wrapper = mountComponent({ url: '/some-path' })
    await wrapper.trigger('click', { button: 0 })
    expect(mockPush).toHaveBeenCalledWith('/some-path')
  })

  it('does not trigger router navigation on right-click', async () => {
    const wrapper = mountComponent({ url: '/some-path' })
    await wrapper.trigger('click', { button: 2 })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('does not trigger router navigation on click with ctrl/meta key', async () => {
    const wrapper = mountComponent({ url: '/some-path' })
    await wrapper.trigger('click', { button: 0, ctrlKey: true })
    expect(mockPush).not.toHaveBeenCalled()

    await wrapper.trigger('click', { button: 0, metaKey: true })
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('does not have clickable class when no url is provided', () => {
    const wrapper = mountComponent({ url: '' })
    expect(wrapper.classes()).not.toContain('thumbnail--clickable')
  })

  it('does not trigger router navigation when clicked without a URL', async () => {
    const wrapper = mountComponent({ url: '' })
    await wrapper.trigger('click')
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('renders pill text when provided', () => {
    const wrapper = mount(MuThumbnail, {
      props: {
        imgUrl: 'https://example.com/image.jpg',
        pillText: '5:23',
        title: 'Test Title',
      },
    })

    expect(wrapper.find('.thumbnail__pill').exists()).toBe(true)
    expect(wrapper.find('.thumbnail__pill').text()).toBe('5:23')
  })

  it('renders progress bar with correct width', () => {
    const wrapper = mount(MuThumbnail, {
      props: {
        imgUrl: 'https://example.com/image.jpg',
        progress: 50,
        title: 'Test Title',
      },
    })

    const progressBar = wrapper.find('.thumbnail__progress_bar')
    expect(progressBar.exists()).toBe(true)
    expect(progressBar.attributes('style')).toContain('width: 50%')
  })

  it('renders optional pill text', () => {
    const wrapper = mountComponent({ pillText: '5:23' })
    expect(wrapper.find('.thumbnail__pill').exists()).toBe(true)
    expect(wrapper.find('.thumbnail__pill').text()).toBe('5:23')
  })

  it('does not render pill text when not provided', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.thumbnail__pill').exists()).toBe(false)
  })

  it('renders progress bar with correct width when progress is provided', () => {
    const wrapper = mountComponent({ progress: 50 })
    const progressBar = wrapper.find('.thumbnail__progress_bar')
    expect(progressBar.exists()).toBe(true)
    expect(progressBar.attributes('style')).toContain('width: 50%')
  })

  it('does not render progress bar when progress is not provided', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.thumbnail__progress_bar').exists()).toBe(false)
  })

  it('adds loaded class to image after it loads', async () => {
    const wrapper = mountComponent()
    await wrapper.vm.$nextTick()

    const img = wrapper.find('img.thumbnail__image')
    await img.trigger('load')

    expect(img.classes()).toContain('thumbnail__image--loaded')
  })
})
