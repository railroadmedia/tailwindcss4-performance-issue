import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import MuSlider from './MuSlider.vue'

const simulateScroll = async (wrapper, { scrollLeft, clientWidth, scrollWidth }) => {
  const scrollWrapperEl = wrapper.find('.slider__scroll-wrapper').element
  if (typeof scrollWrapperEl.scrollBy !== 'function') {
    scrollWrapperEl.scrollBy = () => {}
  }
  Object.defineProperty(scrollWrapperEl, 'scrollLeft', {
    value: scrollLeft,
    writable: true,
    configurable: true,
  })
  Object.defineProperty(scrollWrapperEl, 'clientWidth', {
    value: clientWidth,
    writable: true,
    configurable: true,
  })
  Object.defineProperty(scrollWrapperEl, 'scrollWidth', {
    value: scrollWidth,
    writable: true,
    configurable: true,
  })
  await wrapper.find('.slider__scroll-wrapper').trigger('scroll')
  await nextTick()
}

describe('MuSlider', () => {
  it('renders the slider container and scroll wrapper', () => {
    const wrapper = mount(MuSlider, { props: { slidesPerView: 1 } })
    expect(wrapper.find('.slider').exists()).toBe(true)
    expect(wrapper.find('.slider__scroll-wrapper').exists()).toBe(true)
  })

  it('shows both navigation buttons when in the middle of the scroll', async () => {
    const wrapper = mount(MuSlider, { props: { slidesPerView: 1 } })
    await simulateScroll(wrapper, { scrollLeft: 300, clientWidth: 800, scrollWidth: 1600 })
    expect(wrapper.find('.slider__button-wrapper--left').exists()).toBe(true)
    expect(wrapper.find('.slider__button-wrapper--right').exists()).toBe(true)
  })

  it('hides the left button when scrolled fully to the left', async () => {
    const wrapper = mount(MuSlider, { props: { slidesPerView: 1 } })
    await simulateScroll(wrapper, { scrollLeft: 0, clientWidth: 800, scrollWidth: 1600 })
    expect(wrapper.find('.slider__button-wrapper--left').exists()).toBe(false)
    expect(wrapper.find('.slider__button-wrapper--right').exists()).toBe(true)
  })

  it('hides the right button when scrolled fully to the right', async () => {
    const wrapper = mount(MuSlider, { props: { slidesPerView: 1 } })
    await simulateScroll(wrapper, { scrollLeft: 800, clientWidth: 800, scrollWidth: 1600 })
    expect(wrapper.find('.slider__button-wrapper--left').exists()).toBe(true)
    expect(wrapper.find('.slider__button-wrapper--right').exists()).toBe(false)
  })

  it('emits "click-left" and "click-right" events when buttons are clicked', async () => {
    const wrapper = mount(MuSlider, { props: { slidesPerView: 1 } })
    await simulateScroll(wrapper, { scrollLeft: 400, clientWidth: 800, scrollWidth: 1600 })

    const leftButton = wrapper.find('.slider__button-wrapper--left button')
    const rightButton = wrapper.find('.slider__button-wrapper--right button')
    expect(leftButton.exists()).toBe(true)
    expect(rightButton.exists()).toBe(true)

    await leftButton.trigger('click')
    await rightButton.trigger('click')

    expect(wrapper.emitted()['click-left']).toBeTruthy()
    expect(wrapper.emitted()['click-left'].length).toBe(1)
    expect(wrapper.emitted()['click-right']).toBeTruthy()
    expect(wrapper.emitted()['click-right'].length).toBe(1)
  })

  it('updates visibility of navigation buttons on scroll', async () => {
    const wrapper = mount(MuSlider, { props: { slidesPerView: 1 } })
    await simulateScroll(wrapper, { scrollLeft: 0, clientWidth: 800, scrollWidth: 1600 })
    expect(wrapper.find('.slider__button-wrapper--left').exists()).toBe(false)

    await simulateScroll(wrapper, { scrollLeft: 400, clientWidth: 800, scrollWidth: 1600 })
    expect(wrapper.find('.slider__button-wrapper--left').exists()).toBe(true)
    expect(wrapper.find('.slider__button-wrapper--right').exists()).toBe(true)

    await simulateScroll(wrapper, { scrollLeft: 800, clientWidth: 800, scrollWidth: 1600 })
    expect(wrapper.find('.slider__button-wrapper--right').exists()).toBe(false)
  })
})
