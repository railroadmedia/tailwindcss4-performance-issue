import type { Meta, StoryObj } from '@storybook/vue3'
import MuTabButton from './MuTabButton.vue'

const meta = {
  title: 'UI/Actions/MuTabButton',
  component: MuTabButton,
  tags: ['autodocs'],
  argTypes: {
    selectedTab: {
      control: 'boolean',
      description: 'Whether the tab is currently selected',
    },
    isCircle: {
      control: 'boolean',
      description: 'Whether to render the button as a circle',
    },
  },
} satisfies Meta<typeof MuTabButton>

export default meta
type Story = StoryObj<typeof MuTabButton>

export const Default: Story = {
  args: {
    selectedTab: false,
    isCircle: false,
  },
  render: (args) => ({
    components: { MuTabButton },
    setup() {
      return { args }
    },
    template: '<MuTabButton v-bind="args">Tab</MuTabButton>',
  }),
}

export const Selected: Story = {
  args: {
    selectedTab: true,
    isCircle: false,
  },
  render: (args) => ({
    components: { MuTabButton },
    setup() {
      return { args }
    },
    template: '<MuTabButton v-bind="args">Selected Tab</MuTabButton>',
  }),
}

export const Circle: Story = {
  args: {
    selectedTab: false,
    isCircle: true,
  },
  render: (args) => ({
    components: { MuTabButton },
    setup() {
      return { args }
    },
    template: '<MuTabButton v-bind="args">○</MuTabButton>',
  }),
}

export const SelectedCircle: Story = {
  args: {
    selectedTab: true,
    isCircle: true,
  },
  render: (args) => ({
    components: { MuTabButton },
    setup() {
      return { args }
    },
    template: '<MuTabButton v-bind="args">●</MuTabButton>',
  }),
}
