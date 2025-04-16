import type { Meta, StoryObj } from '@storybook/vue3'
import MuDotSeparator from './MuDotSeparator.vue'

const meta = {
  title: 'UI/Typography/MuDotSeparator',
  component: MuDotSeparator,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'default', 'muted'],
      description: 'Controls the color of the dot separator',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Controls the size of the dot separator',
    },
  },
  args: {
    color: 'primary',
    size: 'xs',
  },
} satisfies Meta<typeof MuDotSeparator>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    color: 'primary',
    size: 'xs',
  },
}

export const Default: Story = {
  args: {
    color: 'default',
    size: 'xs',
  },
}

export const Muted: Story = {
  args: {
    color: 'muted',
    size: 'xs',
  },
}
