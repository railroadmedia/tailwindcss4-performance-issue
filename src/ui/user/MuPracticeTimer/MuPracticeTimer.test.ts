import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import MuPracticeTimer from './MuPracticeTimer.vue'

describe('MuPracticeTimer', () => {
  describe('Basic rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(MuPracticeTimer)
      expect(wrapper.find('.practice-timer').exists()).toBe(true)
      expect(wrapper.find('.practice-timer__time').text()).toBe('00:00')
    })

    it('renders content in top and bottom slots', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: '05:00',
          goalTime: '15:00',
        },
        slots: {
          top: 'Current',
          bottom: 'Goal: 15:00',
        },
      })
      expect(wrapper.find('.practice-timer__time-top').text()).toBe('Current')
      expect(wrapper.find('.practice-timer__time-bottom').text()).toBe('Goal: 15:00')
    })
  })

  describe('Time validation and formatting', () => {
    it('formats regular time correctly', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: '05:30',
          goalTime: '15:00',
        },
      })
      expect(wrapper.find('.practice-timer__time').text()).toBe('5:30')
    })

    it('handles invalid time format gracefully', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: 'invalid',
          goalTime: '15:00',
        },
      })
      expect(wrapper.find('.practice-timer__time').text()).toBe('00:00')
    })

    it('handles edge case time values', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: '59:59',
          goalTime: '60:00',
        },
      })
      expect(wrapper.find('.practice-timer__time').text()).toBe('59:59')
      expect(wrapper.vm.progressValue).toBe(99)
    })
  })

  describe('Progress calculation', () => {
    it('calculates standard progress correctly', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: '07:30',
          goalTime: '15:00',
        },
      })
      expect(wrapper.vm.progressValue).toBe(50)
    })

    it('returns 0 progress for invalid time formats', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: 'invalid',
          goalTime: 'invalid',
        },
      })
      expect(wrapper.vm.progressValue).toBe(0)
    })

    it('handles zero goal time correctly', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: '01:00',
          goalTime: '00:00',
        },
      })
      expect(wrapper.vm.progressValue).toBe(0)
    })

    it('handles edge case progress values', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: '14:59',
          goalTime: '15:00',
        },
      })
      expect(wrapper.vm.progressValue).toBe(99)
    })
  })

  describe('Component states', () => {
    it('is not started with zero time', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: '00:00',
          goalTime: '15:00',
        },
      })
      expect(wrapper.classes()).not.toContain('practice-timer--started')
    })

    it('correctly handles progress just below 100%', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: '14:59',
          goalTime: '15:00',
        },
      })
      expect(wrapper.classes()).not.toContain('practice-timer--completed')
      expect(wrapper.vm.progressValue).toBe(99)
    })

    it('shows started state when timer is running', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: '01:00',
          goalTime: '15:00',
        },
      })
      expect(wrapper.classes()).toContain('practice-timer--started')
    })

    it('shows completed state when timer reaches goal', () => {
      const wrapper = mount(MuPracticeTimer, {
        props: {
          currentTime: '15:00',
          goalTime: '15:00',
        },
      })
      expect(wrapper.classes()).toContain('practice-timer--completed')
    })
  })
})
