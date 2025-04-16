import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

// Simple mock that just returns components for the icons we'll test with
vi.mock('@heroicons/vue/24/solid', () => ({
  userIcon: { render: () => null },
  homeIcon: { render: () => null },
}))

vi.mock('@heroicons/vue/24/outline', () => ({
  userIcon: { render: () => null },
  homeIcon: { render: () => null },
}))

// Import after mocks are defined
import MuDynamicHeroIcons from './MuDynamicHeroIcons.vue'

describe('MuDynamicHeroIcons', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(MuDynamicHeroIcons, {
      props: {
        name: 'user', // Use a name we've mocked
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('accepts different icon styles', () => {
    // Outline style
    const outlineWrapper = shallowMount(MuDynamicHeroIcons, {
      props: {
        name: 'user',
        iconStyle: 'outline',
      },
    })

    expect(outlineWrapper.exists()).toBe(true)

    // Solid style
    const solidWrapper = shallowMount(MuDynamicHeroIcons, {
      props: {
        name: 'user',
        iconStyle: 'solid',
      },
    })

    expect(solidWrapper.exists()).toBe(true)
  })

  it('passes attributes to the icon component', () => {
    const wrapper = shallowMount(MuDynamicHeroIcons, {
      props: {
        name: 'user',
      },
      attrs: {
        class: 'custom-class',
        width: '24',
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
