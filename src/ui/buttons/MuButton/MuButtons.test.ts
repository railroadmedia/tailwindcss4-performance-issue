import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuButton from '@/ui/buttons/MuButton/MuButton.vue'

describe('MuButton', () => {
  it('Primary button renders properly', () => {
    const wrapper = mount(MuButton, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.primary-btn').exists()).toBe(true)
  })

  it('Secondary button renders properly', () => {
    const wrapper = mount(MuButton, {
      props: {
        type: 'secondary',
      },
      slots: {
        default: 'Button',
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.secondary-btn').exists()).toBe(true)
  })
})
