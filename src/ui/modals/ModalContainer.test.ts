import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ModalContainer from './ModalContainer.vue'

// Mock the useModalStore hook
vi.mock('@/application/composables/useModalManager', () => ({
  useModalStore: vi.fn(() => ({
    activeModals: [],
  })),
}))

import { useModalStore } from '@/application/composables/useModalManager'

// Create a simple test modal component
const TestModal = {
  template: '<div class="test-modal">Test Modal</div>',
}

describe('ModalContainer', () => {
  afterEach(() => {
    // Reset mocks between tests
    vi.clearAllMocks()
    document.body.innerHTML = ''
  })

  it('should not render any modal when activeModals is empty', () => {
    // Mock the store to return empty array for activeModals
    vi.mocked(useModalStore).mockReturnValue({
      activeModals: [],
    })

    mount(ModalContainer)

    // Check that no modal is rendered
    expect(document.body.querySelector('.test-modal')).toBeNull()
  })

  it('should render a modal component when activeModals contains a modal', async () => {
    // Mock the store to return a modal
    vi.mocked(useModalStore).mockReturnValue({
      activeModals: [
        {
          id: 'modal1',
          component: TestModal,
          props: {},
          events: {},
          zIndex: 1000,
        },
      ],
    })

    mount(ModalContainer)
    await nextTick()

    // Check that the modal is rendered
    const modalWrapper = document.body.querySelector('.modal-wrapper')
    expect(modalWrapper).not.toBeNull()
    expect(modalWrapper.style.zIndex).toBe('1000')
    expect(document.body.querySelector('.test-modal')).not.toBeNull()
  })

  it('should render multiple modals with correct z-index', async () => {
    // Mock the store with multiple modals
    vi.mocked(useModalStore).mockReturnValue({
      activeModals: [
        {
          id: 'modal1',
          component: TestModal,
          props: {},
          events: {},
          zIndex: 1000,
        },
        {
          id: 'modal2',
          component: TestModal,
          props: {},
          events: {},
          zIndex: 1001,
        },
      ],
    })

    mount(ModalContainer)
    await nextTick()

    // Check that both modals are rendered with correct z-index
    const modalWrappers = document.body.querySelectorAll('.modal-wrapper')
    expect(modalWrappers).toHaveLength(2)
    expect(modalWrappers[0].style.zIndex).toBe('1000')
    expect(modalWrappers[1].style.zIndex).toBe('1001')
  })

  it('should pass props to the modal component', async () => {
    // Create a component that displays props
    const PropTestModal = {
      props: ['title'],
      template: '<div class="prop-test-modal">{{ title }}</div>',
    }

    // Mock the store with props
    vi.mocked(useModalStore).mockReturnValue({
      activeModals: [
        {
          id: 'modal1',
          component: PropTestModal,
          props: { title: 'Test Title' },
          events: {},
          zIndex: 1000,
        },
      ],
    })

    mount(ModalContainer)
    await nextTick()

    // Check that props are passed
    const modalElement = document.body.querySelector('.prop-test-modal')
    expect(modalElement).not.toBeNull()
    expect(modalElement.textContent).toContain('Test Title')
  })
})
