import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import MuSvgIcon from './MuSvgIcon.vue'

// Mock the dynamic imports
vi.mock(
  '@icons/valid-icon.svg',
  () => ({
    default: {
      name: 'ValidIcon',
      render: () => null,
    },
  }),
  { virtual: true }
)

vi.mock(
  '@icons/fallback.svg',
  () => ({
    default: {
      name: 'FallbackIcon',
      render: () => null,
    },
  }),
  { virtual: true }
)

describe('MuSvgIcon', () => {
  // Setup console spy
  let consoleErrorSpy: any

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('renders the component with valid icon', () => {
    const wrapper = shallowMount(MuSvgIcon, {
      props: {
        name: 'valid-icon',
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  it('loads fallback icon when icon not found', async () => {
    // Create dynamic mock for missing icon
    const mockImportModule = vi
      .fn()
      .mockImplementationOnce(() => Promise.reject())
      .mockImplementationOnce(() => import('@icons/fallback.svg'))

    vi.mock(
      '@icons/missing-icon.svg',
      () => {
        throw new Error('Module not found')
      },
      { virtual: true }
    )

    // Replace the dynamic import mechanism
    const originalImport = vi.hoisted(() => globalThis.import)
    const mockedImport = vi.fn((path) => {
      if (path === '@icons/missing-icon.svg') {
        return Promise.reject(new Error('Module not found'))
      }
      if (path === '@icons/fallback.svg') {
        return import('@icons/fallback.svg')
      }
      return originalImport(path)
    })
    globalThis.import = mockedImport

    const wrapper = shallowMount(MuSvgIcon, {
      props: {
        name: 'missing-icon',
      },
    })

    // Need to wait for async component resolution
    await vi.waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load icon: missing-icon')
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)

    // Restore original import
    globalThis.import = originalImport
  })
})
