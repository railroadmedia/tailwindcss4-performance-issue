import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MuButtonGroup from './MuButtonGroup.vue'

describe('MuButtonGroup', () => {
  const mountComponent = (props = {}, slots = {}) => {
    return mount(MuButtonGroup, {
      props: {
        ...props,
      },
      slots: {
        default: '<button>Button 1</button><button>Button 2</button>',
        ...slots,
      },
    })
  }

  it('renders correctly with default props', () => {
    const wrapper = mountComponent()
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('join')
    expect(wrapper.classes()).not.toContain('join-vertical')
  })

  it('applies vertical class when vertical prop is true', () => {
    const wrapper = mountComponent({ vertical: true })
    expect(wrapper.classes()).toContain('join-vertical')
  })

  it('renders slot content correctly', () => {
    const wrapper = mountComponent(
      {},
      {
        default: '<button>Custom Button 1</button><button>Custom Button 2</button>',
      }
    )
    expect(wrapper.findAll('button')).toHaveLength(2)
    expect(wrapper.text()).toContain('Custom Button 1')
    expect(wrapper.text()).toContain('Custom Button 2')
  })

  it('does not apply vertical class when vertical prop is false', () => {
    const wrapper = mountComponent({ vertical: false })
    expect(wrapper.classes()).not.toContain('join-vertical')
  })
})
