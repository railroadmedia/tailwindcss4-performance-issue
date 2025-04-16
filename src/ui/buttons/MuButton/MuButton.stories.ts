import type { Meta, StoryObj } from '@storybook/vue3'
import MuButton from '@/ui/buttons/MuButton/MuButton.vue'

const meta: Meta<typeof MuButton> = {
  title: 'UI/Buttons/MuButton',
  component: MuButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'text',
      description: 'Button type',
    },
  },
}

export default meta
type Story = StoryObj<typeof MuButton>

export const Primary: Story = {
  args: {
    type: 'primary',
  },
  render: (args) => ({
    components: { MuButton },
    setup() {
      return { args }
    },
    template: `
      <MuButton v-bind="args">Button</MuButton>
    `,
  }),
}

export const Secondary: Story = {
  args: {
    type: 'secondary',
  },
  render: (args) => ({
    components: { MuButton },
    setup() {
      return { args }
    },
    template: `
      <MuButton v-bind="args">Button</MuButton>
    `,
  }),
}
